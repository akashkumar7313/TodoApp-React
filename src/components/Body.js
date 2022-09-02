import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Body() {
  const [todos, setTodos] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const getTodosFromFirebase = async () => {
    console.log("Geting Todos");

    const todoSnapshot = await getDocs(collection(db, "todos"));
    const todoList = todoSnapshot.docs.map((doc) => {
      console.log(doc.id);
      let tempData = doc.data();
      return { ...tempData, id: doc.id };
    });
    console.log(todoList);
    setTodos(todoList);
    setLoading(false);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: "40px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <NewTodo getTodosFromFirebase={getTodosFromFirebase} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <TodoList
              getTodosFromFirebase={getTodosFromFirebase}
              loading={loading}
              todos={todos}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}