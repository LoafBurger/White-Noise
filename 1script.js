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


class Particle {
    constructor() { //everything in the constructor are properties of a particle object
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;  //random number from 1 to 6.
        this.speedX = Math.random() * 3 - 1.5;   //random number between 1.5 and -1.5
        this.speedY = Math.random() * 3 - 1.5;   //random number between 1.5 and -1.5
    }

    update() {  //this creates a 2d vector for movement in canvas
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = "white";  //fill focuses on the color inside the shape after beginpath
        ctx.beginPath(); //begins path lets js knows that we are starting a new shape using lines
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);   //x, y, radius, start angle, ending angle
        ctx.fill();
    }
}

function particleCreator() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

particleCreator();

function handleParticles() {
    for (let i  = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate () {   //this animation function will be called over and over to create an animation
    ctx.clearRect(0, 0, canvas.width, canvas.height); //we will start with this so we can only see the current frame. starting x, starting y, to end width, to end height
    handleParticles();
    requestAnimationFrame(animate); //doing this will create a loop.
}

animate();