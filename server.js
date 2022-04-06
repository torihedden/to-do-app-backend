const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./connection");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app
  .route("/todos")
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
      title,
      completed: false,
    };

    connection.main().then(() => {
      connection.createTodoItem(newTodo).then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  });

app.delete("/todos/completed", (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  connection.main().then(() => {
    connection.deleteCompletedTodos().then((result) => {
      res.end(JSON.stringify(result));
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  connection.main().then(() => {
    connection.deleteTodoItem(id).then((result) => {
      res.end(JSON.stringify(result));
    });
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  connection.main().then(() => {
    connection.getTodoItem(id).then((result) => {
      res.end(JSON.stringify(result));
    });
  });
});

app.listen(process.env.PORT, () => {});
