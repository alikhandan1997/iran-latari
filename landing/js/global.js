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


var captchaKey;
var code ;

function loadContest() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://iranlatari.com/api/captcha/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        captchaKey = data.result.captcha_key;
        document.getElementById('captcha').src = `data:image/png;base64,${data.result.captcha_image}`;
    };
    xhttp.send();
}

function sendData() {
    var id = window.location.href.split('?')[1];
    var captcha_key = captchaKey;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var instaId = document.getElementById("instaId").value;
    var gender = document.getElementById("gender").value;
    var captcha_value = document.getElementById("captchaValue").value;

    var dataObj = `{
        "name": "${name}",
        "instagram_account": "${instaId}",
        "mobile": "${phone}",
        "gender": ${gender},
        "period": ${id},
        "captcha_key": "${captcha_key}",
        "captcha_value": "${captcha_value}"
    }`;

    console.log(dataObj);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://iranlatari.com/api/lottery/register/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        if (data.success == true)
            document.getElementById('code').innerHTML = data.result.code;
        else
        {
            document.getElementById('code').innerHTML = "خطایی رخ داده است";
            document.getElementById('header_title').innerHTML =" <h4>خطا در انجام عملیات</h4>";
            document.getElementById('code').innerHTML = "خطا در ثبت ";
        }
    };
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataObj);
    document.getElementById('form').style.display = "none";
    document.getElementById('code-box').style.display = "block";
    document.getElementById('form_title').style.display = "none";
}