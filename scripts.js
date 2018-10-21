google.maps.event.addDomListener(window, "load", function () {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(55.53, 9.4),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var origin1 = 'Miami, Florida';
    var destinationA = 'Dallas, Texas';

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [origin1],
        destinations: [destinationA],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
            return;
        }
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var output = document.getElementById("output");
        output.innerHTML = "";

        for (var i = 0; i < originList.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                output.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';
            }
        }
    });
});