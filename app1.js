const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

let db;

MongoClient.connect(
  "mongodb+srv://bijoutn:bijoutn@cluster0.fplikuh.mongodb.net/hackathon",
)
  .then((client) => {
    console.log("DB 연결 성공");
    db = client.db("hackathon");

    app.post("/save", (req, res) => {
      db.collection("feedbacks")
        .insertOne({
          content: req.body.content,
          category: req.body.category,
        })
        .then(() => {
          res.send("데이터 추가 성공");
        });
    });

    app.get("/api/feedbacks", async (req, res) => {
      const data = await db.collection("feedbacks").find().toArray();
      res.json(data);
    });

    app.listen(1000, () => {
      console.log("서버 실행 중");
    });
  })
  .catch((err) => console.log(err));
