import requests
import time
import psycopg2
import os
from dotenv import load_dotenv

def getPloblem():
  list = []
  ploblem_url = 'https://kenkoooo.com/atcoder/resources/problems.json'

  diff_url = 'https://kenkoooo.com/atcoder/resources/problem-models.json'
  diff_info = requests.get(diff_url)
  diff_info = diff_info.json()
  time.sleep(1)
  res = requests.get(ploblem_url)
  res = res.json()
  baseurl = 'https://atcoder.jp/contests/'
  for data in res:
    if 'abc' in data['contest_id'] or 'arc' in data['contest_id'] or 'agc' in data['contest_id']:
      url = baseurl + data['contest_id'] + '/tasks/' + data['id']
      ploblem_id = data['contest_id'] + '_' + data['problem_index'].lower()
      if 'difficulty' not in diff_info[data['id']].keys():
        continue
      name = data['name']
      name = name.replace("'","")
      diff = diff_info[data['id']]['difficulty']
      if 'abc' in data['contest_id']:
        list.append({'id':ploblem_id,'name':name,'tag':'abc','diff':diff,'url':url})
      if 'arc' in data['contest_id']:
        list.append({'id':ploblem_id,'name':name,'tag':'arc','diff':diff,'url':url})
      if 'agc' in data['contest_id']:
        list.append({'id':ploblem_id,'name':name,'tag':'agc','diff':diff,'url':url})
  return list

load_dotenv()

list = getPloblem()
conn = psycopg2.connect(os.environ['PG_URL'])
cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS ploblem_table')
cur.execute('CREATE TABLE ploblem_table (id varchar primary key, name varchar, tag varchar, diff integer, url varchar);')


for data in list:
  s = "INSERT INTO ploblem_table (id, name, tag, diff, url) VALUES('{}','{}','{}',{},'{}')".format(
    data['id'], data['name'], data['tag'], data['diff'], data['url']
  )
  print(s)
  cur.execute(s)

conn.commit()

cur.execute('SELECT * FROM ploblem_table;')
print(cur.fetchall())

cur.close()
conn.close()