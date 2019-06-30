$(document).ready(function(){
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
                    $('#titled').html('Your list is empty.');
                }      
                var i=0          
                snapshot.forEach(function(childSnapshot) {
                    
                    vacationArr[i++]={'cityname':childSnapshot.val()['CityName'],
                                      'sDate':childSnapshot.val()['sDate'],
                                      'eDate':childSnapshot.val()['eDate']}
                 });
                 console.log(vacationArr);});
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


   
   
   
   
   
   
         /*datesRef.on('value', function(data){
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
    });*/
              
    $("#saveDate").click(function(){
        $('#FaildMsg').text("")
        s=new Date($("#startDate").val())
        e=new Date($("#endDate").val())
        if(s=="Invalid Date"||e=="Invalid Date"){
            $('#FaildMsg').text("שגיאה, יש להזין תאריכים תקינים")
            return;
        }
        else{
            if(s>e){
                $('#FaildMsg').text("לא נראה לי, יש להזין תאריכים תקינים")
                return;  
            }
            else{
                var node = test.push();
                node.set({
                CityName: localStorage.getItem("selectedCity"),
                eDate: e.toLocaleDateString(),
                sDate: s.toLocaleDateString()});

                //check if overlaps
        /*datesRef.child(userP).push().set({
            startDate: sDate,
            endDate: eDate,
            cityName: localStorage.getItem("selectedCity"),
            //howManyHotelStars: 5
        });*/
            }
                    
        }
    });
})


        /*dates.push(sDate);
        dates.push(eDate);
        
        dates = dates.sort();
        let sIndex = dates.indexOf(sDate);
        let eIndex = dates.indexOf(eDate);
        if(sIndex != eIndex - 1){
            alert("nine!! nine nine nine!!");
            return;
        }*/