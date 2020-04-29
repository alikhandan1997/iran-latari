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
    gender = document.getElementById("gender").value;
    var captcha_value = document.getElementById("captchaValue").value;

    if(gender == "") {
        gender = 0;
    }
    
    var dataObj = `{
        "name": "${name}",
        "instagram_account": "${instaId}",
        "mobile": "${phone}",
        "gender": ${gender},
        "period": ${id},
        "captcha_key": "${captcha_key}",
        "captcha_value": "${captcha_value}"
    }`;

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://iranlatari.com/api/lottery/register/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data);
        document.getElementById('name_Err').innerHTML = "";
        document.getElementById('insta_Err').innerHTML = "";
        document.getElementById('mobile_Err').innerHTML = "";
        document.getElementById('captcha_Err').innerHTML = "";
        if(data.status == 400) {
            loadContest();
            for(var i=0; i<data.messages.length; i++) {
                if(data.messages[i].field == "name"){
                    document.getElementById('name_Err').style.visibility = "visible";
                    document.getElementById('name_Err').innerHTML = data.messages[i].message;
                }
                else if(data.messages[i].field == "instagram_account"){
                    document.getElementById('insta_Err').style.visibility = "visible";
                    document.getElementById('insta_Err').innerHTML = data.messages[i].message;
                }
                else if(data.messages[i].field == "mobile"){
                    document.getElementById('mobile_Err').style.visibility = "visible";
                    document.getElementById('mobile_Err').innerHTML = data.messages[i].message;
                }
                else if(data.messages[i].field == "captcha_value"){
                    document.getElementById('captcha_Err').style.visibility = "visible";
                    document.getElementById('captcha_Err').innerHTML = data.messages[i].message;
                }
    
            }
        }

        if (data.success == true){
            document.getElementById('code').innerHTML = data.result.code;
            document.getElementById('header_title').innerHTML =" <h4>کد زیر را حتما به خاطر بسپارید</h4>";
        }
        else
        {
            document.getElementById('code').innerHTML = "خطایی رخ داده است";
            document.getElementById('header_title').innerHTML =" <h4>خطا در انجام عملیات</h4>";
            document.getElementById('code').innerHTML = "خطا در ثبت ";
        }
        if(data.status == 201) {
            document.getElementById('form').style.display = "none";
            document.getElementById('code-box').style.display = "block";
            document.getElementById('form_title').style.display = "none";
        }
    };

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(dataObj);
}