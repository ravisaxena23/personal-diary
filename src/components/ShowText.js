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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

function ShowText() {
  const [text, setText] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");
  const [time, setTime] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    console.log("useEffect Hook!!!");
    console.log(time);
    db.collection("todos")
      //   .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setText(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              text: doc.data().text,
              datetime: doc.data().datatime,
              month: doc.data().month,
              year: doc.data().year,
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

  const handleChange = (event) => {
    setTime(event.target.value);
  };
  const handleChang = (event) => {
    setOrder(event.target.value);
  };

  const filterByTime = (value, val) => {
    if (value === 1) {
      db.collection("todos")
        .orderBy("datetime")
        .onSnapshot((snapshot) => {
          setText(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                text: doc.data().text,
                datetime: doc.data().datatime,
                month: doc.data().month,
                year: doc.data().year,
              };
            })
          );
        });
    } else if (value === 2) {
      db.collection("todos")
        .orderBy("month")
        .onSnapshot((snapshot) => {
          setText(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                text: doc.data().text,
                datetime: doc.data().datatime,
                month: doc.data().month,
                year: doc.data().year,
              };
            })
          );
        });
    } else if (value === 3) {
      db.collection("todos")
        .orderBy("year")
        .onSnapshot((snapshot) => {
          setText(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                text: doc.data().text,
                datetime: doc.data().datatime,
                month: doc.data().month,
                year: doc.data().year,
              };
            })
          );
        });
    }
  };

  const filterByArrivial = (value, val) => {
    if (value === 1) {
      db.collection("todos")
        .orderBy("datetime", "desc")
        .onSnapshot((snapshot) => {
          setText(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                text: doc.data().text,
                datetime: doc.data().datatime,
                month: doc.data().month,
                year: doc.data().year,
              };
            })
          );
        });
    } else if (value === 2) {
      db.collection("todos")
        .orderBy("datetime")
        .onSnapshot((snapshot) => {
          console.log("Firebase Snap!");
          setText(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                text: doc.data().text,
                datetime: doc.data().datatime,
                month: doc.data().month,
                year: doc.data().year,
              };
            })
          );
        });
    }
  };
  return (
    <div>
      {/* Filter */}
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="order-label">Choose filter</InputLabel>
        <Select
          labelId="order-label"
          id="select1"
          value={time}
          onChange={handleChange}
        >
          <MenuItem value={1} onClick={() => filterByTime(1)}>
            Week
          </MenuItem>
          <MenuItem value={2} onClick={() => filterByTime(2)}>
            Month
          </MenuItem>
          <MenuItem value={3} onClick={() => filterByTime(3)}>
            Year
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="order-label">Choose filter</InputLabel>
        <Select
          labelId="order-label"
          id="select1"
          value={order}
          onChange={handleChang}
        >
          <MenuItem value={1} onClick={() => filterByArrivial(1)}>
            Newest first
          </MenuItem>
          <MenuItem value={2} onClick={() => filterByArrivial(2)}>
            Oldest First
          </MenuItem>
        </Select>
      </FormControl>
      {/* Show text */}
      <List dense={true}>
        {text.map((text) => (
          <ListItem key={text.id}>
            {/* {console.log(text)} */}
            {/* <ListItemText primary={text.name} secondary={text.date} />
            <ListItemText primary={text.date} secondary={text.date} /> */}
            {text.text}
            {text.month}
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

      {/* update text */}
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
