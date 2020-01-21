var userActive = "active";
var userInactive = "inactive";

function  logOut() {
    localStorage.setItem("account", null);
    localStorage.setItem("accountID", null);
    localStorage.setItem("accountLevel", null);
    localStorage.setItem("accountLink", null);
    localStorage.setItem("accountEmail", null);
    document.getElementById("user").innerHTML = localStorage.getItem("account");
};

function retrieve() {
  document.getElementById("user").innerHTML = localStorage.getItem("account");
};

function store() {
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("account", null);
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
  var query = '?q={"dealer-id":"' + kitUser + '","dealer-pass":"'+ kitPass +'"}';
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

  $.ajax(settings).done(function (response) {
    if (response.length = 1) {
      $.each( response, function( key, value ) {
        console.log(value["dealer-name"]);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("account", value["dealer-name"]);
          localStorage.setItem("accountID", value["dealer-id"]);
          localStorage.setItem("accountLevel", value["permission-level"]);
          localStorage.setItem("accountLink", value["dealer-link"]);
          localStorage.setItem("accountEmail", value["dealer-email"]);
          document.getElementById("user").innerHTML = localStorage.getItem("account");
        } else {
          document.getElementById("user").innerHTML = "Sorry, your device does not support Storage...";
        }
      });
    } else {
      document.getElementById("content").innerHTML = "Login failed. Try Again. Remember, both usernames and passwords are case sensitive."; 
    };
  });
};

$( window ).on( "load", retrieve );