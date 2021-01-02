import React, { useState, useEffect } from "react";
import db from "../firebase-config";
import firebase from "firebase";

import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";

import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function ShowText() {
  const [text, setText] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");

  useEffect(() => {
    console.log("useEffect Hook!!!");

    db.collection("todos")
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setText(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().text,
              datatime: doc.data().datatime,
            };
          })
        );
      });
  }, []);

  const deleteText = (id) => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (text) => {
    setOpen(true);
    setToUpdateId(text.id);
    setUpdate(text.name);
  };

  const editText = () => {
    db.collection("todos").doc(toUpdateId).update({
      text: update,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <List dense={true}>
        {text.map((text) => (
          <ListItem key={text.id}>
            <ListItemText primary={text.name} secondary={text.datetime} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => openUpdateDialog(text)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteText(text.id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={(event) => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editText} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowText;
