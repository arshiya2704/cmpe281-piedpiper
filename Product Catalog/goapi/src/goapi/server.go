package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// MongoDB Config
var mongodb_server = "192.168.99.100:27017"
var mongodb_database = "catalogdb"
var mongodb_collection = "catalog"

// RabbitMQ Config
var rabbitmq_server = "192.168.99.100"
var rabbitmq_port = "5672"
var rabbitmq_queue = "product"
var rabbitmq_user = "guest"
var rabbitmq_pass = "guest"


// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/products", productsHandler(formatter)).Methods("GET")
/*	mx.HandleFunc("/products", productsUpdateHandler(formatter)).Methods("PUT")
	mx.HandleFunc("/order", productsNewOrderHandler(formatter)).Methods("POST")
	mx.HandleFunc("/order/{id}", productsOrderStatusHandler(formatter)).Methods("GET")
	mx.HandleFunc("/order", productsOrderStatusHandler(formatter)).Methods("GET")
	mx.HandleFunc("/orders", productsProcessOrdersHandler(formatter)).Methods("POST")*/
}


// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// API Product Catalog Handler
func productsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		var result bson.M
		err = c.Find(bson.M{"ProductId" : "234566778990"}).One(&result)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Product Catalog:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}