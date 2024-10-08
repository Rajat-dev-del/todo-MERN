import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4002/todo/fetch", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setTodo(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch Todos");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async () => {
    if(!newTodo) return;
    try {
        const response = await axios.post('http://localhost:4002/todo/create',{
            text:newTodo,
            completed:false
        },{
            withCredentials:true,
        })
        setTodo([...todo,response.data]);
        setNewTodo("");
    } catch (error) {
        setError("Failed to create Todo");
    }
  };

  return <div>Home</div>;
}

export default Home;
