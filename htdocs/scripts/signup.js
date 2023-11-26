const flag = {
    signupFlag: false
};

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
        flag.signupFlag = true;
    }
        
}