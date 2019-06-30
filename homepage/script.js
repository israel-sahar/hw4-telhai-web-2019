
var index = 0;
function changeImg() {
    var ImageName = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
    index = (index + 1) % 4;
    $('#image').attr('src', ImageName[index])
}

$(document).ready(function () {
    setInterval(changeImg, 3000)
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is logged in
            if (user.photoURL == null) {
                $('#shalomMsg').html("<b>" + user.displayName + "</b>" + "  ,שלום")
                $('#LogInDiv').hide()
                $('#chooseSection').hide()
                $('#choosePic').show()
            }
            else {
                location.href = '../weatherPage/WeatherPage.html'
            }
        } else {
        }
    });

    $('#UploadPicBtn').click(function () {
        $('#FailMsg').text("")
        if ($('#inputFile').prop('files').length == 0 || (!$('#inputFile').prop('files')[0].name.includes("jpg") && !$('#inputFile').prop('files')[0].name.includes("jpeg"))) {
            $('#FailMsg').text("אנא בחר תמונה מסוג JPG.")
        }
        else {
            var storageRef = firebase.storage().ref();
            var name = storageRef.child("userimages/" + new Date().getTime() + ".jpg");

            $('#FailMsg').text("..אנא המתן")

            name.put($('#inputFile').prop('files')[0]).then(function (snap) {
                $('#FailMsg').text("..עוד רגע")
                name.getDownloadURL().then(function (url) {
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        photoURL: url
                    }).then(function () {
                        location.href = '../weatherPage/WeatherPage.html'
                    }).catch(function (error) {
                        // An error happened.
                    });


                }).catch(function (err) { console.log(err); });

            }).catch(function (err) { console.log(err); });
        }
    })

    $('#LogOutBtn').click(function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            location.reload();
        }, function (error) {
            // An error happened.
        });
    })

    $("#inputFile").change(function (e) {

        $(".custom-file-label").text($('#inputFile').prop('files')[0].name.slice(0, 25))
    });

    $('#loginButton').click(function () {
        if ($('#LogInDiv').css('display') == 'none') {
            $('#LogInDiv').slideToggle()
            $('.hide1').hide()
            return
        }
        $('#LogMsg').text('')
        firebase.auth().signInWithEmailAndPassword($('#emailInput').val(), $('#passwordInput').val()).catch(function (error) {
            $('#LogMsg').text("ההתחברות נכשלה, אנא נסה שנית")
            return
        });

    })

    $('#ResetButton').click(function (params) {
        if ($('#PasswordResetDiv').css('display') == 'none') {
            $('#PasswordResetDiv').slideToggle();
            $('.hide3').hide();
            $('#LogInDiv').hide()

        }
    })

    $('#SendResetBtn').click(function (params) {
        var emailAddress = $('#emailResetInput').val();
        $('#ResetMsg').text('')
        firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
            $('#ResetMsg').text("אימייל לאיפוס נשלח בהצלחה.")

        }).catch(function (error) {
            $('#ResetMsg').text("האיפוס נכשל, תבדוק את האימייל שהזנת")
            return
        });
    })

    $('#SignUpButton').click(function () {
        if ($('#SignUpDiv').css('display') == 'none') {
            $('#SignUpDiv').slideToggle()
            $('.hide2').hide()
            return
        }
        $('#SignUpMsg').text('')
        if ($('#firstNameInput').val() == '') {
            $('#SignUpMsg').text("ההרשמה נכשלה, אנא מלא שם פרטי")
            return
        }
        if ($('#familyNameInput').val() == '') {
            $('#SignUpMsg').text("ההרשמה נכשלה, אנא מלא שם משפחה")
            return
        }

        firebase.auth().createUserWithEmailAndPassword($('#emailSignUpInput').val(), $('#passwordSignUpInput').val()).then(function (params) {
            $('#SignUpDiv').slideToggle()
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: $('#firstNameInput').val() + " " + $('#familyNameInput').val()
            }).then(function () {
                $('#shalomMsg').html("<b>" + user.displayName + "</b>" + "  ,שלום")
                $('#LogInDiv').hide()
                $('#chooseSection').hide()
                $('#choosePic').show()
            }).catch(function (error) {
                // An error happened.
            });

        }).catch(function (error) {
            var errorCode = error.code
            var errorMsg = error.message
            $('#SignUpMsg').text("ההרשמה נכשלה, אנא נסה שנית")
        });


    })


})


