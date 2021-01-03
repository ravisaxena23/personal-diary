import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import db from "./firebase-config";
import firebase from "firebase";
import Text from "./components/AddText";
import ShowText from "./components/ShowText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Container } from "@material-ui/core";

function App() {
  return (
    <Fragment>
      <AppBar position="fixed" style={{backgroundColor:"#2A265F"}}>
        <Toolbar></Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Text />
        <ShowText />
      </Container>
    </Fragment>
  );
}

export default App;
