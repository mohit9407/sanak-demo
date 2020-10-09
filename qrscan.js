const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");

let scanning = false;

qrcode.callback = (res) => {
    if (res) {
      //for the output
      //outputData.innerText = res;
  
      qrResult.hidden = false;
    }
};

navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then(function(stream) {
    scanning = true;
    qrResult.hidden = false;
    canvasElement.hidden = false;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.srcObject = stream;
    video.play();
    tick();
    scan();
  });

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
      qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
}
