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
        $(".audioDemo").trigger('play');
        console.log("AUDIO SHOULD PLAY!!!!!")
    }

}, 500);

