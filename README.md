<h2> Frontend </h2>
### Stacks : HTML, CSS, Javascript (ReactJS)

How to use:
1. Open directory `fe-react/agit-test/`
2. Run `npm start`
3. Frontend will running on localhost:3000

There would be two main pages which can be accessed through:
1. "/:id" or "/" for list of customers
2. "/user/:id" for customer detail

For example:
1. localhost:3000/2
2. localhost:3000/user/4

<h2> Backend </h2>
### Stacks : Golang, MySQL (Database)

How to use:
1. Open directory `backend`
2. Run `go run main.go`
3. Server will running on localhost:8000

There would be three endpoints:

1. /api/customers/
>For /api/customers/ endpoint, there are two methods, GET AND POST.
>GET method is to fetch all users. Meanwhile POST is to insert new user.
2. /api/customers/{id}
>For /api/customers/{id}, only GET method is provided. This endpoint is used to fetch certain user based on id.
3. /api/customers/delete/{id}
>For /api/customers/delete/{id}, only DELETE method is allowed. This endpoint is used to delete certain user from database.

*Schema (DDL) for the database is included in "backend" folder*

*Screenshots are provided for both frontend and backend*



