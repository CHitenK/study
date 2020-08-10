import React, { useState, useEffect } from "react";
import ToDoForms from "../components/ToDoForms";
import TodoList from "../components/TodoList";
import { ITodo } from "../interfaces";

const TodoPages: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addHandler = (title: string): void => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      complited: false
    };
    console.log("Add new Todo: ", title);
    //setTodos([newTodo, ...todos])
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleHandler = (id: number) => {
    setTodos(prev => {
      return prev.map(todo => {
        if (todo.id === id) {
          todo.complited = !todo.complited;
        }
        return todo;
      });
    });
  };

  const removeHandler = (id: number) => {
    const shouldRemove = window.confirm(
      "Are you sure you want to remove the task?"
    );
    if (shouldRemove) {
      setTodos(prev => {
        return prev.filter(todo => {
          return todo.id !== id;
        });
      });
    }
  };
  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="container">
      <ToDoForms onAdd={addHandler} />
      <TodoList
        todos={todos}
        onRemove={removeHandler}
        onToggle={toggleHandler}
      />
    </div>
  );
};

export default TodoPages;
