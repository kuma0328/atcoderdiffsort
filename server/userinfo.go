package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

	
type Post struct {
	ID            int     `json:"id"`
	EpochSecond   int     `json:"epoch_second"`
	ProblemID     string  `json:"problem_id"`
	ContestID     string  `json:"contest_id"`
	UserID        string  `json:"user_id"`
	Language      string  `json:"language"`
	Point         float64 `json:"point"`
	Length        int     `json:"length"`
	Result        string  `json:"result"`
	ExecutionTime int     `json:"execution_time"`
}

func userinfo(userId string) map[string]bool {
	url := "https://kenkoooo.com/atcoder/atcoder-api/results?user="

	res, err := http.Get(url + userId)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	time.Sleep(1 * time.Second)

	body, _ := ioutil.ReadAll(res.Body)

	var posts []Post
	if err := json.Unmarshal(body, &posts); err != nil {
		fmt.Println(err)
		return nil
	}
	mp := map[string]bool{}
	for _, val := range posts {
		if val.Result == "AC" {
			mp[val.ProblemID] = true
		}
	}
	return mp
}