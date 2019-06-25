
$(document).ready(function(){
    var btn1 = document.getElementById('b1');
    btn1.addEventListener('click',testF);

    function testF(){
        var url = 'http://api.openweathermap.org/data/2.5/forecast?q=London,us&APPID=a302b19b4c3d869060bdaea73d8dbd9f';
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