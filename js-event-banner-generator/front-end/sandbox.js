const form = document.querySelector('.banner-form');

// let bannerList = [];
// let count = 0;

form.addEventListener('submit', e => {
    
    e.preventDefault();
    
    let url = form.eventLinkInput.value;
    let api_url = 'http://localhost:3000/event/?url=' + url;
    
    fetch(api_url)
    .then(res => res.text())
    .then(body => {

        let data = JSON.parse(body);
        
        document.getElementById("eventTitle").innerText = data.title;
        document.getElementById("time").innerText = "Start Date: " + data.start_date + " — Start Time: " + data.start_time;
        
        document.getElementById('qrcode').innerHTML = '';
        let qrcode = new QRCode(document.getElementById('qrcode'),{width: 128, height: 128});
        qrcode.makeCode(url);
    });

})