// 파일이 접근할 수 있는 라이브러리 불러오기
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 파일 읽어오기
const data = fs.readFileSync("./database.json");
// 해당 환경설정 데이터를 파싱해서 가져올 수 있도록 함
const conf = JSON.parse(data);
// mysql 라이브러리를 불러와서 mysql 변수에 담아줌
const mysql = require("mysql");

// 연결과 관련한 변수 설정
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
// 연결 수행
connection.connect();

app.get("/api/customers", (req, res) => {
  connection.query(
    "select * from customer",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
