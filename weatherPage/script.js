
$(document).ready(function(){
    var btn1 = document.getElementById('b1');
    btn1.addEventListener('click',testF);

    function testF(){
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=jerusalem&APPID=2701402a9ecce075487661e2fa72c91b';
        requestAJAX(url);
    }

    function requestAJAX(url){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status == 200)
            console.log(JSON.parse(xhr.responseText));
        }
        xhr.open('GET',url,true);
        xhr.send();

    }
});