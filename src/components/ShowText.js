import React, { useState, useEffect, Fragment } from "react";
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
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
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
              day: doc.data().day,
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
                day: doc.data().day,
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
                day: doc.data().day,
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
                day: doc.data().day,
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
                day: doc.data().day,
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
                day: doc.data().day,
              };
            })
          );
        });
    }
  };
  return (
    <div>
      {/* Filter */}
      <h2 style={{fontFamily:"cursive",textAlign:"center"}}>Choose Filter</h2>
      <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
      <FormControl style={{ width: "100%" }} >
        <InputLabel id="order-label">Choose filter</InputLabel>
        <Select
        labelId="order-label"
        id="select1"
        value={order}
        onChange={handleChang}
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
      </Grid>
      <Grid item xs={12} md={6}>
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
      </Grid>
      </Grid>
      {/* Show text */}
      <h2 style={{fontFamily:"cursive",textAlign:"center"}}>Your reminder</h2>
      <Grid
        container
        spacing={3}
        style={{ padding: "10px", marginTop: "20px" }}
      >
        {text.map((text) => (
          <Grid item md={6} xs={12}>
            <Card>
              <Grid container spacing={3}>
                <Grid item xs={6} md={6} className="course-preview">
                  <div style={{ padding: "10px" }}>
                    <h6>Date</h6>
                    <h4>
                      {text.day} - {text.month + 1} - {text.year}
                    </h4>
                  </div>
                </Grid>
                <Grid item xs={6} md={6}>
                  <div>
                    <h6>Reminder</h6>
                    <h2>{text.text}</h2>
                  </div>
                  <Fab
                    aria-label="add"
                    size="small"
                    style={{
                      float: "right",
                      padding: "10px",
                      margin: "10px",
                      backgroundColor: "#990000",
                      color: "#fafafa",
                    }}
                    onClick={() => deleteText(text.id)}
                  >
                    <DeleteOutlineRounded />
                  </Fab>
                  <Fab
                    aria-label="add"
                    size="small"
                    style={{
                      float: "right",
                      padding: "10px",
                      margin: "10px",
                      backgroundColor: "#2A265F",
                      color: "#fafafa",
                    }}
                    onClick={() => openUpdateDialog(text)}
                  >
                    <Edit />
                  </Fab>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* update text */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Reminder"
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
