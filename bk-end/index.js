// packages
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { database_Connect } from "./config/db.js";
import { Todos } from "./models/todo.mode.js";

// set variable
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  Credential: true,
};

// database connection
(() => database_Connect())();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// get all todos api
app.get("/allTodos", async (request, response) => {
  const allTodo = await Todos.find({});
  response.json({
    message: "all todos",
    data: allTodo,
  });
});

// creating new todo api
app.post("/newTodo", async (request, response) => {
  const todoData = request.body;
  const newTodo = await Todos.create(todoData);
  response.json({
    message: "todo added successfully",
    data: newTodo,
  });
});

// updating todo api
app.put("/updateTodo/:id", async (request, response) => {
  const { id } = request.params;
  const todoData = request.body;
  const updateTodo = await Todos.findByIdAndUpdate(id, todoData);
  const allTodos = await Todos.find({});
  response.json({
    message: "todo update successfully",
    data: allTodos,
  });
});

// deleting todo api
app.delete("/deleteTodo/:id", async (request, response) => {
  const { id } = request.params;
  const deleteTodo = await Todos.findByIdAndDelete(id);
  const allTodos = await Todos.find();
  response.json({
    message: "todo delete successfully",
    data: allTodos,
  });
});

// clear api
app.delete("/clear", async (request, response) => {
  const deleteAllTodos = await Todos.deleteMany();
  response.json({
    message: "all clear",
    data: [],
  });
});

// server listen
app.listen(8000);
