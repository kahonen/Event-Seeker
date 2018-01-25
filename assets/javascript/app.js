
    $('.modal').modal({
        dismissible: false,
    });

    //now you can open modal from code
    $('#modal1').modal('open');

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        format: 'mm/dd/yyyy', //working for proper display "mm/dd/yyyy"
        formatSumbit: 'yyyy/mm/dd',
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        container: 'body',
        min: new Date(),
        max: false,
        closeOnSelect: true // Close upon selecting a date,
        
    });

    L.mapquest.key = 'fYd7BAWn2v1bYwb1BaSsqDb2cNX8ZLbz';
    var map = L.mapquest.map('map', {
        center: [39.410733, -100.546875],
        layers: L.mapquest.tileLayer('light'),
        zoom: 12,
        zoomControl: true,
    });

    map.zoomControl.setPosition('topright');

    $(".button-collapse").sideNav();


    function displayRoute(userStartLoc, userEndLoc) {
        $("g").empty();
        $(".leaflet-marker-pane").empty();
        $(".leaflet-shadow-pane").empty();
     
    var directions = L.mapquest.directions();
    directions.route({
        start: userStartLoc,
        end: userEndLoc,
        options: {
            timeOverage: 25,
            maxRoutes: 3,
            zoom: 12,
            enhancedNarrative: true,
          },
        });
        };

function validateEnd (userStartDate, userEndDate) {
    
    if (userEndDate < userStartDate) {
        Materialize.toast('End date must occur on or after Start Date', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
        return false
    }
    else if (userEndDate >= userStartDate) {
        
        return true
    };
};

  //on click of submit
  $("#submit").on("click", function search () {
    
  //create variables for start / end cities, start / end dates, categories selected
    var userStartLoc = $("#userStart").val().trim();
    var userEndLoc = $("#userEnd").val().trim();
    var userStartDate = $("#userDateStart").val().trim();
    var userEndDate = $("#userDateEnd").val().trim();

    if (validateEnd(userStartDate, userEndDate)) {
        $('#modal1').modal('close'); //added from up top

    displayRoute(userStartLoc,userEndLoc)

    //checks if a single checkbox is checked
    if ($('#concerts').is(':checked')) {
        console.log('concerts');
    };

    var checks = [];

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

    var imageLogo = $('#imageModal').children().last().attr('width', '175px').detach();
    var startInfo = $('#startInfo').detach();
    var endInfo = $('#endInfo').detach();
    var firstCol = $('#firstCol').detach();
    var secondCol = $('#secondCol').detach();
    var submitBtn = $('#submit').detach();

    $('#targetDiv').append(imageLogo, startInfo, endInfo, firstCol, secondCol, submitBtn);

    $('.button-collapse').sideNav();

    var lat;
    var lng;
    var latLng = "";
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
          console.log(checks);
  
      var oArgs = {
  
          app_key: "KDLDX7hfWzvMDssH",
  
          t: userDateRange, 
       
          c: checks, 

          where: latLng,

          within: 50, //set radius

          page_size: 30, 

          sort_order: "popularity"

    };

    console.log(oArgs)

    EVDB.API.call("/events/search", oArgs, function(oData) {

        var eventsArr = oData;
    
        console.log(eventsArr);
        var events = eventsArr.events.event;

        for (i = 0; i < events.length; i++) {

            console.log(events[i].latitude, events[i].longitude);

            var result = "<a href='" + events[i].url + "' target='_blank'>" + events[i].title + "</a>";

            var greenIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              });
              L.marker([events[i].latitude, events[i].longitude], {icon: greenIcon}).bindPopup(result).openPopup().addTo(map);

        }});

});

};

eventfulSearch();

};

});
