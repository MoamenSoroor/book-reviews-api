# Book Reviews API

ITI Nodejs Course Project, Book Reviews API that allows API consumer to register, login, then he can use private API that allows him to:
- add a book to the system.
- rate a book(five stars system).
- write a comment on a book.
- favor a book [1=reading, 2=currently reading, 3=read].
- list books he created.
- list books he favored.
- list books he rated.
- list books he wrote a comment on it.
also, there is a public API that allows consumers to:
- list all books in the system
- access specific book with its id.
- access specific book with its full details.
## Technologies used: 
  NodeJs – Express – mongoose - mongodb

## Sample of Requests: 
it is possible to make one of the following requests on the api: 

Register User: 
------------------------------------
Post Request On http://localhost:3000/user/register
With Body 
```json
{
        "userName": "moamen soroor",
        "password": "1234",
        "email": "moamensoroor@gmail.com"
}
```

User Login: 
------------------------------------
Post Request On http://localhost:3000/user/login
With Body 
```json
{
        "password": "1234",
        "email": "moamensoroor@gmail.com"
}
```
NOTE: token will be returned and API Comsumer must send it to the API each time he make a request
NOTE: token will be removed after 10 minutes - for testing purposes and you can increase the time - , 
      and user must login again.


User logout: 
------------------------------------
Post Request On http://localhost:3000/user/logout


User logout all Devices: 
------------------------------------
Post Request On http://localhost:3000/user/logoutall


User Posts a Book
------------------------------------
Post Request On http://localhost:3000/user/books/
With Body 
```json
{
        "ISBN": "100",
        "title": "you don't know js",
        "description": "It’s easy to learn parts of JavaScript,",
        "publishData": "1995-01-22",
        "authors": [
          "kyle Simpson"
        ],
        "categories": [
          "programming",
          "computer science"
        ]
      }
```


User Rates a Book
------------------------------------
Put Request On http://localhost:3000/user/books/rating
With Body 
```json
{
        "bookId": "book id here",
        "rating": 1
}
```
Please Note: rating is between [0, 0.5, 1, 1.5, 2.5, 3, 3.5, 4, 4.5, 5]


User favors a Book
------------------------------------
Put Request On http://localhost:3000/user/books/fav
With Body 
```json
{
        "bookId": "book id here",
        "status": 1
}
```
Please Note: status is between [1,2,3] which means [1=reading, 2=currently reading, 3=read]


User Reviews a Book (Comments)
------------------------------------
Put Request On http://localhost:3000/user/books/review
With Body 
```json
{
        "bookId": "book id here",
        "review": "your comment goes here."
}
```
Please Note: you can write any string in review like social media comments


Get Books User Rated It
------------------------------------
Get Request On http://localhost:3000/user/books/rating



  
Get Books User favored It
------------------------------------
Get Request On http://localhost:3000/user/books/fav



  
Get Books User Reviewed It
------------------------------------
Get Request On http://localhost:3000/user/books/review


  
Public API List All Books
------------------------------------
Get Request On http://localhost:3000/api/books/


Public API Access To Specific Book
------------------------------------
Get Request On http://localhost:3000/api/books/

```json
{
        "bookId": "book id here"
}
```

## Public API Access To Specific Book with its full details
------------------------------------
Get Request On http://localhost:3000/api/books/details
```json
{
        "bookId": "book id here"
}
```




