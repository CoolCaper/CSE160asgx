// DrawRectangle.js

//Helper Functions

//some comments are just tips for myself as I work LOL

function clear_screen() {    
    // console.log("Clearing screen attempted...") commenting out console.logs instead of deleting them will show them how hard you worked
    glob_ctx.fillStyle = 'rgba(0,0,0,1.0)';
    glob_ctx.fillRect(0, 0, 400, 400);
}

function find_length(vec_1, vec_2) {
    x_squared = vec_1.elements[0] * vec_1.elements[0]
    y_squared = vec_2.elements[1] * vec_2.elements[1] 
    z_squared = x_squared + y_squared
    return Math.sqrt(z_squared)
}
// asg0 functions
function drawVector(v, color) {
    glob_ctx.beginPath();
    glob_ctx.moveTo(200, 200);
    glob_ctx.strokeStyle = color
    // glob_ctx.scale(20, 1)
    glob_ctx.lineTo((v.elements[0] * 20) + 200, (v.elements[1] * -20) + 200);
    glob_ctx.stroke();
}

function handleDrawEvent() {    
    clear_screen()
    //think of function, get the following four values in an array and the subtract
    //remember to not simplify things too much lest things get too uncomfortable for YOU the PROGRAMMER
    var v1 = new Vector3([document.getElementById("V1XInp").value, document.getElementById("V1YInp").value, 0])
    var v2 = new Vector3([document.getElementById("V2XInp").value, document.getElementById("V2YInp").value, 0])
    console.log("Drawing")
    drawVector(v1, "red")
    console.log("Drawing")
    drawVector(v2, "blue")
}

function handleDrawOperationEvent() {
    console.log("Function called.")
    clear_screen()
    let v1 = new Vector3([document.getElementById("V1XInp").value, (document.getElementById("V1YInp").value), 0])
    let v2 = new Vector3([document.getElementById("V2XInp").value, (document.getElementById("V2YInp").value), 0])
    drawVector(v1, "red")
    drawVector(v2, "blue")
    let scalar = document.getElementById("scale").value, operation = document.getElementById("op_select").value
    console.log("Operation: ", operation)
    if (operation == "Add") {
        console.log(operation)
        v1.add(v2)
        drawVector(v1, "green")
    } else if (operation == "Subtract") {
        console.log(operation)
        v1.sub(v2)
        drawVector(v1, "green")
    } else if (operation == "Multiply") { //next time you don't have to make this operation's internal ID be the full name
        console.log(operation)
        v3 = new Vector3(v1.elements)
        v4 = new Vector3(v2.elements)
        v3.mul(scalar)
        v4.mul(scalar)
        drawVector(v3, "green")
        drawVector(v4, "green")
    } else if (operation == "Divide") {
        v3_div = new Vector3(v1.elements)
        v4_div = new Vector3(v2.elements)
        v3_div.div(scalar)
        v4_div.div(scalar)
        drawVector(v3_div, "green")
        drawVector(v4_div, "green")
    } else if (operation == "Magnitude") {
        console.log(operation)
        v3_mag = new Vector3(v1.elements)
        v4_mag = new Vector3(v2.elements)
        console.log("v1: ", v3_mag.magnitude())
        console.log("v2: ", v4_mag.magnitude())
    } else if (operation == "norm") {
        console.log("ALmost.")
        drawVector(v1.normalize(), "green")
        drawVector(v2.normalize(), "green")
    } else if (operation == "angle") {
        //get the magnitude of v1 and v2
        console.log("Angle Between", angleBetween(v1, v2));
        
    } else if (operation == "area") {
        
        console.log("Area Of Triangle:", areaTriangle(v1, v2));
        
    }

}

function angleBetween(v1, v2){
    v1_mag = v1.magnitude()
    v2_mag = v2.magnitude()
    // console.log(v1_mag, v2_mag, Vector3.dot(v1, v2))
    return Math.acos((Vector3.dot(v1, v2) / (v1_mag * v2_mag)))
}

function areaTriangle(v1, v2){
    // | v1 x v2 | / 2 
    let cross_prod = Vector3.cross(v1, v2)
    // console.log("Cross: ", cross_prod);
    // console.log("Mag", cross_prod.magnitude())
    return cross_prod.magnitude() / 2;
}

var glob_ctx = undefined
function main() { 
    //Retrieve <canvas> element <-(1)
    var canvas = document.getElementById('example'); 
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    //get the rendering 2DCG
    var ctx = canvas.getContext('2d');
    glob_ctx = ctx
    //make canvas black
    clear_screen()
}

//Sources: https://green-box.co.uk/how-to-draw-a-line-at-a-specific-angle-using-canvas-javascript/