var frm;

window.addEventListener("DOMContentLoaded", function () { init() });

var init = function () {

    frm = document.getElementsByTagName("form")[0];
    frm.btn = document.getElementById('submitButton');
    frm.vn = document.getElementById('voornaam');
    frm.fn = document.getElementById('familienaam');
    frm.em = document.getElementById('email');

    var arrElements = new Array(frm.vn, frm.fn, frm.em);
    for (var element in arrElements) {
        arrElements[element].addEventListener("focus", function() { showFocus(element) });
    }

    frm.btn.addEventListener("click", function (event) { return validate(event) });//VERGEET DE RETURN NIET -> submit werking
    //action stub (= geen werkelijke verzending, wel een bevestiging):
    frm.action = "javascript:alert('verzonden');window.location = this.location";
};

var validate = function (event) {
    if (event.preventDefault) { event.preventDefault() } else { event.returnValue = false; }

    //validaties
    var arrElements = new Array(frm.vn, frm.fn, frm.em);
    for (var element in arrElements) {
        arrElements[element].valid = isRequiredField(arrElements[element]);
    }

    if (frm.vn.valid && frm.fn.valid && frm.em.valid) { frm.submit(); }
};

var showFocus = function (element) {
    element.className = 'focused';
};

var isRequiredField = function (element) {
    if (element) {
        if (element.value != '') {
            element.className = 'valid';
            return true;
        } else {
            element.className = 'error';
            return false;
        }
    }
};