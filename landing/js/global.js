(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);

function loadContest() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://iranlatari.com/api/captcha/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        document.getElementById('captcha').src = `data:image/png;base64,${data.result.captcha_image}`;
    };
    xhttp.send();
}

function sendData() {
    var id = window.location.href.split('?')[1];
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var instaId = document.getElementById("instaId").value;
    var gender = document.getElementById("gender").value;
    var captchaValue = document.getElementById("captchaValue").value;

    var dataObj = {
        name: name,
        instagram_account: instaId,
        mobile: phone,
        gender: gender,
        period: id,
        code: captchaValue
    };
    console.log(dataObj);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://iranlatari.com/api/lottery/register/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
    };
    xhttp.send(dataObj);
}