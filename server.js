import "dotenv/config"
import express from "express"
import cors from "cors"
import {
  createTodoItem,
  deleteAllCompletedTodos,
  deleteTodoItem,
  getTodoItem,
  getTodoItems,
  main,
  updateTodoItem
} from "./connection.js"

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.route("/health").get((_, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  main().then(() => {
    res.end("200 OK");
  });
});

app
  .route("/todos")
  .get((_, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    main().then(() => {
      getTodoItems().then((result) => {
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

    main().then(() => {
      updateTodoItem(newTodo).then((result) => {
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

    main().then(() => {
      createTodoItem(newTodo).then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  });

app.delete("/todos/completed", (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  main().then(() => {
    deleteAllCompletedTodos().then((result) => {
      res.end(JSON.stringify(result));
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  main().then(() => {
    deleteTodoItem(id).then((result) => {
      res.end(JSON.stringify(result));
    });
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  main().then(() => {
    getTodoItem(id).then((result) => {
      res.end(JSON.stringify(result));
    });
  });
});

app.listen(process.env.PORT, () => { });
