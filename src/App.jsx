import React, { useState, useEffect } from "react";
import "./styles.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { Card, CardContent, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilteredTodos(todos);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newItem.trim() !== "") {
      setTodos((currentTodos) => [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
        },
      ]);
    }

    setNewItem("");
  };

  const toggleTodos = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      );
    });
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const handleFilterAll = () => {
    setFilteredTodos(todos);
  };

  const handleFilterActive = () => {
    setFilteredTodos(todos.filter((todo) => !todo.completed));
  };

  const handleFilterCompleted = () => {
    setFilteredTodos(todos.filter((todo) => todo.completed));
  };

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Todo List</h1>
        <form onSubmit={handleSubmit} className="todo-form">
          <TextField
            label="Add a new task"
            variant="outlined"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="todo-input"
          />
          <Button type="submit" variant="contained" className="add-button">
            Add
          </Button>
        </form>

        <Stack spacing={1} className="todo-list">
          {filteredTodos.length === 0 && (
            <p className="empty-message">No todos</p>
          )}
          {filteredTodos.map((todo) => (
            <Card key={todo.id} className="todo-item">
              <CardContent>
                <label className="todo-label">
                  <Checkbox
                    checked={todo.completed}
                    onChange={(e) => toggleTodos(todo.id, e.target.checked)}
                  />
                  {editingTodoId === todo.id ? (
                    <TextField
                      value={todo.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setTodos((currentTodos) =>
                          currentTodos.map((t) =>
                            t.id === todo.id ? { ...t, title: newTitle } : t
                          )
                        );
                      }}
                      onBlur={() => setEditingTodoId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditingTodoId(null);
                        }
                      }}
                    />
                  ) : (
                    <span
                      className={`todo-title ${
                        todo.completed ? "completed" : ""
                      }`}
                      onClick={() => setEditingTodoId(todo.id)}
                    >
                      {todo.title}
                    </span>
                  )}
                </label>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
                {editingTodoId === todo.id ? (
                  <IconButton onClick={() => setEditingTodoId(null)}>
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setEditingTodoId(todo.id)}>
                    <EditIcon />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          ))}
        </Stack>

        <nav className="nav-buttons-container">
          <Button
            onClick={handleFilterAll}
            variant="outlined"
            className="allbtn"
          >
            All
          </Button>
          <Button
            onClick={handleFilterCompleted}
            variant="outlined"
            className="completedbtn"
          >
            Completed
          </Button>
          <Button
            onClick={handleFilterActive}
            variant="outlined"
            className="activebtn"
          >
            Active
          </Button>
        </nav>
      </div>

      <footer className="app-footer">
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/nikita-perehudov/"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
          <a href="https://www.instagram.com/de_nikitus/" target="_blank">
            <InstagramIcon />
          </a>
        </div>
        <p>
          {" "}
          © 2023{" "}
          <a href="https://perehudovnikita.online/">perehudovnikita.online</a>
        </p>
      </footer>
    </>
  );
}

export default App;
