const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// c.fillRect(120,130,100,100);
// c.fillStyle = 'rgba(0,0,255,0.5)'
// c.fillRect(520,230,100,100);
// c.fillStyle = 'rgba(70,240,255,0.5)'
// c.fillRect(1220,530,100,100);
// c.fillStyle = 'rgba(52,154,255,0.5)'
// c.fillRect(920,830,100,100);

// console.log(canvas);

// line

// c.beginPath();
// c.moveTo(100,300);
// c.lineTo(800,350);
// c.lineTo(800,550);
// c.lineTo(100,450);
// c.lineTo(100,300);
// c.strokeStyle = 'red';
// c.stroke();

// arc

// for (let i = 0; i < 10;i++) {
    
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x , y , 50 ,0 , Math.PI * 2 , false );
//     c.strokeStyle = 'blue';
//     c.stroke();
// }

let mouse = {
    x : undefined,
    y : undefined
}

const  maxRadius = 25;
// const  minRadius = 2;

const colorArray = [
    '#8C1F28',
    '#591C21',
    '#044040',
    '#D92525',
    '#F2F2F2',
    '#45FF00',
];
window.addEventListener('mousemove',
    function (e){
        mouse.x = e.x;
        mouse.y = e.y;
});
window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init ();
})


function Circle(x, y, radius, dx , dy ) {
    this.x = x; 
    this.y = y; 
    this.radius = radius; 
    this.dx = dx; 
    this.dy = dy; 

    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length )]

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y , this.radius ,0 , Math.PI * 2 , false );
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if( this.x + this.radius > innerWidth ||
            this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if( this.y + this.radius > innerHeight || 
            this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if( mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius ){
                this.radius += 1

            }
        }
        else if ( this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw();


    }
}



let circleArray = [];

function init () {
    circleArray = [];

    for(let i = 0 ; i < 1000 ; i++) {
        let radius = Math.random() * 2 + 1;
    
        let x = (Math.random() * (innerWidth -radius*2)+radius);
        let y = (Math.random() * (innerHeight-radius*2)+radius);
        let dx = Math.random() * 2;
        let dy = Math.random() * 2; 
    
        circleArray.push(new Circle(x, y, radius, dx, dy));
    
}

}

function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0 , 0 , innerWidth , innerHeight);

    for(let i = 0 ; i  < circleArray.length ; i++ ) {
        circleArray[i].update();
    }
    

    
}
init();
animate();