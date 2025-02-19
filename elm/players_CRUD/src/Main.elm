module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)

import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Dict exposing (update)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            { model | newPlayer = { id = model.newPlayer.id, name = name, isActive = model.newPlayer.isActive } }

        AddPlayer ->
            let
                newId =
                    case List.reverse model.players |> List.head of
                        Just lastPlayer -> lastPlayer.id + 1
                        Nothing -> 1

                newPlayer =
                    { id = newId, name = model.newPlayer.name, isActive = False }

                
                updatedPlayers =
                   model.players ++ [ newPlayer ]
            in
            { model
                | players = updatedPlayers
                , newPlayer = initPlayer 0
            }

        DeletePlayer id ->
            let
                updatedPlayers =
                    List.filter (\player -> player.id /= id) model.players
            in
            { model | players = updatedPlayers }

        ModifyPlayer id status ->
            let
                toggelStatus player =
                    if player.id == id then
                        { player | isActive = status }
                    else
                        player
                updatedPlayers =
                    List.map toggelStatus model.players
            in
            { model | players = updatedPlayers }
                


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Players CRUD" ]
        , Html.form
            [ id "submit-player", onSubmit AddPlayer ]
            [ input
                [ id "input-player"
                , type_ "text"
                , placeholder "Player name"
                , value model.newPlayer.name
                , onInput SetName
                ]
                []
            , button [ id "btn-add", type_ "submit" ] [ text "Add" ]
            ]
        , ol [ id "players-list" ]
            (List.map playerView model.players)
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
                , onCheck (\_ -> ModifyPlayer player.id (not player.isActive))
                ]
                []
            , text (if player.isActive then "active" else " Not active")
            ]
        , button [ class "btn-delete", onClick (DeletePlayer player.id) ] [ text "Delete" ]
        ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }