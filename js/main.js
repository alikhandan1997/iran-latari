function onLoad() {
    statusPage();
    loadContest();
}

function statusPage() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://iranlatari.com/api/lottery/status/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        if(data.result !== 'True') {
            window.open("../home-page.html", "_self");
        }
    };
    xhttp.send();
}

function loadContest() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://iranlatari.com/api/lottery/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        for(i=0; i<data.result.length;i++) {
            document.getElementById("js-element").innerHTML = `
            <div class="col-lg-4 col-sm-12 col-12">
                <div class="image-box" onclick="display_content()">
                    <img src="img/logo.jpg" alt="Avatar" class="image">
                    <div class="content">
                        <h5>${data.result[i].name}</h5>
                        <h5>مهلت ثبت نام</h5>
                        <p>${data.result[i].lottery_date}</p>
                        <h5>تاریخ قرعه کشی</h5>
                        <p>${data.result[i].registration_deadline}</p>
                        <div class="detail">
                            <a>جزئیات مسابقه</a>
                        </div>
                    </div>
                    <div class="overlay" id="overlay">
                        <div class="text">
                            <h4>جوایز مسابقه</h4>
                            <p>${data.result[i].awards.split('/').join('<br/>')}</p>
                            <div class="register">
                                <a href="register.html?${data.result[i].id}">ثبت نام</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    };
    xhttp.send();
}

var status = true;

function display_content() {
    setTimeout(function(){ 
        document.getElementById('overlay').style = "bottom: 100%;left: 0;right: 0;width: 100%;height:0;transition: .5s ease;";
        status = false;
    }, 5000);
    document.getElementById('overlay').style = " bottom: 0;height: 100%;border-radius: 10px;";
}

