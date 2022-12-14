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
  database: conf.database,
});
// 연결 수행
connection.connect();

// multer 라이브러리 불러오기
const multer = require("multer");
// root 폴더에 upload 폴더를 사용자의 파일이 업로드 되는 공간으로 설정
const upload = multer({ dest: "./upload" });

app.get("/api/customers", (req, res) => {
  connection.query("select * from customer where isDeleted = 0", (err, rows, fields) => {
    res.send(rows);
  });
});

// image 폴더에서 upload 폴더에 접근하여 업로드 폴더 공유할 수 있도록
app.use("/image", express.static("./upload"));

// 사용자가 고객추가 데이터를 전송했을 때, 이를 처리할 수 있도록
app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "insert into customer values (null, ?, ?, ?, ?, ?, 0, now())";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  // ?에 들어갈 데이터를 변수의 형태로 적어줌
  let params = [image, name, birthday, gender, job];
  // 쿼리 함수 내에서 해당 파라미터를 전송할 수 있도록 함
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  // 특정 id의 값을 가지는 데이터에서 isDeleted 속성을 1로 바꿔준다 > 삭제 완료 되었다
  let sql = "update customer set isDeleted = 1 where id = ?";
  // 데이터 전달
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
