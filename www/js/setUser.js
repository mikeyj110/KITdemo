var userActive = "active";
var userInactive = "inactive";

function  logOut() {
    localStorage.setItem("account", "null");
    localStorage.setItem("accountID", "null");
    localStorage.setItem("accountLevel", "null");
    localStorage.setItem("accountLink", "null");
    localStorage.setItem("accountEmail", "null");
    localStorage.setItem("accountPass", "null");
    //document.getElementById("user").innerHTML = localStorage.getItem("account");
    window.location="login.html";
};

function loginPage(){
  window.location="login.html";
};

function retrieve() {
  document.getElementById("user").innerHTML = localStorage.getItem("account");
};

function store() {
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("account", userActive);
    // Retrieve
    document.getElementById("user").innerHTML = localStorage.getItem("account");
  } else {
    document.getElementById("user").innerHTML = "Sorry, your device does not support Storage...";
  }
};

function getUser() {
  var kitUser = document.getElementById("dealerID").value;
  var kitPass = document.getElementById("dealerPass").value;
  var query = '?q={"dealer-id":"' + kitUser + '","dealer-pass":"' + kitPass +'"}';
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": baseUrl + "kit-dealers" + query,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    }
  };
  console.log(settings);
  $.ajax(settings).done(function(response) {
    // console.log(response);
    // console.log(response.length);
    if (response.length == 1) {
      $.each( response, function( key, value ) {
        localStorage.setItem("account", value["dealer-name"]);
        localStorage.setItem("accountPass", value["dealer-pass"]);
        localStorage.setItem("accountID", value["dealer-id"]);
        localStorage.setItem("accountLevel", value["permission-level"]);
        localStorage.setItem("accountLink", value["dealer-link"]);
        localStorage.setItem("accountEmail", value["dealer-email"]);
        localStorage.setItem("accountBaseID", value["_id"]);
        document.getElementById("user").innerHTML = localStorage.getItem("account");
      });
      window.location="index.html";
    } else {
      document.getElementById("loginError").innerHTML = "Login failed, try Again. Remember, usernames and passwords are case sensitive."; 
    };
  });
};

$( window ).on( "load", retrieve );