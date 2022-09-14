package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Param struct {
	Tag string `json:"tag"`
	MinDiff string `json:"minDiff"`
	MaxDiff string `json:"maxDiff"`
	UserId string `json:"userId"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set( "Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")

	if r.Method == "POST" {
		fmt.Println("OK")
		var param Param

		if err := json.NewDecoder(r.Body).Decode(&param); err != nil {
			log.Fatal(err)
		}
		fmt.Println(param.Tag,param.MinDiff,param.MaxDiff,param.UserId)
		data := get_db_query(param.Tag, param.MinDiff, param.MaxDiff, param.UserId)
		res, err := json.Marshal(data)
		if err != nil {
			fmt.Println(err)
		}
		w.Write(res)
	}
}

func main()  {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+port,nil)
}