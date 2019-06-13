
var index = 0;


function changeImg() {
    var ImageName = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
    index = (index + 1) % 4;
    $('#image').attr('src',ImageName[index])
}



$(document).ready(function () {
    setInterval(changeImg,3000)
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

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // User is logged in
        if(photoURL==null)
        {
            location.href=".."
        }
        else
        {
            location.href=".."
        }
        } else {
             
        }
        });
})
