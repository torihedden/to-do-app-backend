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

app.route("/health").get((_, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  connection.main().then(() => {
    res.end("200 OK");
  });
});

app
  .route("/todos")
  .get((_, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    connection.main().then(() => {
      connection.getTodoItems().then((result) => {
        res.end(JSON.stringify(result));
      });
    });
  })

  // .get("todos/priority", (req, res) => {
  //   res.set("Content-Type", "application/json");
  //   res.set("Access-Control-Allow-Origin", "*");

  //   connection.main().then(() => {
  //     connection.getTodoPriorities().then((result) => {
  //       res.end(JSON.stringify(result));
  //     });
  //   });
  // })

  // app.get("/todos/:id", (req, res) => {
  //   const { id } = req.params;

  //   res.set("Content-Type", "application/json");
  //   res.set("Access-Control-Allow-Origin", "*");

  //   connection.main().then(() => {
  //     connection.getTodoItem(id).then((result) => {
  //       res.end(JSON.stringify(result));
  //     });
  //   });
  // });

  .put((req, res) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    const { _id, title, completed, priority } = req.body;
    const newTodo = {
      _id,
      title,
      completed,
      priority,
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

    const { title, priority } = req.body;
    const newTodo = {
      title,
      completed: false,
      priority,
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

// app.delete("todos/all", (req, res) => {
//   res.set("Content-Type", "application/json");
//   res.set("Access-Control-Allow-Origin", "*");

//   connection.main().then(() => {
//     connection.deleteAllTodos().then((result) => {
//       res.end(JSON.stringify(result));
//     });
//   });
// });

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
