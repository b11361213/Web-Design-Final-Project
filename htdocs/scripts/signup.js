// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function signup() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var passwd = document.getElementById('passwd').value;
    var passwdchk = document.getElementById('passwdchk').value;
    var birthday = document.getElementById('birthday').value;

    var AlertTitle = [
        '⚠️ Username cannot be null',
        '⚠️ Email cannot be null',
        '⚠️ Password cannot be null',
        '⚠️ Birthday cannot be null',
        '⚠️ Invalid email format',
        '⚠️ Password do not match',
        '⚠️ Invalid date format'];
    var AlertContent = [
        'Please fill out the field.', '', '',
        'This is not a valid email format, Please try again.',
        'Please make sure your passwords match',
        'This is not a valid date format, Please try again.'];

    if (username == '' || email == '' || passwd == '' || passwdchk == '' || birthday == '') {
        if (birthday == '') { $('#AlertLabelTitle').text(AlertTitle[3]); }
        if (passwd == '' || passwdchk == '') { $('#AlertLabelTitle').text(AlertTitle[2]); }
        if (email == '') { $('#AlertLabelTitle').text(AlertTitle[1]); }
        if (username == '') { $('#AlertLabelTitle').text(AlertTitle[0]); }
        $('#AlertLabelContent').text(AlertContent[0]);
        $('#AlertLabel').modal('toggle');
    }
    else if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null) {
        $('#AlertLabelTitle').text(AlertTitle[3]);
        $('#AlertLabelContent').text(AlertContent[3]);
        $('#AlertLabel').modal('toggle');
    }
    else if (passwd != passwdchk) {
        $('#AlertLabelTitle').text(AlertTitle[4]);
        $('#AlertLabelContent').text(AlertContent[4]);
        $('#AlertLabel').modal('toggle');
    }
    else if (birthday.match(/(^2\d{3})\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01]$)|(^2\d{3})\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]$)/) == null) {
        $('#AlertLabelTitle').text(AlertTitle[5]);
        $('#AlertLabelContent').text(AlertContent[5]);
        $('#AlertLabel').modal('toggle');
    }
    else {
        let signupFlag = true;
    }
    if (signupFlag == true) {
        firebase.auth().createUserWithEmailAndPassword(email, passwd)
            .then((userCredential) => {
                import firebase from "firebase/app";
                import "firebase/firestore";

                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);

                // Initialize Cloud Firestore and get a reference to the service
                const db = firebase.firestore();
                var ref = db.collection('profiles').doc('profiles');

                let date = new Date();
                let now = date.getTime();
                ref.set({
                    birthday: '',
                    createdate: now,
                    email: '',
                    uid: '',
                    username: ''
                }).then(() => {
                    console.log('set data successful');
                });

                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode == 'auth/email-already-in-use') {
                    $('#AlertLabelTitle').text('⚠️ The password is too weak');
                    $('#AlertLabelContent').text(errorMessage);
                    $('#AlertLabel').modal('toggle');
                }
                else if (errorCode == 'auth/invalid-email') {
                    $('#AlertLabelTitle').text('⚠️ The email address is not valid');
                    $('#AlertLabelContent').text(errorMessage);
                    $('#AlertLabel').modal('toggle');
                }
                else if (errorCode == 'auth/operation-not-allowed') {
                    $('#AlertLabelTitle').text('⚠️ ' + errorCode);
                    $('#AlertLabelContent').text(errorMessage);
                    $('#AlertLabel').modal('toggle');
                }
                else if (errorCode == 'auth/weak-password') {
                    $('#AlertLabelTitle').text('⚠️ The password is too weak');
                    $('#AlertLabelContent').text(errorMessage);
                    $('#AlertLabel').modal('toggle');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    }
}