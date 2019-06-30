$(document).ready(function () {
    localStorage.setItem("carRental", "no");
    localStorage.setItem("hotelStars", "5");

    var userID
    var test
    var vacationArr = [];
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#userImg').html('<img src="' + user.photoURL + '">')
            $('#topUserName').text("Hello, " + user.displayName)

            userID = user.uid
            test = firebase.database().ref().child('dates/' + user.uid);
            test.once('value').then(function (snapshot) {
                if (snapshot.val() == null) {
                    $('#noDates').text("You didnt registed dates yet!");
                    return;
                }
                $('#noDates').text(" ");
                var i = 0
                snapshot.forEach(function (childSnapshot) {
                    vacationArr[i++] = {
                        'sDate': new Date(childSnapshot.val()['sDate']),
                        'eDate': new Date(childSnapshot.val()['eDate']),
                        'hotelStars': childSnapshot.val()['hotelStars'],
                        'CityName': childSnapshot.val()['CityName'],
                        'carRental': childSnapshot.val()['carRental']
                    }
                });
                
                printArray()

            });
        } else {
            location.href = '../homepage/homepage.html'
        }
    });
    function printArray()
    {
        $("#dates").empty()
        vacationArr.sort(function(a,b){
            return a['sDate'].getTime()>b['sDate'].getTime()
        })
        
        vacationArr.forEach(function (unit) {
            $("#dates").append('<li class="list-group-item">'
                + unit['sDate'].toLocaleDateString() + " - " + unit['eDate'].toLocaleDateString() + " in  " + unit['CityName'] + ";  " + "    rent a car? - " + unit['carRental']
                + ";    Hotel stars- " + unit['hotelStars'] + '</li>');

        })
    }

    $("#logOut").click(function () {
        firebase.auth().signOut().then(function () {
            location.href = '../homepage/homepage.html'
        }).catch(function (error) { });
    });


    $("#YES").click(function () {
        localStorage.setItem("carRental", "yes"); })

    $("#1star").click(function () {
        localStorage.setItem("hotelStars", "1");
    })

    $("#2star").click(function () {
        localStorage.setItem("hotelStars", "2");
    })
    $("#3star").click(function () {
        localStorage.setItem("hotelStars", "3");
    })
    $("#4star").click(function () {
        localStorage.setItem("hotelStars", "4");
    })

    $("#saveDate").click(function () {
        $('#FaildMsg').text("")
        s = new Date($("#startDate").val())
        e = new Date($("#endDate").val())
        if (s == "Invalid Date" || e == "Invalid Date") {
            $('#FaildMsg').text("Erorr! please enter a valid date")
            return;
        }
        else {
            if (s > e) {
                $('#FaildMsg').text("Erorr! please enter a valid date")
                return;
            }
            else {
                var newDate = { 'sDate': s, 
                                'eDate': e,
                                'hotelStars': localStorage.getItem("hotelStars"),
                                'CityName':localStorage.getItem("selectedCity"),
                                'carRental':localStorage.getItem("carRental")}
                if (!checkDates(newDate)) {
                    $('#FaildMsg').text("Erorr! please enter a valid date")
                    return;
                }
                vacationArr[vacationArr.length] = newDate;
                var node = test.push();
                node.set({
                    CityName: localStorage.getItem("selectedCity"),
                    eDate: e.toLocaleDateString(),
                    sDate: s.toLocaleDateString(),
                    carRental: localStorage.getItem("carRental"),
                    hotelStars: localStorage.getItem("hotelStars")

                });
                printArray()
            }
        }
    }
    );

    function checkDates(newDate) {
        if(vacationArr.length==0) return true;
        for (var i = 0; i < vacationArr.length; i++) {
            if(i==0){
                if(newDate['eDate']<vacationArr[i]['sDate']) return true;
            }
            if (i + 1 == vacationArr.length) {
                
                if (vacationArr[i]['eDate'] < newDate['sDate']) return true;
            }
            else {
                if (newDate['sDate'] > vacationArr[i]['eDate']&& newDate['eDate'] < vacationArr[i + 1]['sDate'])
                    return true;
            }

        }
        return false;
    }
})
