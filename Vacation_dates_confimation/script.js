$(document).ready(function(){
    localStorage.setItem("carRental","no");  //the defult
    localStorage.setItem("hotelStars","5");  //the defult
    console.log(localStorage.getItem("carRental"));
    
    var userID
    var test
    var vacationArr = [];
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            userID=user.uid
            test = firebase.database().ref().child('dates/'+user.uid);
            test.once('value').then(function(snapshot) {
                if(snapshot.val()==null)
                {
                    $('#noDates').text("You didnt registed dates yet!");
                    return;
                }  
                $('#noDates').text(" ");
                 
                var i=0        
                let howManyPrints = datesCounter; 
                snapshot.forEach(function(childSnapshot) {
                   
                    let childData = childSnapshot.val();
                    vacationArr[i++]={'cityname':childSnapshot.val()['CityName'],
                                      'sDate':childSnapshot.val()['sDate'],
                                      'eDate':childSnapshot.val()['eDate'],
                                    'carRental': childSnapshot.val()['carRental'],
                                    'hotelStars': childSnapshot.val()['hotelStars']}

                     $("#dates").append('<li class="list-group-item">' 
                   + childSnapshot.val()['sDate'] + " - " + childSnapshot.val()['eDate'] + " in  "+ childSnapshot.val()['CityName'] +";  " +"    rent a car? - "+ childSnapshot.val()['carRental'] 
                    +";    Hotel stars- "+ childSnapshot.val()['hotelStars'] + '</li>');
                     howManyPrints--;
                     if(howManyPrints==0){
                        return true; 
                     }
                     
                 });
                 
                 console.log(vacationArr);
                });
        $('#userImg').html('<img src="' + user.photoURL + '">')
        $('#topUserName').text("Hello, " + user.displayName)




        }else{
            location.href = '../homepage/homepage.html'
        }

    });
    


    $("#logOut").click(function(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            location.href = '../homepage/homepage.html'
        }).catch(function(error) {
            // An error happened.
        });
      });


   $("#YES").click(function() {
       localStorage.setItem("carRental","yes");
       console.log(localStorage.getItem("carRental"));
         
   })

$("#1star").click(function() {
    localStorage.setItem("hotelStars","1");  
})

$("#2star").click(function() {
    localStorage.setItem("hotelStars","2");  
})
$("#3star").click(function() {
    localStorage.setItem("hotelStars","3");  
})
$("#4star").click(function() {
    localStorage.setItem("hotelStars","4");  
})



   
  
      var datesCounter=0;       //for showing the correct amount of dates in the list

    $("#saveDate").click(function(){
        $('#FaildMsg').text("")
        s=new Date($("#startDate").val())
        e=new Date($("#endDate").val())
        if(s=="Invalid Date"||e=="Invalid Date"){
            $('#FaildMsg').text("Erorr! please enter a valid date")
            return;
        }
        else{
            if(s>e){
                $('#FaildMsg').text("Erorr! please enter a valid date")
                return;  
            }
            else{
               
                var node = test.push();
                datesCounter++;
                node.set({
                CityName: localStorage.getItem("selectedCity"),
                eDate: e.toLocaleDateString(),
                sDate: s.toLocaleDateString(),
                carRental: localStorage.getItem("carRental"),
                hotelStars: localStorage.getItem("hotelStars")

            });
               

            }
                    
        }
    });
})
