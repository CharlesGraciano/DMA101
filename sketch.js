'use strict'

let array = [];
let noiseOffset = 0.0;
let strokeWidth = 5;
let nodeData; //object we will puch to firbase 
let fbData; // data we pull from firebase 
let fbDataArray; // firibase data values converted to an array 
let database; // refernece to our firebase database 
let folderName = 'inbox'; //name of folder you create in db
let textInput;
let sendTextBtn;
let receiveMessageBtn;
let receivedMessage;
let receiveDiv, sendDiv;
let sendAgainBtn;
let createNode;

function setup() {
 createCanvas(windowWidth, windowHeight);
  background(200);
  
  noFill();

 //textInput = select("#textInput");
 textInput = document.querySelector("#textInput");
 sendTextBtn = document.querySelector("#sendTextBtn");
 receiveMessageBtn = document.querySelector("#receiveMessageBtn");
 receivedMessage = document.querySelector("#receivedMessage");
 receiveDiv = document.querySelector("#receiveDiv");
 sendDiv = document.querySelector("#sendDiv");
 sendAgainBtn = document.querySelector("#sendAgainBtn");


 

 sendTextBtn.addEventListener('click', sendText);
 receiveMessageBtn.addEventListener('click', receivedMessage);
 sendAgainBtn.addEventListener('click', sendAgain);

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
  //if (mouseIsPressed){
// if (mouseIsPressed==true){
background(200,0,0,10);
strokeWeight(strokeWidth);

noiseOffset += 0.07;
strokeWidth = noise(noiseOffset) * 100;


stroke(map(mouseX,0,500,0,300,true));
line(width-mouseX, height-mouseY, width-pmouseX, height-pmouseY);
line(mouseX, mouseY, pmouseX, pmouseY);
//background(0);
array.push([mouseX,mouseY]);


}
function keyTyped(){

if(key==='s'){
//save this image
saveCanvas('fileName', 'png');

} else if (key === 'c'){
clear();
}}

//else if (key==='d'){
//display image
background(255);


beginShape();
for(let i = 0; i < array.length; i++){
//line(array[i][0], array[i][1], array[i + 1][0], array[i + 1][1]);
curveVertex(array[i][0], array[i][1]);

}
endShape();{
//line(array[0][0], array[0][1],array[2][0],array[2][1]);
}
return false;

function sendText(){

  if (textInput.value) {

let timestamp = Date.now();
nodeData = {
  messageText: textInput.value,
  timestamp: timestamp,
  received: false,
}

  createNode(folderName,timestamp,nodeData);

  createP('Sent Text:'+ nodeData.sendText);

  textInput.value = ''

  sendDiv.style.display = 'none';
  receiveDiv.display ='block';


} else {
  alert (" Message wasn't sent. Please try again. ")
}}

function receiveMessage(){

  shuffleArray (fbDataArray)


  for (let i = 0; i < fbDataArray.length; i++){

    if(fbDataArray[i].received === false){

      receiveMessage.innerHTML = fbDataArray[i].messageText

updateNode(folderName,fbDataArray[i].timestamp,{
  received:true
}); 

receieveMessageBtn.syle.display ='none';
sendAgainBtn.style.display = 'block';

      break;



  } else{ 

    receiveMessage.innerHTML = "";
    receieveMessageBtn.syle.display ='none';
    sendAgainBtn.style.display = 'block';


  }

}

}
function sendAgain(){
receiveMessage.innerHTML = "you have no new messages";


receiveDiv.display ='none';
sendDiv.style.display = 'block';

}
function shuffleArray (_array){

for(let i=_array.length - 1; i>0; i-- ){
  let randomIndex = Math.foor(Math.random()*(i+1));
  [_array[i],_array[randomIndex]]= [_array[randomIndex],_array[i]];
}


}

