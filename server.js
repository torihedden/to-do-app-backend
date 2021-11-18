const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const connection = require("./connection");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app
  .route("/")
  .get((req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    connection.main().then(() => {
      connection.getTodoItems().then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  })

  .put((req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    const { _id, title, completed } = req.body;
    const newTodo = {
      _id,
      title,
      completed,
    };

    connection.main().then(() => {
      connection.updateTodoItem(newTodo).then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  })

  .post((req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    const { title } = req.body;
    const newTodo = {
      userId: 2,
      title,
      completed: false,
    };

    connection.main().then(() => {
      connection.createTodoItem(newTodo).then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  })

  .delete((req, res) => {
    const { id } = req.body;

    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    connection.main().then(() => {
      connection.deleteTodoItem(id).then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
