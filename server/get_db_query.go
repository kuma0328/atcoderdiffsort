package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Ploblem struct {
	Id string
	Name string
	Tag string
	Diff int
	Url string
	Ac bool
}


func get_db_query(Tag string, MinDiff string, MaxDiff string, UserId string) []Ploblem{
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env")
	}

	data_url := os.Getenv("PG_URL")
	fmt.Println(data_url)

	db, err := sql.Open("postgres", data_url)
	if err != nil {
		log.Fatalln("接続失敗", err)
	}
	defer db.Close()

	sql_statement := fmt.Sprintf(
		"SELECT * from ploblem_table WHERE diff BETWEEN %s AND %s ORDER BY diff ASC",
		MinDiff,
		MaxDiff,
	)
	rows, err := db.Query(sql_statement)
	if err != nil {
		log.Fatalln("select 失敗", err)
	}
	defer rows.Close()

	mp := map[string]bool{}
	if UserId != "" {
		mp = userinfo(UserId)
	}
	var data []Ploblem
	for rows.Next() {
		var tmp Ploblem
		err := rows.Scan(&tmp.Id, &tmp.Name, &tmp.Tag, &tmp.Diff, &tmp.Url)
		if err != nil {
			log.Fatalln("取得失敗", err)
		}
		if Tag == "all" || Tag == tmp.Tag{
			var ac = mp[tmp.Id]
			data = append(data, Ploblem{
				Id: tmp.Id,
				Name: tmp.Name,
				Tag: tmp.Tag,
				Diff: tmp.Diff,
				Url: tmp.Url,
				Ac: ac,
			})
		}
	}
	return data
}