var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var Eid="";
var xSumall = 0;
var xConfirm = 0;
var xCancel = 0;
var xNotReply = 0;


$(document).ready(function () {
	Connect_DB();
	setInterval("CheckTrip();",10000); 
});



function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbTripPrudential = firebase.firestore().collection("TripPrudential");
  CheckTrip();
}


function CheckTrip() {
	xSumall = 0;
	xConfirm = 0;
	xCancel = 0;
	xNotReply = 0;
    $("#Confirm").html("");
    $("#Cancel").html("");
    $("#NotReply").html("");
    $("#Sumall").html("");
    $("#RConfirm").html("");
    $("#RCancel").html("");
    $("#RNotReply").html("");
    $("#RSumall").html("");

  dbTripPrudential
  .orderBy('ConfirmTrip','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	xSumall = xSumall+1;
    	if(doc.data().ConfirmTrip==1) {
    		xConfirm = xConfirm+1;
    	} else if(doc.data().ConfirmTrip==3) {
    		xCancel = xCancel+1;
    	} else {
    		xNotReply = xNotReply+1
    	}
    });
    var rConfirm = (xConfirm*100)/xSumall;
    var rCancel = (xCancel*100)/xSumall;
    var rNotReply = (xNotReply*100)/xSumall;
    var rSumall = (xSumall*100)/xSumall;
    $("#Confirm").html(xConfirm);
    $("#Cancel").html(xCancel);
    $("#NotReply").html(xNotReply);
    $("#Sumall").html("<font color='#0056ff'><b>"+xSumall+"</b></font>");

    $("#RConfirm").html(rConfirm.toFixed(2)+"%");
    $("#RCancel").html(rCancel.toFixed(2)+"%");
    $("#RNotReply").html(rNotReply.toFixed(2)+"%");
    $("#RSumall").html("<font color='#0056ff'><b>"+rSumall.toFixed(2)+"%</b></font>");

    //console.log(xSumall+"<br>"+xConfirm+"<br>"+xCancel+"<br>"+xNotReply);

  });
}




