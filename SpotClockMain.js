setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var min = date.getMinutes();
    if(hours > 12){
        hours = hours - 12
    }
    if(hours == 0){
        hours = 12
    }
    if(min < 10){
        min = "0" + min;
    }
    var cuttime =  hours + ":" + min ;
    $('#clock-wrapper').html(cuttime);

    $(".btntosetalrm").click(function(){
        var alRmTime = $(".getalarmtime").val();
        if(alRmTime){
            $('.aumkar').html(alRmTime);
            $(".alrm-main").css("display","none");
            $(".when-alrm-ring").css("display","block");
        }

        else{
            return false;
        }
    });
    var awesome = $(".aumkar").html();

    if(awesome === cuttime){
        var normal = new Audio('resources/Normal Alarm Sound.mp3');

        if(checker == 0){
            normal.pause();
            var normal = new Audio('resources/Normal Alarm Sound.mp3');
            normal.play()
        }
        else if(checker == 1){
            normal.pause();
            var normal = new Audio('resources/Tropical Alarm Sound.mp3');
            normal.play()
        }
        else{
            normal.pause();
            var normal = new Audio('resources/Beep.mp3');
            normal.play()
        }

        console.log("AUDIO SHOULD PLAY!!!!!")
    }

}, 500);

$('#song-selector ul li').on('click', function(){
    var selectedsong = $(this).text();
    console.log(selectedsong);
    if(selectedsong == "Normal Alarm Sound"){
        checker = 0;
    }
    if(selectedsong == "Tropical Alarm Sound"){
        checker = 1;
    }
    if(selectedsong == "Beep"){
        checker = 2;
    }
    var songselectedelem = document.getElementById("selected-song");
    songselectedelem.innerHTML = "Selected Song is "  + selectedsong;
});

const url = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={30d1d6a5ff19c998845dfbcd18d1771d}";
/**
$(".btn").click(function(){
    $.get(url, function(data, status){
        console.log(`${data}`);
    });
});
 **/

var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', url, true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    alert(data);
}

// Send request
request.send();




