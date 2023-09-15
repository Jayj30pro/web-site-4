

let home = document.getElementById("nav-home");
let about = document.getElementById("nav-about");
let skills = document.getElementById("nav-skills");
let certificates = document.getElementById("nav-certificates");
let projects = document.getElementById("nav-projects");
let blog = document.getElementById("nav-blog");
let contact = document.getElementById("nav-contact");


function iconSwap(small) {
    if (small.matches) {
        home.innerHTML = "&#127968;";
        about.innerHTML = "&#128203;";
        skills.innerHTML = "&#127891;";
        certificates.innerHTML = "&#127894;";
        projects.innerHTML = "&#128736;";
        blog.innerHTML = "&#128220;";
        contact.innerHTML = "&#128222;";
        
    }
    else {
        home.innerHTML = " Home &#127968; ";
        about.innerHTML = " About &#128203; ";
        skills.innerHTML = " Skills &#127891; ";
        certificates.innerHTML = " Certificates &#127894; ";
        projects.innerHTML = " Projects &#128736; ";
        blog.innerHTML = " Blog &#128220; ";
        contact.innerHTML = " Contact &#128222; ";
    }
}

let shrink = window.matchMedia("(max-width: 1000px)");
iconSwap(shrink);
shrink.addListener(iconSwap);

let webPlace = 0;

let webPics = [
    "Icons/web-dev-trio.png",
    "Certs/javascript-free-code-camp.png",
    "Certs/js-game-cert.jpg",
    "Certs/js-cert.png",
    "Certs/responsive-web-design.png",
    "Certs/responsive-web-cert.jpg",
    "Certs/web-dev-fundamentals.jpg",
    "Certs/css-cert.jpg",
    "Certs/html-cert.jpg"
];

let webText = [
    " Web Development ",
    " JavaScript Algorithms",
    " JavaScript Games",
    " JavaScript ",
    " Responsive web (Free Code Camp) ",
    " Responsive web (SoloLearn) ",
    " Web Fundamentals",
    " CSS ",
    " HTML "
];


function nextWeb() {
    let webCert = document.getElementById("web-dev");
    webPlace++;
    if (webPlace >= webPics.length) {
        webPlace = 0;
    }
    webCert.src = webPics[webPlace];

}

function prevWeb() {
    let webCert = document.getElementById("web-dev");
    webPlace--;
    if (webPlace < 0) {
        webPlace = webPics.length -1;
    }
    webCert.src = webPics[webPlace];

}
function currentWeb() {
    let webCap = document.getElementById("web-dev-title");
    webCap.innerHTML = webText[webPlace];
}


let pyPlace = 0;

let pyPics = [
    "Icons/python3.png",
    "Certs/py-data-sci-beg-cert.png",
    "Certs/py-data-cert.png",
    "Certs/py-finance-cert.jpg",
    "Certs/python-cert.png",
    "Certs/py-int-cert.png",
    "Certs/py-begin-cert.png"
];

let pyText = [
    " Python ",
    " Python Data Science ",
    " Python Data Structures",
    " Python Finance ",
    " Python Core ",
    " Intermedaite Python ",
    " Beginner Python "
];

function nextPy() {
    let pyCert = document.getElementById("python");
    pyPlace++;
    if (pyPlace >= pyPics.length) {
        pyPlace = 0;
    }
    pyCert.src = pyPics[pyPlace];

}

function prevPy() {
    let pyCert = document.getElementById("python");
    pyPlace--;
    if (pyPlace < 0) {
        pyPlace = pyPics.length -1;
    }
    pyCert.src = pyPics[pyPlace];

}
function currentPy() {
    let pyCap = document.getElementById("python-title");
    pyCap.innerHTML = pyText[pyPlace];
}

let miscPlace = 0;

let miscPics = [
    "Icons/languages.png",
    "Certs/java-cert.png",
    "Certs/marketers-coding-cert.jpg",
    "Certs/sql-cert.png"


];

let miscText = [
    " Programming Languages ",
    " Java ",
    " Marketer's Coding",
    " SQL "
    

];


function nextMisc() {
    let miscCert = document.getElementById("misc");
    miscPlace++;
    if (miscPlace >= miscPics.length) {
        miscPlace = 0;
    }
    miscCert.src = miscPics[miscPlace];

}

function prevMisc() {
    let miscCert = document.getElementById("misc");
    miscPlace--;
    if (miscPlace < 0) {
        miscPlace = miscPics.length -1;
    }
    miscCert.src = miscPics[miscPlace];

}
function currentMisc() {
    let miscCap = document.getElementById("misc-title");
    miscCap.innerHTML = miscText[miscPlace];
}









