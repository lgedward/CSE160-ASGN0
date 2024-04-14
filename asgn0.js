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
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x = document.getElementById('xInput').value;
    var y = document.getElementById('yInput').value;
    var v1 = new Vector3([parseFloat(x), parseFloat(y), 0]);

    var x2 = document.getElementById('xInput2').value;
    var y2 = document.getElementById('yInput2').value;
    var v2 = new Vector3([parseFloat(x2), parseFloat(y2), 0]);
    
    drawVector(v1, 'red');

    drawVector(v2, 'blue');
}

function angleBetween(v1, v2) {
    var dotProd = Vector3.dot(v1, v2);
    var magnitudeV1 = v1.magnitude();
    var magnitudeV2 = v2.magnitude();
    // Avoid division by zero and rounding errors causing acos to return NaN
    var cosineOfAngle = dotProd / (magnitudeV1 * magnitudeV2);
    cosineOfAngle = Math.max(-1, Math.min(1, cosineOfAngle)); // Clamp value to the range [-1, 1]
    return Math.acos(cosineOfAngle) * (180 / Math.PI); // Convert to degrees
}

function areaTriangle(v1, v2) {
    var crossProduct = Vector3.cross(v1, v2);
    return crossProduct.magnitude() / 2;
}


function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create and draw v1
    var x1 = parseFloat(document.getElementById('xInput').value);
    var y1 = parseFloat(document.getElementById('yInput').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, 'red');

    // Create and draw v2
    var x2 = parseFloat(document.getElementById('xInput2').value);
    var y2 = parseFloat(document.getElementById('yInput2').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, 'blue');

    // Get operation and scalar
    var operation = document.getElementById('operationSelector').value;
    var scalar = parseFloat(document.getElementById('scalarInput').value);

    // Perform operation and draw the result
    var v3, v4;
    switch (operation) {
        case 'add':
            v3 = new Vector3(v1.elements).add(v2);
            drawVector(v3, 'green');
            break;
        case 'sub':
            v3 = new Vector3(v1.elements).sub(v2);
            drawVector(v3, 'green');
            break;
        case 'div':
            v3 = new Vector3(v1.elements).div(scalar);
            v4 = new Vector3(v2.elements).div(scalar);
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;
        case 'mul':
            v3 = new Vector3(v1.elements).mul(scalar);
            v4 = new Vector3(v2.elements).mul(scalar);
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;
        case 'magnitude':
            console.log('Magnitude of v1:', v1.magnitude());
            console.log('Magnitude of v2:', v2.magnitude());
            break;

        case 'normalize':
            var normV1 = new Vector3(v1.elements).normalize();
            var normV2 = new Vector3(v2.elements).normalize();
            drawVector(normV1, 'green');
            drawVector(normV2, 'green');
            break;
        case 'angleBetween':
            var angle = angleBetween(v1, v2);
            console.log('Angle between v1 and v2:', angle);
            break;
        case 'area':
            var area = areaTriangle(v1, v2);
            console.log('Area of the triangle formed by v1 and v2:', area);
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