if (document.URL.includes("index")) {
    let images = ["AddFiles.svg", "FilingSystem.svg", "FileSearching.svg", "ImageUpload.svg"];
    document.getElementById("changeImage").src = "img/" + images[Math.round(Math.random() * (images.length - 1))];

    // let searchButton = document.getElementById("searchButton");
    // if (window.screen.width <= 1150) {
    //     searchButton.href = "search.html";
    // } else {
    //     searchButton.href = "shoplist.html";
    // }
} else if (document.URL.includes("fileupload")) {
    var dropArea = document.getElementById('drop-area');
    var files = 0;
    dropArea.addEventListener("dragover", event => {
        event.preventDefault();
    });
    
    dropArea.addEventListener("drop", event => {
        let dt = event.dataTransfer.files;
        dropArea.style.display = "none";
        for (let i = 0; i < dt.length; i++) {
            addRow(dt[i]);
        }
        dropArea.firstElementChild.value = "";
        event.preventDefault();
    });
    
    dropArea.firstElementChild.addEventListener("change", () => {
        let file = dropArea.firstElementChild.files;
        dropArea.style.display = "none";
        for (let i = 0; i < file.length; i++) {
            addRow(file[i]);
        }
        dropArea.firstElementChild.value = "";
    });
} else if (document.URL.includes("checkout")) {
    let showCouponButton = document.getElementById("showCouponButton");
    showCouponButton.addEventListener("click", event => {
        if (window.screen.width <= 600) {
            event.preventDefault();
            window.location.href = "coupon.html";
        }
    })
}

let isShown = false
function showHeaderDropDown(self) {
    if (!isShown) {
        self.firstElementChild.src = "img/AvatarBlue.svg";
        self.firstElementChild.nextElementSibling.style.color = "#2F80ED";
        self.lastElementChild.src = "img/ArrowUpBlue.svg";
        document.getElementById("dropdown").style.display = "block";
    } else {
        self.firstElementChild.src = "img/AvatarGrey.svg";
        self.firstElementChild.nextElementSibling.style.color = "#6D7D8B";
        self.lastElementChild.src = "img/ArrowDownGrey.svg";
        document.getElementById("dropdown").style.display = "none";
    }
    isShown = !isShown;
}

