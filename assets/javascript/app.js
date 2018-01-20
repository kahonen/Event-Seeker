// $(document).ready(function () {
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

    L.mapquest.key = 'fYd7BAWn2v1bYwb1BaSsqDb2cNX8ZLbz';
    var map = L.mapquest.map('map', {
        center: [39.410733, -100.546875],
        layers: L.mapquest.tileLayer('map'),
        zoom: 5,
    });


    $(".button-collapse").sideNav();
    //     closeOnClick: false,
    //   });
    //setTimeout(mapKeyThing, 2000)

// });

function displayRoute(userStartLoc, userEndLoc) {
    // L.mapquest.key = 'fYd7BAWn2v1bYwb1BaSsqDb2cNX8ZLbz';
    // map = L.mapquest.map('map', {
    //     center: [39.410733, -100.546875],
    //     layers: L.mapquest.tileLayer('map'),
    //     zoom: 8,
    // });
    var directions = L.mapquest.directions();
    directions.route({
        start: userStartLoc,
        end: userEndLoc,
        zoom: 8,
    });
}

// function displayEventInfo() {

//     var queryURL = "http://api.eventful.com/json/events/search?app_key=GGCFgxMwzgX7bgfM&category="+ checks + "&location=" + location;
//     var location = 
    

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).done(function (response) {

//  console.log(response)
//     });
// };

// eventful api key GGCFgxMwzgX7bgfM.

//on click of submit
$("#submit").on("click", function () {

    var userStartLoc = $("#userStart").val().trim();
    var userEndLoc = $("#userEnd").val().trim();
    var userStartDate = $("#userDateStart").val().trim();
    var userEndDate = $("#userDateEnd").val().trim();

    $("#userStart").empty();
    $("#userEnd").empty();
    //create variables for start / end cities, start / end dates, categories selected
    displayRoute(userStartLoc,userEndLoc);



    //clear inputs after submit
    // $("#userStart").val("");
    // $("#userStartDate").val("");
    // $("#userEnd").val("");
    // $("#userDateEnd").val("");

    // console.log(userStartLoc);
    // console.log(userStartDate);
    // console.log(userEndLoc);
    // console.log(userEndDate);

    //checks if a single checkbox is checked
    if ($('#concerts').is(':checked')) {
        console.log('concerts');
    };

    //checks all checkboxes and pushes the id to an array
    var checkboxes = $("input[type='checkbox']");
    console.log(checkboxes);
    var checks = [];

    for (let i in checkboxes) {
        if (checkboxes[i].checked) {
            checks.push(checkboxes[i].id)
        }
    }

    console.log(checks)


    var startInfo = $('#startInfo').detach();
    var endInfo = $('#endInfo').detach();
    var firstCol = $('#firstCol').detach();
    var secondCol = $('#secondCol').detach();
    var submitBtn = $('#submit').detach();
    $('#targetDiv').prepend(startInfo, endInfo, firstCol, secondCol, submitBtn);

    $('.button-collapse').sideNav();

});

map.on("click", function(e){

    console.log(e)
});
//http://api.eventful.com/json/events/search?app_key=XXX&category=music&location=london&sort_order=popularity