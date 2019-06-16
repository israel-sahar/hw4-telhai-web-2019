
var index = 0;
function changeImg() {
    var ImageName = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
    index = (index + 1) % 4;
    $('#image').attr('src', ImageName[index])
}

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // User is logged in
            if (photoURL == null) {
                $('#shalomMsg').html("<b>" + user.email + "</b>" + "  ,שלום")
                $('#LogInDiv').hide()
                $('#choosePic').show()
            }
            else {
                location.href = "../nextLevel"
            }
        } else {
            $('#LogInDiv').show()
        }
    });
    $('#main_div').show()

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
                        location.href='../next'
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
    setInterval(changeImg, 3000)
    $('#loginButton').click(function () {
        $('#LogMsg').text('')
        loginRegistertosite("login")

    })

    $('#SignUpButton').click(function () {
        $('#LogMsg').text('')
        loginRegistertosite("register")

    })



    function loginRegistertosite(state) {

        if (state == "login") {
            firebase.auth().signInWithEmailAndPassword($('#emailInput').val(), $('#passwordInput').val()).catch(function (error) {
                var errorCode = error.code
                var errorMsg = error.message
                $('#LogMsg').text("ההתחברות נכשלה, אנא נסה שנית")

            });
        }
        else {
            firebase.auth().createUserWithEmailAndPassword($('#emailInput').val(), $('#passwordInput').val()).catch(function (error) {
                var errorCode = error.code
                var errorMsg = error.message
                $('#LogMsg').text("ההרשמה נכשלה, אנא נסה שנית")
            });
        }
    }
})


