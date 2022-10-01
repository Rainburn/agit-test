package main

import 
(
	"fmt"
	"log"
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	Address string `json:"address"`
}

var db *sql.DB
var err error

func GetCustomers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var users []User

	query := "SELECT * FROM user"
	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Address)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}

	json.NewEncoder(w).Encode(users)

}

func GetCustomersByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var users []User

	params := mux.Vars(r)
	userID := params["id"]

	query := "SELECT * FROM user where id = ?"
	rows, err := db.Query(query, userID)
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Address)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}

	json.NewEncoder(w).Encode(users)
}

func InsertCustomer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var newUser User

	json.NewDecoder(r.Body).Decode(&newUser)

	result, err := db.Exec(`INSERT INTO user (name, address) VALUES (?, ?)`, newUser.Name, newUser.Address)
	userID, err := result.LastInsertId()

	newUser.ID = userID

	status := true
	if err != nil {
		log.Fatal(err)
		status = false
	}

	// Status true when no error occurs
	resultMap := map[string]interface{} {
		"status" : status,
		"id" : newUser.ID,
		"name" : newUser.Name,
		"address" : newUser.Address,
	}

	json.NewEncoder(w).Encode(resultMap)

}

func DeleteCustomer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Content-Type", "application/json")


	params := mux.Vars(r)
	userID := params["id"]

	_, err := db.Exec(`DELETE FROM user where id = ?`, userID)
	if err != nil {
		log.Fatal(err)
	}

	resultMap := map[string]interface{} {
		"id" : userID,
	}

	json.NewEncoder(w).Encode(resultMap)

}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/customers", GetCustomers).Methods("GET")
	r.HandleFunc("/api/customers", InsertCustomer).Methods("POST")
	r.HandleFunc("/api/customers/{id}", GetCustomersByID).Methods("GET")
	r.HandleFunc("/api/customers/delete/{id}", DeleteCustomer).Methods("DELETE")

	// Please change with your own local MySQL settings
	db, err = sql.Open("mysql", "root:Rafi_221168@(localhost)/agit_test?parseTime=true")
	
	if err != nil {
		log.Fatal(err)
	}

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "DELETE"},
		AllowedHeaders: []string{"Content-Type", "X-CSRF-Token"},
	})

	fmt.Printf("Server is starting...")
	handler := c.Handler(r)
	http.ListenAndServe(":8000", handler)

	defer db.Close()

}
