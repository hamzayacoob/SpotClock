$(document).ready(function(){
    var btn = document.getElementById("target");
    var weather;

    // google api
    google.maps.event.addDomListener(btn, "click", function () {
        var origin = $("#origin");
        var dest = $("#dest");

        getWeather(dest);

        var map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(55.53, 9.4),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var origin1 = origin.val();
        var destinationA = dest.val();

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
            var output = "";

            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    output += originList[i] + ' to ' + destinationList[j] +
                        ': ' + results[j].distance.text + ' in ' +
                        results[j].duration.text + '<br>';
                }
            }

            splitString(output);
        });
    });

    function splitString (str) {
        var dayIndex = str.indexOf('day');
        var hourIndex = str.indexOf('hour');
        var minIndex = str.indexOf('min');
        var day, hour, min;

        if(dayIndex == -1) {
            day = 0;
            hour = str.substring(str.indexOf('in') + 2, str.indexOf('hours'));
            min = str.substring(str.indexOf('hours') + 5, str.indexOf('min'));
        }
        else {
            min = 0;
            day = str.substring(str.indexOf('in') + 2, str.indexOf('day'));
            hour = str.substring(str.indexOf('day') + 3, str.indexOf('hours'));
        }

        calcAlarm(parseInt(day), parseInt(hour), parseInt(min));
    }

    function calcAlarm(day, hour, min) {
        var ready = $("#ready");
        var leave = $("#leave");

        day*= 24;


        ready.val();

        var totalHours = day + hour + Math.floor(((min + parseInt(ready.val())) / 60));

        var totalMin = (min + parseInt(ready.val())) % 60;

        var tempHours = parseInt(leave.val().substring(0, leave.val().indexOf(':')));
        var tempMin = parseInt(leave.val().substring(leave.val().indexOf(':') + 1));

        var diffHours = tempHours - totalHours;
        var diffMin = tempMin - totalMin;
        

        if(diffHours < 0) {
            diffHours += 24;
        }

        if(diffMin < 0) {
            diffMin += 60;
        }

        if(diffMin < 10) {
            diffMin = '0' + diffMin;
        }

        var result = diffHours + ":" + diffMin;

        $('#output').html("Based on real time traffic results, you're scheduled time to leave is " + result + "." + weather);   
    }

    function getWeather(dest) {
        const url2 = "http://api.openweathermap.org/data/2.5/weather?q=" + dest.val() + "&APPID=30d1d6a5ff19c998845dfbcd18d1771d";

        var request = new XMLHttpRequest();
        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', url2, true);
        //request.responseType = 'json';
        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            var string = data.weather;
            weather = " In " + dest.val() + ", it is " + data.weather[0].main + " with a high of " + kToF(data.main.temp_max) + " and a low of " + kToF(data.main.temp_min) + ".";
        };
        // Send request
        request.send();
    }

    function kToF(tempInit) {
        return ( (9 / 5) * (parseInt(tempInit) - 273) ) + 32;
    }
});