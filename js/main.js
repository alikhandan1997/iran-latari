function loadContest() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://iranlatari.com/api/lottery/", true);
    xhttp.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data.result[0]);
        for(i=0; i<data.result.length;i++) {
            document.getElementById("js-element").innerHTML = `
            <div class="col-lg-4 col-sm-12 col-12">
                <div class="image-box">
                    <img src="images/logo.jpg" alt="Avatar" class="image">
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
                    <div class="overlay">
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

