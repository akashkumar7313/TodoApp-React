import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function NewTodo({getTodosFromFirebase}) {
  const [newTodo, setNewTodo] = React.useState({
    title: "",
    description: "",
    category: "",
    done: false,
  });

  useEffect(() => {
    console.log(newTodo);
  }, [newTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted");
    if (newTodo.title === "" || newTodo.category === "" || newTodo.description === "") {
      toast.error("Please add all fields");
      return;
    }else{
      addTodoToFirebase();
    }
  };

  const addTodoToFirebase = async()=>{
    console.log("Adding Todo");
    await addDoc(collection(db,'todos'),newTodo).then(()=>{
      toast.success("Todo Added Successfully");
      getTodosFromFirebase();

      setNewTodo({
        title: "",
        description: "",
        category: "",
        done: false,
      })
    });
  }

  return (
    <div>
      <h1>Add A New Todo</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} alignItems="flex-start" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              value={newTodo.title}
              onChange={(e) => {
                setNewTodo({ ...newTodo, title: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newTodo.category}
              label="Category"
              onChange={(e) => {
                setNewTodo({ ...newTodo, category: e.target.value });
              }}
              fullWidth
            >
              <MenuItem value={"work"}>Work</MenuItem>
              <MenuItem value={"personal"}>Personal</MenuItem>
              <MenuItem value={"others"}>Others</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              fullWidth
              value={newTodo.description}
              onChange={(e) => {
                setNewTodo({ ...newTodo, description: e.target.value });
              }}
            />
          </Grid>
        </Grid>

        <button type="submit">Save Todo</button>
      </form>
    </div>
  );
}