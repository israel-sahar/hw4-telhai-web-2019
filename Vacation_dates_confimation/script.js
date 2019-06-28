




  
var email;
var vacationArr = [];
firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              email = user.email;

              
          } else {
              location.href = "../homepage/homepage.html";
          }
      });
      

$("#signOut").click(function(){

    
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
  }).catch(function(error) {
      // An error happened.
  });
});
var dates = [];
console.log("in hehr");
$(document).ready(function(){
    console.log("in hehr");
    var datesRef = firebase.database().ref().child('dates');
    $("#saveDate").click(function(){
        console.log("the button clicked");
        
        let sDate = $("#startDate").val();
        let eDate = $("#endDate").val();
        //check if overlaps
        dates.push(sDate);
        dates.push(eDate);
        
        dates = dates.sort();
        let sIndex = dates.indexOf(sDate);
        let eIndex = dates.indexOf(eDate);
        if(sIndex != eIndex - 1){
            alert("nine!! nine nine nine!!");
            return;
        }
        datesRef.push().set({
            startDate: sDate,
            endDate: eDate,
            cityName: localStorage.getItem("selectedCity"),
            //howManyHotelStars: 5
        });
    }); 


    datesRef.on('value', function(data){
        dates = [];
        //$("#dates").empty();
        data.forEach(function(childSnapshot) {
            let childData = childSnapshot.val();
            dates.push(childData.startDate);
            dates.push(childData.endDate);

            $("#dates").append('<li class="list-group-item">' 
                + childData.startDate + ", " + childData.endDate
            + '</li>');

          });
    });



































}); 