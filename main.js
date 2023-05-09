let board = document.getElementById("board");
let color = document.getElementById("color");
let size = document.getElementById("size");
let context = board.getContext("2d");
let isLine = false;
let finalOffsetX = 0;
let finalOffsetY = 0;

board.addEventListener("mousedown", function(event) {
    isLine = true;
    finalOffsetX = event.offsetX;
    finalOffsetY = event.offsetY;
});

board.addEventListener("mousemove", function(event) {
    if (isLine) {
        context.beginPath();
        context.moveTo(finalOffsetX, finalOffsetY);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        finalOffsetX = event.offsetX;
        finalOffsetY = event.offsetY;
        context.strokeStyle = color.value;
        context.lineWidth = size.value;
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
    if (isLine) {
        let coordinates = getCoordinates(event.touches[0]);
        context.beginPath();
        context.moveTo(finalOffsetX, finalOffsetY);
        context.lineTo(coordinates.x, coordinates.y);
        context.stroke();
        finalOffsetX = coordinates.x;
        finalOffsetY = coordinates.y;
        context.strokeStyle = color.value;
        context.lineWidth = size.value;
    }
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