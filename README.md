# Book Reviews API app with Nodejs

ITI Nodejs Course Project, Book Reviews API that allow API consumer to register, login, add book, list
books with its Reviews, review book with 1-5 stars, and write a comment on a book.
## Technologies used: 
  NodeJs – Express – mongoose - mongodb

## Sample of Requests: 

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

User logout: 
------------------------------------
Post Request On http://localhost:3000/user/logout


User logout all Devices: 
------------------------------------
Post Request On http://localhost:3000/user/logoutall


User Post a Book
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


User Favourite a Book
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


User Reviews a Book
------------------------------------
Put Request On http://localhost:3000/user/books/review
With Body 
```json
{
        "bookId": "book id here",
        "review": 1
}
```
Please Note: you can write any string in review like social media comments


Get Books User Has Rated It
------------------------------------
Get Request On http://localhost:3000/user/books/rating



  
Get Books User Has Favourite It
------------------------------------
Get Request On http://localhost:3000/user/books/fav




























































