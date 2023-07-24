# Movies-Api
1. Signup API
POST /addnewuser

Sample Request Body (Json Object) Example:
{
    "email": "test@email.com",
    "password": "password"
}


Sample Response Example:

(1) Fill all the fields (200)
    Sample Response:
    {
        success: false,
        msz: "Enter all fields"
    }

(2) Added new user successfully (200)
    Sample Response: 
    {
        success: true,
        msz: "Successfully Created New User",
        token: "xxxxxxxxx"
    }

(3) If user already exist (200)
    Sample Response:
    {
        success: false,
        msz: "User Already Exist,Try to Login"
    }

(4) Error Occurred (400)
    Sample Response:
    {
        success: false,
        msz: "An error occurred",
        error: error
    }


2. Login API
POST /loginuser

Sample Request Body (Json Object) Example:
{
    "email": "test@email.com",
    "password": "password"
}


Sample Response Example:

(1) User doesn't exist (200)
    Sample Response:
    {
        success: false,
        msz: "Authentication Failed,User Not Found",
        err: null
    }

(2) Logged in successfully (200)
    Sample Response: 
    {
        success: true,
        token: "xxxxxxxxx",
        err: null
    }

(3) Wrong Password (200)
    Sample Response:
    {
        success: false,
        msz: "Authentication Failed,Wrong Password"
    }

(4) Error Occurred (400)
    Sample Response:
    {
        success: false,
        msz: "An error occurred",
        error: error
    }



3. Rate a movie
POST /ratemovie

Sample Request Body (Json Object) Example:
{
    "token": "xxxxxxxxx",
    "rating": 5
}


Sample Response Example:

(1) Invalid Token (200)
    Sample Response:
    {
        success: false,
        msz: "User Cridentials are invalid",
        error: null
    }

(2) Movie rated successfully (200)
    Sample Response: 
    {
        success: true,
        msz: "Successfully rated the movie",
        error: null
    }

(3) Error Occurred (400)
    Sample Response:
    {
        success: false,
        msz: "An error occurred",
        error: error
    }


4. Get movies list (100 at a time)
POST /getmovielist

Sample Request Body (Json Object) Example:
{
    "token": "xxxxxxxxx",
    "page": 1
}
page is the counter for pagination, if page = 1, then we will get movies from 1 to 100.
If page = 2, then we will get movies from 101 to 200 and so on.

Sample Response Example:

(1) Invalid Token (200)
    Sample Response:
    {
        success: false,
        msz: "User Cridentials are invalid",
        error: null
    }

(2) Successfully got movie list (200)
    Sample Response: 
    {
        success: true,
        msz: "Successfully got the movie list",
        list: movie_list,
        error: null
    }

(3) Error Occurred (400)
    Sample Response:
    {
        success: false,
        msz: "An error occurred",
        error: error
    }



5. Get a movie rating
GET /getmovierating

Sample Request Body (Json Object) Example:
{
    "page": 1
}
page is the counter for pagination, if page = 1, then we will get movies with average ratings from 1 to 100.
If page = 2, then we will get movies with average ratings from 101 to 200 and so on.


Sample Response Example:

(1) Successfully got average movie ratings (200)
    Sample Response: 
    {
        success: true,
        msz: "Successfully got the average ratings",
        rating: [], //List of average ratings of movie
        error: null
    }

(2) Error Occurred (400)
    Sample Response:
    {
        success: false,
        msz: "An error occurred",
        error: error
    }
