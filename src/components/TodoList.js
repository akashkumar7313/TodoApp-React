import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Stack } from "@mui/system";
import { Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { async } from "@firebase/util";
import toast from "react-hot-toast";

export default function ({getTodosFromFirebase,loading,todos}) {
  

  React.useEffect(() => {
    getTodosFromFirebase();
  }, []);

  

  const deleteTodoFromFirebase = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef).then(() => {
      toast("Todo Deleted Successfully");
      getTodosFromFirebase();
    });
  };

  const updateTodoFromFirebase = async (todo) => {
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, {
      done: !todo.done,
    }).then(()=>{
      toast("Todo Updated Successfully");
      getTodosFromFirebase()
    });
  };

  return (
    <div>
      {loading ? (
        <p>Fetching Todos</p>
      ) : (
        todos.map((todo) => {
          return (
            <Accordion key={todo.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{todo.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{todo.description}</Typography>

                <Stack direction="row" spacing={1}>
                  <Chip label={todo.category} color="primary" />
                  {/* <Chip label="success" color="success" /> */}
                  {todo.done ? (
                    <Chip label="Done" color="success" />
                  ) : (
                    <Chip label="Not Done" color="secondary" />
                  )}

                  <IconButton
                    onClick={() => {
                      deleteTodoFromFirebase(todo.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {!todo.done ? (
                    <button
                      onClick={() => {
                        updateTodoFromFirebase(todo);
                      }}
                    >
                      Mark As Done
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateTodoFromFirebase(todo);
                      }}
                    >
                      Mark As Undone
                    </button>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </div>
  );
}