let board = document.getElementById("board");
let color = document.getElementById("color");
let size = document.getElementById("size");
let save = document.getElementById("save");
let line = document.getElementById("line");
let circle = document.getElementById("circle");
let rectangle = document.getElementById("rectangle");
let context = board.getContext("2d");
let isLine = false;
let finalOffsetX = 0;
let finalOffsetY = 0;

// Set canvas width and height on window load
window.addEventListener("load", () => {
    board.width = board.offsetWidth;
    board.height = board.offsetHeight;
});

board.addEventListener("mousedown", function(event) {
    isLine = true;
    finalOffsetX = event.offsetX;
    finalOffsetY = event.offsetY;
    // console.log(event)
});

board.addEventListener("mousemove", function(event) {
    if (isLine) {
        if (line.checked) {
            context.beginPath();
            context.moveTo(finalOffsetX, finalOffsetY);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            finalOffsetX = event.offsetX;
            finalOffsetY = event.offsetY;
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
        } else if (rectangle.checked) {
            // clearBoard()
            context.beginPath();
            context.rect(
                finalOffsetX,
                finalOffsetY,
                event.offsetX - finalOffsetX,
                event.offsetY - finalOffsetY
            );
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
            context.stroke();
        } else if (circle.checked) {
            // clearBoard()
            context.beginPath();
            let radius = Math.sqrt(
                Math.pow(event.offsetX - finalOffsetX, 2) +
                Math.pow(event.offsetY - finalOffsetY, 2)
            );
            context.arc(finalOffsetX, finalOffsetY, radius, 0, 2 * Math.PI);
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
            context.stroke();
        }
    }
});

board.addEventListener("mouseup", function() {
    isLine = false;
});

function clearBoard() {
    context.clearRect(0, 0, board.width, board.height);
}

board.addEventListener("touchstart", function(event) {
    event.preventDefault();
    isLine = true;
    let coordinates = getCoordinates(event.touches[0]);
    finalOffsetX = coordinates.x;
    finalOffsetY = coordinates.y;
});

board.addEventListener("touchmove", function(event) {
    event.preventDefault();
});

board.addEventListener("touchend", function() {
    isLine = false;
});

//get by youtube help

function getCoordinates(touch) {
    let rect = board.getBoundingClientRect();
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
    };
}

// save button

save.addEventListener("click", () => {
    let link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = board.toDataURL();
    link.click();
});