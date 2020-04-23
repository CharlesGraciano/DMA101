'use strict'

function gotData (data){

	fbData = data.val();

	if (fbData){

		console.log ('received data:');
		console.log (fbData);
		fbDataArray = Object.values(fbData);
	} else {
		console.log ('nothing in this folder yet');
	}

	}

function errData (err){
console.log ("error! didi not recieve data!");
console.log(err);


}