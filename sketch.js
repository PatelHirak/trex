var trex, trex_running, trex_collided,gameover,restart,gameoverimg,restartimg;
var ground, invisibleGround, groundImage,cloudImage,score = 0;
var cloudsGroup,obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png");

    groundImage = loadImage("ground2.png");

    cloudImage = loadImage("cloud.png");

    obstacle1 = loadImage("obstacle1.png");

    obstacle2 = loadImage("obstacle2.png");

    obstacle3 = loadImage("obstacle3.png");

    obstacle4 = loadImage("obstacle4.png");

    obstacle5 = loadImage("obstacle5.png");

    obstacle6 = loadImage("obstacle6.png");

    gameoverimg = loadImage("gameOver.png");

    restartimg = loadImage("restart.png");

    checkPointSound = loadSound("checkpoint.mp3");

    dieSound = loadSound("die.mp3");

    jumpSound = loadSound("jump.mp3");

}

function setup() {

    createCanvas(600, 200);

    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;

    //create a ground sprite
    ground = createSprite(300,180,600,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    invisibleGround = createSprite(300,190,600,10);
    invisibleGround.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();

    trex.debug = true;

    trex.setCollider("rectangle",0,0,400,trex.height);

    gameover = createSprite(300,100,0,0);
    gameover.addImage(gameoverimg);
    gameover.scale = 0.5;
    gameover.visible = false;

    restart = createSprite(300,140,0,0);
    restart.addImage(restartimg);
    restart.scale = 0.5
    restart.visible = false;

}

function draw() {

    background(200);

    text ("Score : "+score,500,90)
    

   
    

    trex.collide(invisibleGround);

    if (gameState==PLAY){

        ground.velocityX = -(5 + 3* score / 100);
        score = score+Math.round(frameRate()/60);3
        if(score>0 && score%100 == 0){

            checkPointSound.play ();

        }
         //jump when the space button is pressed
        if (keyDown("space") && trex.y > 100) {
        trex.velocityY = -10;
        
        jumpSound.play();
        }
        trex.velocityY = trex.velocityY + 0.8
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        createClouds();
        createObstacles();
        if (obstaclesGroup.isTouching(trex)){
            // gameState = END
            // dieSound.play();
            trex.velocityY = -12;
            jumpSound.play();

        }
    }

    else if (gameState == END){

        ground.velocityX = 0;
        trex.velocityY = 0;
        cloudsGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        trex.changeAnimation("collided",trex_collided);
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        gameover.visible = true;
        restart.visible = true;

    }

    drawSprites();
}


function createClouds(){

    if(frameCount%60 == 0){
    var cloud = createSprite (600,50,20,10);
    cloud.velocityX = -3;
    cloud.y = Math.round(random(20,70));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.lifetime = 200 ;
    cloud.depth=trex.depth;
    trex.depth=trex.depth +1;
    cloudsGroup.add(cloud);
}
}

function createObstacles(){

    if(frameCount%60 == 0){

        obstacle = createSprite(600,160,10,40);
        obstacle.velocityX = -(5 + 3* score / 100);
        var number = Math.round(random(1,6));
        switch (number){

            case 1:
                obstacle.addImage(obstacle1);
                break

            case 2:
                obstacle.addImage(obstacle2);
                break

            case 3:
                obstacle.addImage(obstacle3);
                break

            case 4:
                obstacle.addImage(obstacle4);
                break

            case 5:
                obstacle.addImage(obstacle5);
                break

            case 6:
                obstacle.addImage(obstacle6);
                break

            default:
                break
        } 

        obstacle.scale = 0.1;
        obstacle.lifetime = 150;
        obstaclesGroup.add(obstacle);
    }

}