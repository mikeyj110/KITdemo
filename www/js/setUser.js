var userActive = "active";
var userInactive = "inactive";

function  logOut() {
    localStorage.setItem("account", null);
    localStorage.setItem("account", userInactive);
    document.getElementById("user").innerHTML = localStorage.getItem("account");
};

function retrieve() {
  document.getElementById("user").innerHTML = localStorage.getItem("account");
};

function store() {
  var userActive = document.getElementById("dealerID").value;


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

$( window ).on( "load", retrieve );