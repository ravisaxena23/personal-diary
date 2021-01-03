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

const AddText = () => {
  const [texts, setTexts] = useState([]);
  const [input, setInput] = useState("");

  const addText = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      text: input,
      month: new Date().getMonth(),
      year: new Date().getUTCFullYear(),
      day: new Date().getUTCDate(),
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div>
      <h2 style={{fontFamily:"cursive",textAlign:"center",marginTop:"80px"}}>Add reminder</h2>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="text"
          label="Enter text"
          name="text"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addText}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddText;
