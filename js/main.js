function onLoad() {
    // statusPage();
    // loadContest();
    testContent();
    testStatus();
}

testContent = () => {
    fetch('http://iranlatari.com/api/lottery/', {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    }})
    .then(response => response.json())
    .then(data => {
        if(data.result.length == 1){
            document.getElementById("js-element").innerHTML = `
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="image-box-one" onclick="display_content()">
                <img src="${data.result[0].images.length == 1 ? 'http://iranlatari.com/media/'+ data.result[0].images[0].img : 'img/logo.jpg'}" alt="Avatar" class="image">
                    <div class="content-one">
                        <h5>${data.result[0].name}</h5>
                        <h5>مهلت ثبت نام</h5>
                        <p>${data.result[0].lottery_date}</p>
                        <h5>تاریخ قرعه کشی</h5>
                        <p>${data.result[0].registration_deadline}</p>
                        <div class="detail-one">
                            <a>جزئیات مسابقه</a>
                        </div>
                    </div>
                    <div class="overlay-one" id="overlay">
                        <div class="text-one">
                            <h4>جوایز مسابقه</h4>
                            <p>${data.result[0].awards.split('/').join('<br/>')}</p>
                            <div class="register-one">
                                <a href="register.html?${data.result[0].id}">ثبت نام</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        } else {
            for(i=0; i<data.result.length; i++) {
                var lottery_date = toFarsiNumber(data.result[i].lottery_date);
                var registration_deadline = toFarsiNumber(data.result[i].registration_deadline);
                document.getElementById("js-element").innerHTML += `
                <div class="col-lg-4 col-sm-12 col-12">
                    <div class="image-box" onclick="display_content()">
                        <img src="${data.result[i].images.length == 1 ? 'http://iranlatari.com/media/'+ data.result[i].images[0].img : 'img/logo.jpg'}" alt="Avatar" class="image">
                        <div class="content">
                            <h5>${data.result[i].name}</h5>
                            <h5>مهلت ثبت نام</h5>
                            <p>${lottery_date}</p>
                            <h5>تاریخ قرعه کشی</h5>
                            <p>${registration_deadline}</p>
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
        }
    });
}

testStatus = () => {
    fetch('http://iranlatari.com/api/lottery/status/', {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    }})
    .then(response => response.json())
    .then(data => {
        if(data.result == 'False') {
            window.open("home-page.html", "_self");
        }});
}

display_content = () => {
    setTimeout(function(){ 
        document.getElementById('overlay').style = "bottom: 100%;left: 0;right: 0;width: 100%;height:0;transition: .5s ease;";
    }, 5000);
    document.getElementById('overlay').style = " bottom: 0;height: 100%;border-radius: 10px;";
};

toFarsiNumber = (n) => {
    var farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n
        .toString()
        .replace(/\d/g, x => farsiDigits[x]);
};

// function loadContest() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "http://iranlatari.com/api/lottery/", true);
//     xhttp.onload = function() {
//         var data = JSON.parse(this.response);
//         console.log(data.result);
//         if(data.result.length == 1){
//             document.getElementById("js-element").innerHTML = `
//             <div class="col-lg-12 col-md-12 col-sm-12 col-12">
//                 <div class="image-box-one" onclick="display_content()">
//                     <img src="img/logo.jpg" alt="Avatar" class="image-one">
//                     <div class="content-one">
//                         <h5>${data.result[0].name}</h5>
//                         <h5>مهلت ثبت نام</h5>
//                         <p>${data.result[0].lottery_date}</p>
//                         <h5>تاریخ قرعه کشی</h5>
//                         <p>${data.result[0].registration_deadline}</p>
//                         <div class="detail-one">
//                             <a>جزئیات مسابقه</a>
//                         </div>
//                     </div>
//                     <div class="overlay-one" id="overlay">
//                         <div class="text-one">
//                             <h4>جوایز مسابقه</h4>
//                             <p>${data.result[0].awards.split('/').join('<br/>')}</p>
//                             <div class="register-one">
//                                 <a href="register.html?${data.result[0].id}">ثبت نام</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             `;
//         } else {
//             for(i=0; i<data.result.length; i++) {
//                 document.getElementById("js-element").innerHTML += `
//                 <div class="col-lg-4 col-sm-12 col-12">
//                     <div class="image-box" onclick="display_content()">
//                         <img src="img/logo.jpg" alt="Avatar" class="image">
//                         <div class="content">
//                             <h5>${data.result[i].name}</h5>
//                             <h5>مهلت ثبت نام</h5>
//                             <p>${data.result[i].lottery_date}</p>
//                             <h5>تاریخ قرعه کشی</h5>
//                             <p>${data.result[i].registration_deadline}</p>
//                             <div class="detail">
//                                 <a>جزئیات مسابقه</a>
//                             </div>
//                         </div>
//                         <div class="overlay" id="overlay">
//                             <div class="text">
//                                 <h4>جوایز مسابقه</h4>
//                                 <p>${data.result[i].awards.split('/').join('<br/>')}</p>
//                                 <div class="register">
//                                     <a href="register.html?${data.result[i].id}">ثبت نام</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 `;
//             }
//         }

//     };
//     xhttp.send();
// }

// function statusPage() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "http://iranlatari.com/api/lottery/status/", true);
//     xhttp.onload = function() {
//         var data = JSON.parse(this.response);
//         if(data.result == 'False') {
//             window.open("home-page.html", "_self");
//         }
//     };
//     xhttp.send();
// }