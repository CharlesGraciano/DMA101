'use strict'


let nodeData; //object we will puch to firbase 
let fbData; // data we pull from firebase 
let fbDataArray; // firibase data values converted to an array 
let database; // refernece to our firebase database 
let folderName = 'inbox'; //name of folder you create in db


function setup() {
 noCanvas();

  let config = {
    apiKey: "AIzaSyDJdRoS4rYe5hMwf8_LNWrEF0NLC3fKsS8",
    authDomain: "text-me-dc031.firebaseapp.com",
    databaseURL: "https://text-me-dc031.firebaseio.com",
    projectId: "text-me-dc031",
    storageBucket: "text-me-dc031.appspot.com",
    messagingSenderId: "232930402370",
    appId: "1:232930402370:web:0524cc10c396f9ebf70ddb",
    
  };

  firebase.initializeApp(config);

  database = firebase.database();

  let ref= database.ref(folderName);

  ref.on('value', gotData, errData);
}

function draw() {
  
}