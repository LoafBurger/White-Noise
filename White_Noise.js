const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//console.log(ctx)    //printing this will show you the properties or drawing methods of the canvas (.something)
canvas.width = window.innerWidth;   //this makes sure that the canvas covers the entire window horizontally
canvas.height = window.innerHeight; //covers vertically
const particlesArray = [];

//CONTROLS
const trailBoolButton = document.getElementById("showTrail");
var boolTrail = false;

const colorChangeButton = document.getElementById("changeButton");
const colorChoice = ["white", "blue", "red", "yellow", "green"];
var valueColor = 0;
var chosenColor = colorChoice[valueColor];

const shapeChangeButton = document.getElementById("changeShape");
const shapeChoice = ["circle", "square"];
var valueShape = 0;
var chosenShape = shapeChoice[valueShape];

var chosenTrail = 2;
const trailSlider = document.getElementById("trail");
const labelTrail = document.querySelector('[for="trail"]');
trailSlider.addEventListener("change", function(e) {
    //console.log(e.target.value);
    chosenTrail = e.target.value;
})

var chosenExplosion = 10;
const explosionSlider = document.getElementById("explosion");
const labelExplosion = document.querySelector('[for="explosion"]');
explosionSlider.addEventListener("change", function(e) {
    //console.log(e.target.value);
    chosenExplosion = e.target.value;
})

var chosenSize = 15;
const sizeSlider = document.getElementById("size");
const labelSize = document.querySelector('[for="size"]')
sizeSlider.addEventListener("change", function(e) {
    //console.log(e.target.value);
    chosenSize = e.target.value;
})


//EVENT LISTENERS
window.addEventListener("resize", function(){   //makes sures to resize if user decides to change dimensions
    canvas.width = window.innerWidth;   //this makes sure that the canvas covers the entire window horizontally
    canvas.height = window.innerHeight; //covers vertically
    //every time you draw something, always include it in here so it goes with resize
})

const mouse = { //creates a mouse object, which will store mouse x and y coords and are globally available all around the program
    x: undefined,   //undefined makes this start at essentially null
    y: undefined,   //undefined makes this start at essentially null
}
canvas.addEventListener("click", function(event){  //action listener for clicking the mouse. event can be e or anything
    mouse.x = event.x;  //grabbing x for mouse
    mouse.y = event.y;  //grabbing y for mouse
    for (let i = 0; i < chosenExplosion; i++) {  //everytime you click, you will create a few particles that come from the mouse
        particlesArray.push(new Particle());

    }
})

canvas.addEventListener("mousemove", function(event) {  //whenever the mouse moves, we update the mouse location and call the draw function
    mouse.x = event.x;  //you always have to update the coords here
    mouse.y = event.y;  //you always have to update the coords here
    for (let i = 0; i < chosenTrail; i++) {  //everytime you click, you will create a few particles that come from the mouse
        particlesArray.push(new Particle());

    }
})

colorChangeButton.addEventListener("click", colorChange);
shapeChangeButton.addEventListener("click", shapeChange);
trailBoolButton.addEventListener("click", trailBoolChange);



class Particle {
    constructor() { //everything in the constructor are properties of a particle object
        this.x = mouse.x; //these are declared as undefined, so we wont use them
        this.y = mouse.y; //these are declared as undefined, so we wont use them
        this.size = Math.random() * chosenSize + 1;  //random number from 1 to 6.
        this.speedX = Math.random() * 3 - 1.5;   //random number between 1.5 and -1.5
        this.speedY = Math.random() * 3 - 1.5;   //random number between 1.5 and -1.5
    }

    update() {  //this creates a 2d vector for movement in canvas
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {  //make the particle fade away
            this.size -= 0.1;
        }
    }

    drawCircle() {
        ctx.shadowColor = chosenColor;  //this line and the line below it will create the glow effect
        ctx.shadowBlur = 15;
        ctx.fillStyle = chosenColor;  //fill focuses on the color inside the shape after beginpath
        ctx.beginPath(); //begins path lets js knows that we are starting a new shape using lines
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);   //x, y, radius, start angle, ending angle
        ctx.fill();
    }

    drawSquare() {
        ctx.shadowColor = chosenColor;
        ctx.shadowBlur = 15;
        ctx.fillStyle = chosenColor;
        ctx.fillRect(this.x - 15, this.y - 15, this.size, this.size);
        ctx.fill();
    }
}


function handleParticles() {
    for (let i  = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        if (chosenShape == "circle") {
            particlesArray[i].drawCircle();
        } else if (chosenShape == "square") {
            particlesArray[i].drawSquare();
        }
        if (boolTrail == true) {
            for (let j = i; j < particlesArray.length; j++) {   //constellation effect: we compare all the particles together and add lines if they are close
                const dx = particlesArray[i].x - particlesArray[j].x;   //bottom of triangle
                const dy = particlesArray[i].y - particlesArray[j].y;   //height of triangle
                const distance = Math.sqrt(dx * dx + dy * dy);  //hypotenuse
                if (distance < 100) {   //if they are close, create a line
                    ctx.beginPath();
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                    ctx.stroke();
                }
            }
        } 
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);    //splicing will delete this 1 element at the specific index
            //console.log(particlesArray.length); 
            i--;    //when you are going to remove items from array and splice, use this
        }
    }
}

function animate () {   //this animation function will be called over and over to create an animation    
    //trail effect: If you don't want the trail, you can use the following two lines. If not, just use the top line.
    //ctx.fillStyle = "rgba(0,0,0,0.01)";
    //ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.clearRect(0, 0, canvas.width, canvas.height); //we will start with this so we can only see the current frame. starting x, starting y, to end width, to end height
    handleParticles();
    requestAnimationFrame(animate); //doing this will create a loop.
}

function colorChange() {
    valueColor += 1;
    if (valueColor >= colorChoice.length) {
        valueColor = 0;
    }
    chosenColor = colorChoice[valueColor];
    console.log(chosenColor);
}

function shapeChange() {
    valueShape += 1;
    if (valueShape >= shapeChoice.length) {
        valueShape = 0;
    }
    chosenShape = shapeChoice[valueShape];
    console.log(chosenShape);
}

function trailBoolChange() {
    boolTrail = !boolTrail;
}

animate();


/*
Developer Objectives:
1. Adding Button to change colors ******
2. Add sliders to give user the chance to adjust particle trail ******
3. Add sliders to give user a chance to adjust particle explosion   ******
4. Add title at the top of the screen "White Noise" ******
5. Add slider to change radius  ******
6. Add name on the bottom left  ******
7. Change Shape ******
8. Give the user the option to include the lines or not. This will need another button  ******
9. Change System so that once you click it once, it switches immediately not random ******
*/






/*
Developer Notes:
1. If you want to select a random color from an array, do particleColors[Math.floor(Math.random() * 4)];
2. This is kind of stupid, but make sure you have all the capitlization down for stuff like innerHeight. Otherwise, it will bug out the code
3. For the objectives, please review daily :D
4. You can use left right top left to move stuff
5. margin allows you to create some space between elements
6. padding increases the area of something
7. border radius gives something that round look
*/






