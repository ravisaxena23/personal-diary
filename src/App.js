import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebase-config'
import firebase from 'firebase';
import Text from './components/AddText';
import ShowText from './components/ShowText';

import {Container} from '@material-ui/core';


function App() {

  return (
    <Container maxWidth="sm">

      <Text />
      <ShowText />

    </Container >
  );
}

export default App;
