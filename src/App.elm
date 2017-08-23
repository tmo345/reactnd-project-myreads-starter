module App exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import List exposing (..)


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Book =
    { title : String
    , shelf : Shelf
    }


type alias Author =
    String


type alias Model =
    List Book


type alias Shelf =
    String


shelves : List Shelf
shelves =
    [ "Currently Reading"
    , "Want to Read"
    , "Read"
    ]


model : Model
model =
    [ { title = "Book title"
      , shelf = "Currently Reading"
      }
    , { title = "The stuff of legends"
      , shelf = "Want to Read"
      }
    , { title = "Not in a list"
      , shelf = "Want to Read"
      }
    ]


init : ( Model, Cmd Msg )
init =
    ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "list-books" ]
        [ div [ class "list-books-title" ]
            [ h1 [] [ text "My Reads" ]
            , div []
                (List.map bookShelf shelves)
            ]
        ]


printBook : Book -> Html Msg
printBook book =
    li [ class "book" ]
        [ div [ class "book-title" ]
            [ text book.title ]
        ]


shelfName : Shelf -> Html Msg
shelfName name =
    h2 [ class "bookshelf-title" ] [ text name ]


bookShelf : Shelf -> Html Msg
bookShelf shelf =
    let
        books =
            List.filter (\book -> book.shelf == shelf) model
    in
    div [ class "list-books-content" ]
        [ div [ class "bookShelf" ]
            [ shelfName shelf
            , div [ class "bookshelf-books" ]
                [ ol [ class "books-grid" ]
                    (List.map
                        printBook
                        books
                    )
                ]
            ]
        ]


bookShelfChanger : List Shelf -> Html Msg
bookShelfChanger shelves =
    div [] [ text "klajdsf;" ]



-- getBooks : String -> Cmd Msg
-- getBooks token =
--     let
--         url =
--             "https://reactnd-books-api.udacity.com"
--         request =
--             Http.request url decode


request : Http.Request (List QField)



-- UPDATE


type Msg
    = ChangeShelf
    | GetBooks


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeShelf ->
            ( model, Cmd.none )

        GetBooks ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
