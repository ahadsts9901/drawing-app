let board = document.getElementById("board");
let fill = document.getElementById("shape-fill-check");
let shapeFill = document.getElementById("shape-fill");
let color = document.getElementById("color");
let size = document.getElementById("size");
let save = document.getElementById("save");
let brush = document.getElementById("brush");
let line = document.getElementById("line");
let circle = document.getElementById("circle");
let rectangle = document.getElementById("rectangle");
let eraser = document.getElementById('eraser');
let eraserSize = document.getElementById('eraser-size');
let context = board.getContext("2d");
let isLine = false;
let finalOffsetX = 0;
let finalOffsetY = 0;
brush.checked = true;

// Set canvas width and height on window load
window.addEventListener("load", () => {
    board.width = board.offsetWidth;
    board.height = board.offsetHeight;
});

board.addEventListener("mousedown", function (event) {
    isLine = true;
    finalOffsetX = event.offsetX;
    finalOffsetY = event.offsetY;
    // console.log(event)
});

board.addEventListener("mousemove", function (event) {
    if (isLine) {
        if (eraser.checked) {
            context.beginPath();
            context.moveTo(finalOffsetX, finalOffsetY);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            finalOffsetX = event.offsetX;
            finalOffsetY = event.offsetY;
            context.strokeStyle = "#fff";
            context.lineWidth = eraserSize.value;
            if (fill.checked) {
                context.strokeStyle = shapeFill.value;
            }
        }
        else if (brush.checked) {
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
            context.strokeRect(
                finalOffsetX,
                finalOffsetY,
                event.offsetX - finalOffsetX,
                event.offsetY - finalOffsetY
            );
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
            context.stroke();
            context.fillRect(
                finalOffsetX,
                finalOffsetY,
                event.offsetX - finalOffsetX,
                event.offsetY - finalOffsetY
            );
            context.fillStyle = "#fff";
            if (fill.checked) {
                context.fillStyle = shapeFill.value;
            }
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
            context.fillStyle = "#fff";
            context.fill();
            if (fill.checked) {
                context.fillStyle = shapeFill.value;
                context.fill();
            }
        }
    }
});

board.addEventListener("mouseup", function () {
    isLine = false;
});

function clearBoard() {
    context.clearRect(0, 0, board.width, board.height);
}

board.addEventListener("touchstart", function (event) {
    event.preventDefault();
    isLine = true;
    let coordinates = getCoordinates(event.touches[0]);
    finalOffsetX = coordinates.x;
    finalOffsetY = coordinates.y;
});

board.addEventListener("touchmove", function (event) {
    event.preventDefault();
    if (isLine) {
        if (eraser.checked) {
            let coordinates = getCoordinates(event.touches[0]);
            context.beginPath();
            context.moveTo(finalOffsetX, finalOffsetY);
            context.lineTo(coordinates.x, coordinates.y);
            context.stroke();
            finalOffsetX = coordinates.x;
            finalOffsetY = coordinates.y;
            context.strokeStyle = "#fff";
            context.lineWidth = eraserSize.value;
            if (fill.checked) {
                context.strokeStyle = shapeFill.value;
            }
        }
        else if (brush.checked) {
            let coordinates = getCoordinates(event.touches[0]);
            context.beginPath();
            context.moveTo(finalOffsetX, finalOffsetY);
            context.lineTo(coordinates.x, coordinates.y);
            context.stroke();
            finalOffsetX = coordinates.x;
            finalOffsetY = coordinates.y;
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
        } else if (rectangle.checked) {
            let coordinates = getCoordinates(event.touches[0]);
            context.beginPath();
            context.rect(
                finalOffsetX,
                finalOffsetY,
                coordinates.x - finalOffsetX,
                coordinates.y - finalOffsetY
            );
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
            context.fillRect(
                finalOffsetX,
                finalOffsetY,
                coordinates.x - finalOffsetX,
                coordinates.y - finalOffsetY
            );
            context.fillStyle = "#fff";
            context.stroke();
            if (fill.checked) {
                context.fillStyle = shapeFill.value;
            }
        } else if (circle.checked) {
            let coordinates = getCoordinates(event.touches[0]);
            context.beginPath();
            let radius = Math.sqrt(
                Math.pow(coordinates.x - finalOffsetX, 2) +
                Math.pow(coordinates.y - finalOffsetY, 2)
            );
            context.arc(finalOffsetX, finalOffsetY, radius, 0, 2 * Math.PI);
            context.strokeStyle = color.value;
            context.lineWidth = size.value;
            context.stroke();
            context.fill();
            context.fillStyle = "#fff";
            if (fill.checked) {
                context.fillStyle = shapeFill.value;
            }
        }
    }
});

board.addEventListener("touchend", function () {
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

function getCoordinatesShapes(touch) {
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