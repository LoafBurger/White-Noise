const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//console.log(ctx)    //printing this will show you the properties or drawing methods of the canvas (.something)
canvas.width = window.innerWidth;   //this makes sure that the canvas covers the entire window horizontally
canvas.height = window.innerHeight; //covers vertically
const particlesArray = [];

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
    for (let i = 0; i < 10; i++) {  //everytime you click, you will create a few particles that come from the mouse
        particlesArray.push(new Particle());

    }
})

canvas.addEventListener("mousemove", function(event) {  //whenever the mouse moves, we update the mouse location and call the draw function
    mouse.x = event.x;  //you always have to update the coords here
    mouse.y = event.y;  //you always have to update the coords here
    for (let i = 0; i < 10; i++) {  //everytime you click, you will create a few particles that come from the mouse
        particlesArray.push(new Particle());

    }
})


class Particle {
    constructor() { //everything in the constructor are properties of a particle object
        this.x = mouse.x; //these are declared as undefined, so we wont use them
        this.y = mouse.y; //these are declared as undefined, so we wont use them
        this.size = Math.random() * 15 + 1;  //random number from 1 to 6.
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

    draw() {
        ctx.fillStyle = "white";  //fill focuses on the color inside the shape after beginpath
        ctx.beginPath(); //begins path lets js knows that we are starting a new shape using lines
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);   //x, y, radius, start angle, ending angle
        ctx.fill();
    }
}


function handleParticles() {
    for (let i  = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);    //splicing will delete this 1 element at the specific index
            console.log(particlesArray.length); 
            i--;    //when you are going to remove items from array and splice, use this
        }
    }
}

function animate () {   //this animation function will be called over and over to create an animation
    ctx.clearRect(0, 0, canvas.width, canvas.height); //we will start with this so we can only see the current frame. starting x, starting y, to end width, to end height
    handleParticles();
    requestAnimationFrame(animate); //doing this will create a loop.
}

animate();