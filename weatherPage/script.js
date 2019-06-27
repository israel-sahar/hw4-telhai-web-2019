
$(document).ready(function(){
    var userPhoto;
    var username;
    var dataWriter
    firebase.auth().onAuthStateChanged(function (user) {
            userPhoto = user.photoURL;
            username = user.displayName;
            console.log(username);
            dataWriter= document.getElementById("userName");
            dataWriter.innerHTML = username;
    });
    var btn1 = document.getElementById('b1');
    var cityName = document.getElementById('cityName');
    btn1.addEventListener('click',testF);
    btn1.addEventListener('click',storeCity);
     

    function testF(){
        if(cityName.value =="")
        console.log("empty");
        else{
        var url = 'http://api.openweathermap.org/data/2.5/forecast?q='+cityName.value+'&units=metric&APPID=a302b19b4c3d869060bdaea73d8dbd9f';
        console.log(url);
        requestAJAX(url,function(data)
        {            
            console.log(data);

            //write dates
            dataWriter = document.getElementById("date1");
            dataWriter.innerHTML ='Date: '+data.list[0].dt_txt;
            dataWriter = document.getElementById("date2");
            dataWriter.innerHTML = 'Date: '+data.list[8].dt_txt;
            dataWriter = document.getElementById("date3");
            dataWriter.innerHTML = 'Date: '+data.list[16].dt_txt;
            dataWriter = document.getElementById("date4");
            dataWriter.innerHTML = 'Date: '+data.list[24].dt_txt;
            dataWriter = document.getElementById("date5");
            dataWriter.innerHTML = 'Date: '+data.list[32].dt_txt;

            //write weather
            var imgPath = data.list[0].weather[0].icon+".png";
            dataWriter = document.getElementById("weather1");
            dataWriter.innerHTML = 'Weather : '+data.list[0].weather[0].description+'<img src='+imgPath+'>';
            imgPath = data.list[8].weather[0].icon+".png";
            dataWriter = document.getElementById("weather2");
            dataWriter.innerHTML = 'Weather : '+data.list[8].weather[0].description+'<img src='+imgPath+'>';
            imgPath = data.list[16].weather[0].icon+".png";
            dataWriter = document.getElementById("weather3");
            dataWriter.innerHTML = 'Weather : '+data.list[16].weather[0].description+'<img src='+imgPath+'>';
            imgPath = data.list[24].weather[0].icon+".png";
            dataWriter = document.getElementById("weather4");
            dataWriter.innerHTML = 'Weather : '+data.list[24].weather[0].description+'<img src='+imgPath+'>';
            imgPath = data.list[32].weather[0].icon+".png";
            dataWriter = document.getElementById("weather5");
            dataWriter.innerHTML = 'Weather : '+data.list[32].weather[0].description+'<img src='+imgPath+'>';

            //write temperature
            dataWriter = document.getElementById("temper1");
            dataWriter.innerHTML = 'Temperature: '+data.list[0].main.temp;
            dataWriter = document.getElementById("temper2");
            dataWriter.innerHTML = 'Temperature: '+data.list[8].main.temp;
            dataWriter = document.getElementById("temper3");
            dataWriter.innerHTML = 'Temperature: '+data.list[16].main.temp;
            dataWriter = document.getElementById("temper4");
            dataWriter.innerHTML = 'Temperature: '+data.list[24].main.temp;
            dataWriter = document.getElementById("temper5");
            dataWriter.innerHTML = 'Temperature: '+data.list[32].main.temp;
        });
        }
    }

    function requestAJAX(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status == 200)
            callback(JSON.parse(xhr.responseText));
        }

        xhr.open('GET',url,true);
        xhr.send();
    }

    function storeCity(){
        localStorage.setItem('selectedCity', cityName.value);
    }

});