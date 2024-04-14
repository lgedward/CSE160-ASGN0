function drawVector(v, color) {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + v.elements[0] * 20, canvas.height / 2 - v.elements[1] * 20);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent() {
    var ctx = document.getElementById('example').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawVector(new Vector3([+document.getElementById('x1').value, +document.getElementById('y1').value, 0]), 'red');
    drawVector(new Vector3([+document.getElementById('x2').value, +document.getElementById('y2').value, 0]), 'blue');
}

function angleBetween(v1, v2) {
    // Logic on angleBetween function recommended by ChatGPT (Lines 25-27)
    var angleCos = Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude());
    angleCos = Math.max(-1, Math.min(1, angleCos));
    return Math.acos(angleCos) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
    // Logic on areaTriangle function recommended by ChatGPT (Lines 32-33)
    var cp = Vector3.cross(v1, v2);
    return cp.magnitude() / 2;
}

function handleDrawOperationEvent() {
    var ctx = document.getElementById('example').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var v1 = new Vector3([+document.getElementById('x1').value, +document.getElementById('y1').value, 0]);
    var v2 = new Vector3([+document.getElementById('x2').value, +document.getElementById('y2').value, 0]);

    drawVector(v1, 'red');
    drawVector(v2, 'blue');

    var operation = document.getElementById('Operation').value;
    var scalar = +document.getElementById('Scalar').value;

    switch (operation) {
        case 'add':
            drawVector(new Vector3(v1.elements).add(v2), 'green');
            break;
        case 'sub':
            drawVector(new Vector3(v1.elements).sub(v2), 'green');
            break;
        case 'div':
            drawVector(new Vector3(v1.elements).div(scalar), 'green');
            drawVector(new Vector3(v2.elements).div(scalar), 'green');
            break;
        case 'mul':
            drawVector(new Vector3(v1.elements).mul(scalar), 'green');
            drawVector(new Vector3(v2.elements).mul(scalar), 'green');
            break;
        case 'magnitude':
            console.log('Magnitude(v1): ', v1.magnitude());
            console.log('Magnitude(v2): ', v2.magnitude());
            break;
        case 'normalize':
            drawVector(new Vector3(v1.elements).normalize(), 'green');
            drawVector(new Vector3(v2.elements).normalize(), 'green');
            break;
        case 'angleBetween':
            var angle = angleBetween(v1, v2);
            console.log("Angle: ", angle);
            break;
        case 'area':
            var area = areaTriangle(v1, v2);
            console.log("Area: ", area);
            break;
    }
}

function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}