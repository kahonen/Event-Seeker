
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            //initialize all modals           
            $('.modal').modal();

            //now you can open modal from code
            $('#modal1').modal('open');

            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                format: "mm/dd/yyyy",
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: true // Close upon selecting a date,
              });
  
  });

  var mymap = L.map('mapid').setView([39.138582, -98.964844], 5);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
  }).addTo(mymap);

  //on click of submit
  $("#submit").on("click", function() {

  //create variables for start / end cities, start / end dates, categories selected
    var userStartLoc = $("#userStart").val().trim();
    var userEndLoc = $("#userEnd").val().trim();
    var userStartDate = $("#userDateStart").val().trim();
    var userEndDate = $("#userDateEnd").val().trim();

    //clear inputs after submit
    $("#userStart").val("");
    $("#userStartDate").val("");
    $("#userEnd").val("");
    $("#userDateEnd").val("");

    console.log(userStartLoc);
    console.log(userStartDate);
    console.log(userEndLoc);
    console.log(userEndDate);

    //checks if a single checkbox is checked
    if( $('#concerts').is(':checked') ){
        console.log('concerts');
    }

    //checks all checkboxes and pushes the id to an array
    var checkboxes = $("input[type='checkbox']");
    console.log(checkboxes);
    var checks = [];

    for(let i in checkboxes){
        if( checkboxes[i].checked ){
            checks.push(checkboxes[i].id)
        }
    }

    console.log(checks)
  });