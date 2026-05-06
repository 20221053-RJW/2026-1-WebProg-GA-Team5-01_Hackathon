const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));
let db;

MongoClient.connect(
  "mongodb+srv://bijoutn:bijoutn@cluster0.fplikuh.mongodb.net/hackathon",
)
  .then((client) => {
    console.log("DB 연결 성공");
    db = client.db("hackathon");

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public/student.html"));
    });

    app.get("/student", (req, res) => {
      res.sendFile(path.join(__dirname, "public/student.html"));
    });

    app.get("/teacher", (req, res) => {
      res.sendFile(path.join(__dirname, "public/teacher.html"));
    });

    app.get("/enter", (req, res) => {
      res.sendFile(path.join(__dirname, "public/enter.html"));
    });

    app.post("/save", (req, res) => {
      db.collection("feedbacks")
        .insertOne({
          content: req.body.content,
          category: req.body.category,
        })
        .then(() => {
          console.log("Question saved!");
          res.send("데이터 추가 성공");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error");
        });
    });

    app.get("/api/feedbacks", async (req, res) => {
      try {
        const data = await db.collection("feedbacks").find().toArray();
        res.json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.listen(1000, () => {
      console.log("Server is running on port 1000");
    });
  })
  .catch((err) => console.log(err));
