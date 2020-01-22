function  logOut() {
    localStorage.setItem("account", "null");
    localStorage.setItem("accountID", "null");
    localStorage.setItem("accountLevel", "null");
    localStorage.setItem("accountLink", "null");
    localStorage.setItem("accountEmail", "null");
    localStorage.setItem("accountPass", "null");
    window.location="login.html";
};

if (localStorage.getItem("account") == "null") {
    // console.log("user null");
    window.location='login.html';
} else {
  console.log("user: " + localStorage.getItem("accountID"));
  console.log("user: " + localStorage.getItem("accountPass"));

  function getUser() {
    var currentUser = localStorage.getItem("accountID");
    var currentPass = localStorage.getItem("accountPass");
    // var query = "?q={'dealer-id':'" + currentUser + "','dealer-pass':'" + currentPass + "'}'";
    var query = '?q={"dealer-id":"' + currentUser + '","dealer-pass":"' + currentPass +'"}';
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
    $.ajax(settings).done( function(response) {
      console.log(response);
      // console.log(response.length);
      if (response.length !== 1) {
        console.log("user: " + response.length);
        logOut();
      } else {
      };
    });
  };

  getUser();
};