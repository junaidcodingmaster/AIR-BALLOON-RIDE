var yoyoballon,database;
var position;

function preload(){
  bg = loadImage("images/background.png");
  blink = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
}
function setup(){
    database = firebase.database();
    createCanvas(500,500);

    yoyoballon = createSprite(200,200,50,50);
    yoyoballon.addAnimation("this blink for change color of hot air yoyoballon.", blink);
    yoyoballon.scale = 0.5;

var yoyoballonposition = database.ref('ballon/position');

yoyoballonposition.on("value",readPosition,showError);



}

function draw(){
   background(bg); 
    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(+10,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        yoyoballon.scale = yoyoballon.scale - 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
        yoyoballon.scale = yoyoballon.scale + 0.01;
    }
}
    drawSprites();
}

function writePosition(x,y){
    database.ref('ballon/position').set({
       x:position.x +x,
       y:position.y +y


    })
}


function readPosition(data)
    {
      position = data.val();
      yoyoballon.x = position.x;
      yoyoballon.y = position.y;

    }

    function showError()
    {

        console.log("Error");
    }