function addRow(file) {
    files++;

    const tableDiv = document.getElementById("tableDiv");
    tableDiv.style.display = "block";

    const table = document.getElementById("table");

    const tableRow = document.createElement("div");
    tableRow.className = "same-row table-row";

    const fileName = document.createElement("p");
    fileName.textContent = file.name;

    const status = document.createElement("div");
    const progressBarDiv = document.createElement("div");
    const progressBar = document.createElement("span");
    progressBarDiv.className = "meter";
    progressBar.style.width = "0%";

    status.appendChild(progressBarDiv);
    progressBarDiv.appendChild(progressBar);
    loadProgressBar(progressBarDiv);

    const fileSizeP = document.createElement("p");
    let fileSize = 0;
    if (file.size / 1024 > 1000) {
        fileSize = (file.size / 1024 / 1024).toFixed(2) + "MB";
    } else {
        fileSize = (file.size / 1024).toFixed(2) + "KB";
    }
    fileSizeP.textContent = fileSize;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<img src="img/Delete.svg">`;
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement.outerHTML = "";    
        if (--files <= 0) {
            dropArea.style.display = "block";
            tableDiv.style.display = "none";
        }
    });

    tableRow.appendChild(fileName);
    tableRow.appendChild(status);
    tableRow.appendChild(fileSizeP);
    tableRow.appendChild(deleteButton);

    table.appendChild(tableRow);
}

function openFileDialog(self) {
    self.previousElementSibling.click();
}

function loadProgressBar(progressBarDiv) {
    let load = 0;
    const interval = setInterval(() => {
        if (load < 100) {
            progressBarDiv.firstElementChild.style.width = ++load + "%";
        } else {
            progressBarDiv.className = "same-row";
            progressBarDiv.innerHTML = `
                                <img src="img/CheckCircle.svg">
                                <p>Uploaded successfully</p>
                                `;
            clearInterval(interval);
        }
    }, 50);
}

function minus(self) {
    let currentNumber = parseInt(self.nextElementSibling.textContent);
    if (isNaN(currentNumber) || currentNumber <= 0) {
        currentNumber = 1;
    }
    self.nextElementSibling.textContent = --currentNumber;
}

function add(self) {
    let currentNumber = parseInt(self.previousElementSibling.textContent);
    if (isNaN(currentNumber)) {
        currentNumber = 1;
    }
    self.previousElementSibling.textContent = ++currentNumber;
}

// function showCoupon() {
//     document.getElementById("coupon").style.display = "block";
//     document.body.style.overflowY = "hidden";
//     document.documentElement.scrollTop = 0;
// }

function hideOverlay(self) {
    document.body.style.position = "static";
    self.parentElement.parentElement.style.display = "none";
    document.body.style.overflowY = "auto";
    scrollable = true;
}

function showLogin() {
    const user = document.getElementById("user");
    user.style.display = "block";
    user.innerHTML = `<div class="popout-item" style="flex-direction: row; min-height: 524px;">
                        <a class="close-button" style="display: block; cursor: pointer;" onclick="hideOverlay(this)"><img src="img/close.svg"></a>
                        <div class="img">
                            <img src="img/videoupload.svg">
                        </div>
                        <div class="form">
                            <h1 class="blue">Login</h1>
                            <div class="input-image margin-top-30">
                                <img src="img/Identity.svg">
                                <input type="text" placeholder="Email / Mobile Number">
                            </div>
                            <div class="input-image">
                                <img src="img/Lock.svg">
                                <input type="text" placeholder="Password">
                            </div>
                            <a href="#" class="margin-top-15" style="display: block;"><u>Don't remember your password?</u></a>
                            <input type="submit" class="main-button" value="Login">
                            <p class="margin-top-15">Don't have an account? <a style="cursor: pointer;" class="blue" onclick="showSignUp()">Sign Up</a></p>
                            <div class="same-row margin-top-10">
                                <a href="#"><img src="img/Twitter.svg"></a>
                                <a href="#"><img src="img/Facebook.svg"></a>
                                <a href="#"><img src="img/Google.svg"></a>
                            </div>
                        </div>
                    </div>`
}

function showSignUp() {
    const user = document.getElementById("user");
    user.style.display = "block";
    user.innerHTML = `<div class="popout-item" style="flex-direction: row; min-height: 524px;">
                        <a class="close-button" style="display: block; cursor: pointer;" onclick="hideOverlay(this)"><img src="img/close.svg"></a>
                        <div class="img">
                            <img src="img/videoupload.svg">
                        </div>
                        <div class="form">
                            <h1 class="blue signup-h1">Sign Up</h1>
                            <div class="input-image">
                                <img src="img/Identity.svg">
                                <input type="text" placeholder="Name">
                            </div>
                            <div class="input-image">
                                <img src="img/email-black-18dp 1.svg">
                                <input type="text" placeholder="Email">
                            </div>
                            <div class="input-image">
                                <img src="img/Phone.svg">
                                <input type="text" placeholder="Phone Number">
                            </div>
                            <div class="input-image">
                                <img src="img/Lock.svg">
                                <input type="text" placeholder="Password">
                            </div>
                            <label class="label-inline margin-top-15">
                                <input type="checkbox">
                                <span class="checkbox"></span>
                                <span>I agree to the Terms of serivce</span>
                            </label>
                            <input type="submit" class="main-button" value="Continue" onclick="showVerification()">
                            <p class="margin-top-10">Already registered? <a class="blue" style="cursor: pointer;" onclick="showLogin()">Sign In</a></p>
                            <div class="same-row margin-top-10">
                                <a href="#"><img src="img/Twitter.svg"></a>
                                <a href="#"><img src="img/Facebook.svg"></a>
                                <a href="#"><img src="img/Google.svg"></a>
                            </div>
                        </div>
                    </div>`
}

function showVerification() {
    const user = document.getElementById("user");
    user.style.display = "block";
    user.innerHTML = `<div class="popout-item" style="flex-direction: row; min-height: 524px;">
                        <a class="close-button" style="display: block; cursor: pointer;" onclick="hideOverlay(this)"><img src="img/close.svg"></a>
                        <div class="img">
                            <img src="img/videoupload.svg">
                        </div>
                        <div class="form">
                            <h1 class="blue signup-h1">Verification</h1>
                            <p>Please enter the verification code sent to your mobile number</p>
                            <div class="input-image">
                                <img src="img/Lock.svg">
                                <input type="text" placeholder="Password">
                            </div>
                            <input type="submit" class="main-button" value="Continue" onclick="showVerification()">
                        </div>
                    </div>`
}

function showVerificationMobile() {
    window.location.href = "verification.html";
}

function showPriceList() {
    document.body.style.overflowY = "hidden";
    const priceList = document.getElementById("priceList");
    priceList.style.display = "block";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
}

function showInfo(info) {
    const accountInfo = document.getElementById("accountInfo");
    accountInfo.style.display = "block";
    accountInfo.querySelector("h1").textContent = `Change ${info}`;
    
    const x = accountInfo.querySelectorAll("input");
    for (let i = 0; i < x.length-2; i++) {
        const element = x[i];
        element.value = "";
        if (i == 0) {
            element.placeholder = `New ${info}`;
        } else {
            element.placeholder = `Confirm New ${info}`;
        }

        switch (info) {
            case "Username":
                element.type = "text";
                break;
            case "Email Address":
                element.type = "email";
                break;
            case "Phone Number":
                element.type = "tel";
                break;
            case "Password":
                element.type = "password";
                break;
        }
    }
}

function keyCoupon(couponCode) {
    document.getElementById("couponTextBox").value = couponCode.textContent;
}
