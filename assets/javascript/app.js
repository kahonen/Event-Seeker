        
    $('.modal').modal();

    //now you can open modal from code
    $('#modal1').modal('open');

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        format: 'yyyy/mm/dd', //working for proper display "mm/dd/yyyy"
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

function displayRoute(userStartLoc, userEndLoc) {

    var directions = L.mapquest.directions();
    directions.route({
        start: userStartLoc,
        end: userEndLoc,
        zoom: 8,
    });
}

// var userStartDate;
// var userEndDate;

  //on click of submit
  $("#submit").on("click", function search () {


  //create variables for start / end cities, start / end dates, categories selected
    var userStartLoc = $("#userStart").val().trim();
    var userEndLoc = $("#userEnd").val().trim();
    var userStartDate = $("#userDateStart").val().trim();
    var userEndDate = $("#userDateEnd").val().trim();

    //create variables for start / end cities, start / end dates, categories selected
    displayRoute(userStartLoc,userEndLoc);

    //checks if a single checkbox is checked
    if ($('#concerts').is(':checked')) {
        console.log('concerts');
    };

    //checks all checkboxes and pushes the id to an array
    var checkboxes = $("input[type='checkbox']");
    console.log(checkboxes);
    checks = [];

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

// }); moved to line __ so date variable would populate

var lat;
var lng;
var latLng = "";
var checks = [];
var userDateRange = "";

console.log(userDateRange);

function eventfulSearch() {

    map.on("click", function mapClick (e) {

        lat = e.latlng.lat
        lng = e.latlng.lng
        latLng = lat + ", " + lng
        console.log(latLng)
        userDateRange = userStartDate + "-" + userEndDate;
        console.log(userDateRange);

    var oArgs = {

        app_key: "KDLDX7hfWzvMDssH",

        t: userDateRange, 
     
        c: checks, //category

        where: latLng,

        within: 50, //set radius

        page_size: 25,

        sort_order: "popularity"

};

    EVDB.API.call("/events/search", oArgs, function(oData) {

        var eventsArr = oData;
    
        console.log(eventsArr);

});

})};

eventfulSearch();

});
