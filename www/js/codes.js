var apikey = "5e13ee36b68f0802dd3e606f"; // TODO: INSERT YOUR CORS API KEY HERE OR add formapikey to settings

$(function () {

  // put your own error messages and/or message translation logic here

  var errorMessages = {
    "REQUIRED": "This field is required",
    "UNIQUE": "This value already exists",
    "TYPE": "Invalid data type",
    "REGEX":"Invalid data format",
    "number": "Must be an integer number",
    "money": "Must be a number with max two decimals",
    "JSON":"Not a valid JSON",
    "float_number":"Must be a decimal number",
    "email": "Must be a valid email",
    "FILESIZE": "Upload exceeds file size limit per field (max 1 MB)",
    "UPLOADERROR": "Unable to upload file, please try again",
    "GENERIC_ERROR": "A server error occured, please reload page"
  }

  var successMessage = "Thank you!";

  $.datetimepicker.setLocale('en');

  if (!Modernizr.inputtypes.datetime){
      $("input[data-type=date]").datetimepicker({timepicker:false,format:"Y/m/d"}).attr("type","text");
      $("input[data-type=datetime]").datetimepicker({}).attr("type","text");
      $("input[data-type=time]").datetimepicker({datepicker:false,format:"H:i",value:"12:00"}).attr("type","text");
  }

  $("#kit-codes-form input[data-type=file], #kit-codes-form input[data-type=image]").on("change",function(){
    $(this).data("uploadedfiles",[]);    
  });
  
  if (!apikey) alert("Please insert a CORS API key");

  var ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://kitdemo-79bb.restdb.io/rest/kit-codes",
    "method": "POST",
    "headers": {
      "x-apikey": apikey,
      "content-type": "application/json"
    },
    "processData": false
  }

  var populateLookupSelect = function(options){
    var collname = options.collection;
    var fieldname = options.fieldname;
    var selectfield = options.selectfield;
    var settings = {
     "async": true,
     "url": "https://kitdemo-79bb.restdb.io/rest/"+collname,
     "method": "GET",
     "headers": {
       "x-apikey": apikey
     },
     "cache": false
   }
    if (!apikey) alert("Missing API key for "+collname);
    $.ajax(settings)
    .done(function (items) {
    $.each(items,function(index,item){
      $("#"+fieldname).append('<option value="'+item._id+'">'+item[selectfield]+'</option>'); 
    })
  })
  .fail(function(response){
      console.log(error,response);
  });
}

  populateLookupSelect({collection:"kit-dealers",fieldname:"dealer", selectfield:"dealer-id"});

  function postForm() {

    // clear errors
    $("#kit-codes-form .has-error").removeClass("has-error");
    $("#kit-codes-form .help-block").remove();

    $("#btn-submit").button("loading");

  // we need to reformat date, datetime, datetime-local and time to ISO date strings

    $("input[data-type=datetime],input[data-type=datetime-local]").each(function(){
        var theDate = $(this).val();
        if(theDate){
            var isodate_str = new Date(theDate).toISOString();
            $(this).val(isodate_str);   
        }
    });

    $("input[data-type=date]").each(function(){
      var theDate = $(this).val();
      if (theDate){
          theDate += " GMT";
          var isodate_str = new Date(theDate).toISOString();
          $(this).val(isodate_str);
      }
    });

     $("input[data-type=time]").each(function(){
        var timeval = $(this).val();
        if (timeval){
            var regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            if (timeval.match(regex)){
                var isodate_str = new Date("1970-01-01T"+$(this).val()+":00Z").toISOString();
                $(this).val(isodate_str);
            }   
        }
    });


 // get the form data
    var formObj = $("#kit-codes-form").serializeObject();

    // get attachments from inputs
    var attachments = [];

    $("#kit-codes-form input[data-type=file], #kit-codes-form input[data-type=image]").each(function(input){
      var files = $(this)[0].files;
      if(files && files.length>0){
        attachments.push($(this));
      }
    });

    var attachFuncs = [];
    _.each(attachments,function(attachment){
      attachFuncs.push(uploadAttachment(attachment));
    });
  
    // upload all attachments and return with ids when done
    $.when.apply(null,attachFuncs)
      .done(function(){
        // get the attachment id's from arguments and store into form obj

        _.each(arguments,function(fieldObj){
          formObj = _.assign(formObj,fieldObj);
        });

       // submit the whole form with attachment ids 

       ajaxSettings.data = JSON.stringify(formObj);
        $.ajax(ajaxSettings)
        .done(function (response) {
          // replaces form with a thank you message, please replace with your own functionality
          $("#kit-codes-form").replaceWith("<div class='thank-you'>"+successMessage+"</div>");
        })
        .fail(function (response) {
          $("#btn-submit").button("reset");
          var error = response.responseJSON;
          if (error && error.name==="ValidationError"){
            _.each(error.list,function(fielderr){
              var inputSelector = "[name="+fielderr.field+"]";
              var errorMessageCode = fielderr.message[1];
              var errorMessage = errorMessages[errorMessageCode] || "Invalid value";
              if (errorMessageCode==="TYPE"){
                var fieldType = $(inputSelector).data("type");
                errorMessage = errorMessages[fieldType] || "Invalid value";
              }
              $(inputSelector).after("<div class='help-block'>"+errorMessage+"</div>");
              $(inputSelector).parents(".form-group").addClass("has-error");
            });
          }
          else{
            var msg = (ajaxSettings.headers["x-apikey"] && ajaxSettings.headers["x-apikey"].length < 24) ? "Missing API-key": "Server Error";
            alert(msg);
          }
        });
      })
      .fail( function (response) {
        $("#btn-submit").button("reset");
        if (response.field && response.error){
          var inputSelector = "[name="+response.field+"]";
          $(inputSelector).after("<div class='help-block'>"+response.error+"</div>");
          $(inputSelector).parents(".form-group").addClass("has-error");
        }else{
          var errorMessage = errorMessages.GENERIC_ERROR || "Problem submitting form";
          $("#fg-errors").addClass("has-error")
          .append("<div class='help-block'>"+errorMessage+"</div>");
        }
      });
  };

  $("#kit-codes-form").submit(function (event) {
        postForm();
        event.preventDefault();
        return false;
    });
});
