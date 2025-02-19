-- Fetch players from backend on load
-- Delete player from backend first then delete player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- add player to backend first then add player to frontend on success


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)
import Json.Encode as Encode


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , baseUrl : String
    , reqStatus : String
    }


type Msg
    = SetName String
    | FetchPlayers (Result Http.Error (List Player))
    | PutPlayerReq Int Bool
    | ModifyPlayer (Result Http.Error Player)
    | PostPlayerReq
    | AddPlayer (Result Http.Error Player)
    | DeletePlayerReq Int
    | DeletePlayer Int (Result Http.Error ())


playerEncoder : Player -> Encode.Value
playerEncoder player =
    Encode.object
        [ ( "id", Encode.int player.id )
        , ( "name", Encode.string player.name )
        , ( "isActive", Encode.bool player.isActive )
        ]


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }

postPlayerReq : String -> Player -> Cmd Msg
postPlayerReq url player = 
    Http.post
        { url = url
        , body = Http.jsonBody (playerEncoder player)
        , expect = Http.expectJson AddPlayer playerDecoder
        }


deletePlayerReq : String -> Int -> Cmd Msg
deletePlayerReq url id =
    Http.request
        { method = "DELETE"
        , headers = []
        , url = url ++ String.fromInt id
        , body = Http.emptyBody
        , expect = Http.expectWhatever (DeletePlayer id)
        , timeout = Nothing
        , tracker = Nothing
        }

putPlayerReq : String -> Player -> Cmd Msg
putPlayerReq url player =
    Http.request
        { method = "PUT"
        , headers = []
        , url = url ++ String.fromInt player.id
        , body = Http.jsonBody (playerEncoder player)
        , expect = Http.expectJson ModifyPlayer playerDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


initModel : Model
initModel =
    { players = []
    , newPlayer = initPlayer 0
    , baseUrl = "http://localhost:3001/api/players/"
    , reqStatus = "Loading..."
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initModel
    , fetchPlayers initModel.baseUrl
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName name ->
            ( { model | newPlayer = { id = model.newPlayer.id, name = name, isActive = model.newPlayer.isActive } }, Cmd.none )

        FetchPlayers (Ok players) ->
            let
                newId =
                    case listLast players of
                        Just lastPlayer -> lastPlayer.id + 1
                        Nothing -> 1
            in
            ( { model | players = players, newPlayer = initPlayer newId, reqStatus = "" }, Cmd.none )

        FetchPlayers (Err _) ->
            ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )

        PostPlayerReq ->
            ( model, postPlayerReq model.baseUrl model.newPlayer )

        AddPlayer (Ok player) ->
            ( { model | players = model.players ++ [player], newPlayer = initPlayer (player.id + 1), reqStatus = "" }, Cmd.none )

        AddPlayer (Err _) ->
            ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )

        PutPlayerReq id isActive ->
            let
                maybePlayer = List.head <| List.filter (\p -> p.id == id) model.players
            in
            case maybePlayer of
                Just player ->
                    ( model, putPlayerReq model.baseUrl { player | isActive = not player.isActive } )

                Nothing ->
                    ( model, Cmd.none )

        ModifyPlayer (Ok player) ->
            let
                updatedPlayers = List.map (\p -> if p.id == player.id then player else p) model.players
            in
            ( { model | players = updatedPlayers, reqStatus = "" }, Cmd.none )

        ModifyPlayer (Err _) ->
            ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )

        DeletePlayerReq id ->
            ( model, deletePlayerReq model.baseUrl id )

        DeletePlayer id (Ok _) ->
            let
                updatedPlayers = List.filter (\p -> p.id /= id) model.players
            in
            ( { model | players = updatedPlayers, reqStatus = "" }, Cmd.none )

        DeletePlayer _ (Err _) ->
            ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm Exercise: Players CRUD2" ]
        , Html.form
            [ id "submit-player", onSubmit PostPlayerReq ]
            [ input
                [ id "input-player"
                , type_ "text"
                , value model.newPlayer.name
                , onInput SetName
                ]
                []
            , button [ id "btn-add", type_ "submit" ] [ text "Add Player" ]
            ]
        , ol [ id "players-list" ]
            (List.map playerView model.players)
        , div [ id "request-status" ] [ text model.reqStatus ]
        ]

playerView : Player -> Html Msg
playerView player =
    li [ id ("player-" ++ String.fromInt player.id) ]
        [ div [ class "player-name" ] [ text player.name ]
        , label [ class "player-status" ]
            [ input
                [ class "player-status"
                , type_ "checkbox"
                , checked player.isActive
                , onCheck (\isChecked -> PutPlayerReq player.id isChecked)
                ]
                []
            , text " Active"
            ]
        , button [ class "btn-delete", onClick (DeletePlayerReq player.id) ] [ text "Delete" ]
        ]

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
