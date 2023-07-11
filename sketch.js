var PLAY = 1;
var END = 0;
var Win;
var gameState = PLAY;
var gameState2 = 0;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var box1,box2, box3, box4, box5, box6, box7, box8, box9, box10;
var feminismo;
var correctAnswer;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var errado;
var questionBox

var score, questionScore; 
var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage =loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  feminismo = loadImage("feminismo_punho.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png")
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  errado= loadAnimation("errado.png")


  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(50,windowHeight/2 +7,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.5;
  
  ground = createSprite(200,windowHeight/2,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(windowWidth/2,windowHeight/2 - 200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth/2,windowHeight/2-140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,windowHeight/2+7,400,20);
  invisibleGround.visible = false;
  
  //criar grupos de obstáculos e nuvens
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false;
  
  box1= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box1.scale = 0.20;
  box1.addImage("feminismo",feminismo);
  box1.visible=false;

  box2= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box2.scale = 0.20;
  box2.addAnimation("feminismo",feminismo);
  box2.visible=false;

  box3= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box3 .scale = 0.20;
  box3.addImage("feminismo",feminismo);
  box3.visible=false;

  box4= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box4.scale = 0.20;
  box4.addImage("feminismo",feminismo);
  box4.visible=false;

  box5= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box5.scale = 0.20;
  box5.addImage("feminismo",feminismo);
  box5.visible=false;

  box6= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box6.scale = 0.20;
  box6.addImage("feminismo",feminismo);
  box6.visible=false;

  box7= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box7.scale = 0.20;
  box7.addImage("feminismo",feminismo);
  box7.visible=false;

  box8= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box8.scale = 0.20;
  box8.addImage("feminismo",feminismo);
  box8.visible=false;

  box9= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box9.scale = 0.20;
  box9.addImage("feminismo",feminismo);
  box9.visible=false;

  box10= createSprite(windowWidth-50,windowHeight/2 - 10,40,40);
  box10.scale = 0.20;
  box10.addImage("feminismo",feminismo);
  box10.visible=false;

  score = 0;
  correctAnswer =0;
  
}

function draw() {
  
  background(180);
  //exibindo pontuação
  textSize(20);
  text("Pontuação: "+ score, windowWidth-150,50);
  textSize(20);
  text("Respostas corretas: "+ correctAnswer,windowWidth-400,50)
 
  if(gameState === PLAY){
   
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //pontuação
   
      
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //pular quando a tecla espaço for pressionada
    if(keyDown("space")&& trex.y >=windowHeight/2 -30) {
        trex.velocityY = -13;
        jumpSound.play();
    }
    
    
    if( ( score + Math.round(getFrameRate()/60)) === 200){
     spawnBox1();
     }
     if(box1.x <= trex.x +20) {
      gameState2=1;
      questionOne();
    }
    

    if( ( score + Math.round(getFrameRate()/60)) === 600){
      spawnBox2();
      }
      if(box2.x <= trex.x+20) {
        gameState2=1;
        questionTwo();}
     
    if( ( score + Math.round(getFrameRate()/60)) === 1000){
      spawnBox3();
      }
      if(box3.x <= trex.x+20) {
        gameState2=1;
        questionThree();}

    if( ( score + Math.round(getFrameRate()/60)) === 1400){
      spawnBox4();
      }
      if(box4.x <= trex.x+20) {
        gameState2=1;
        questionFour();}
   
    if( ( score + Math.round(getFrameRate()/60)) === 1800){
          spawnBox5();
          }
        if(box5.x <= trex.x+20) {
            gameState2=1;
            questionFive();}

    if( ( score + Math.round(getFrameRate()/60)) === 2200){
      spawnBox6();
      }
      if(box6.x <= trex.x+20) {
        gameState2=1;
        questionSix();}

    if( ( score + Math.round(getFrameRate()/60)) === 2600){
          spawnBox7();
      }
          if(box7.x <= trex.x+20) {
            gameState2=1;
            questionSeven();}
    
    if( ( score + Math.round(getFrameRate()/60)) === 3000){
          spawnBox8();
        }
        if(box8.x <= trex.x+20) {
          gameState2=1;
          questionEight();}
    
    if( ( score + Math.round(getFrameRate()/60)) === 3400){
            spawnBox9();
        }
      if(box9.x <= trex.x+20) {
        gameState2=1;
        questionNine();}
    
    if( ( score + Math.round(getFrameRate()/60)) === 3800){
            spawnBox10();
        }
      if(box10.x <= trex.x+20) {
        gameState2=1;
        questionTen();}
    




     if(gameState2 ===0){
      score = score + Math.round(getFrameRate()/60);
      
    }

    if(gameState2 ===1){
      
            gameP();
        }
   
   //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
  
    //gerar as nuvens
    spawnClouds();
  
    //gerar obstáculos no chão
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

      //mudar a animação do trex
        trex.changeAnimation("collided", trex_collided);
    
      ground.velocityX = 0;
      trex.velocityY = 0
      
      //definir tempo de vida aos objetos do jogo para que nunca sejam destruídos
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
     
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0); 
        
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  if(( score + Math.round(getFrameRate()/60))===4000){
    gameState=Win;
  }
  
  if(gameState===Win){
    textSize(50);
    text("Você chegou ao fim",windowWidth/2-240,windowHeight/2)
    textSize(30)
    text("Resultado: ",windowWidth/2-190,windowHeight/2+100)
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach(); 
    trex.visible=false;
    ground.visible=false;
    if(correctAnswer===0 || correctAnswer===1){
      textSize(30);
      text("Muito Ruim",windowWidth/2-30,windowHeight/2+100)
    }
    if(correctAnswer===2 || correctAnswer===3){
      textSize(30);
      text(" Ruim",windowWidth/2-30,windowHeight/2+100)
    }
    if(correctAnswer===4 || correctAnswer===5){
      textSize(30);
      text("Regular",windowWidth/2-30,windowHeight/2+100)
    }
    if(correctAnswer===6 || correctAnswer===7){
      textSize(30);
      text("Bom",windowWidth/2-30,windowHeight/2+100)
    }
    if(correctAnswer===8 || correctAnswer===9){
      textSize(30);
      text("Muito Bom",windowWidth/2-30,windowHeight/2+100)
    }
    if(correctAnswer===10){
      textSize(30);
      text("Excelente",windowWidth/2-30,windowHeight/2+100)
    }
  }

  

 
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  
  
 

  drawSprites();
}

function reset(){
  gameState= PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
  correctAnswer=0;
  box1.visible=false;
  box1.x=windowWidth-50;
  box1.y=windowHeight/2;
  
  box2.visible=false;
  box2.x=windowWidth-50;
  box2.y=windowHeight/2;
 
  box3.visible=false;
  box3.x=windowWidth-50;
  box3.y=windowHeight/2;
 
  box4.visible=false;
  box4.x=windowWidth-50;
  box4.y=windowHeight/2;
 
  box5.visible=false;
  box5.x=windowWidth-50;
  box5.y=windowHeight/2;

  box6.visible=false;
  box6.x=windowWidth-50;
  box6.y=windowHeight/2;
  
  box7.visible=false;
  box7.x=windowWidth-50;
  box7.y=windowHeight/2;

  box8.visible=false;
  box8.x=windowWidth-50;
  box8.y=windowHeight/2;

  box9.visible=false;
  box9.x=windowWidth-50;
  box9.y=windowHeight/2;

  box10.visible=false;
  box10.x=windowWidth-50;
  box10.y=windowHeight/2;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(windowWidth-50,windowHeight/2 - 10,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribua dimensão e tempo de vida aos obstáculos           
    obstacle.scale = 0.65;
    obstacle.lifetime = 300;
   
   //adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    var cloud = createSprite(windowWidth-1,windowHeight/4+200,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 1;
    cloud.velocityX = -3;
    
     //atribua tempo de vida à variável
    cloud.lifetime = 800;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adicione cada nuvem ao grupo
    cloudsGroup.add(cloud);
  }
}
 
function questionOne() {
  
  text("Qual foi a primeira mulher a ganhar o prêmio Nobel?",windowWidth/2-230,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. Marie Curie  ",windowWidth/2-100,windowHeight/2 +200);
  text("2. Angelina Jolie ",windowWidth/2-100,windowHeight/2 +230);
  text("3. Malala Yousafzai",windowWidth/2-100,windowHeight/2 +260);
  box1.velocityX=0;
  if(keyDown("1")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box1.y=windowHeight-70;
    box1.x=trex.x +30;
  }
   if(keyDown("2") || keyDown("3")){
    gameState2=0;
    box1.y=windowHeight-70;
    box1.x=trex.x+110;
    box1.visible=false;
  }
}
function questionTwo() {
  
  text("As mulheres brasileiras ganham __ menos que os homens",windowWidth/2-250,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. 13%  ",windowWidth/2-50,windowHeight/2 +200);
  text("2. 45% ",windowWidth/2-50,windowHeight/2 +230);
  text("3. 21%",windowWidth/2-50,windowHeight/2 +260);
  box2.velocityX=0;
  if(keyDown("3")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box2.y=windowHeight-70;
    box2.x=box1.x+100;
  }
   if(keyDown("1") || keyDown("2")){
    gameState2=0;
    box2.y=windowHeight-70;
    box2.x=box1.x+100;
    box2.visible=false;
  }

}
function questionThree() {
  
  text("A porcentagem de desemprego das mulheres no Brasil é de __ enquanto dos homens é de __",windowWidth/2-380,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. 5,9% e 3,7%  ",windowWidth/2-40,windowHeight/2 +200);
  text("2. 8,3 % e 4,8%  ",windowWidth/2-40,windowHeight/2 +230);
  text("3. 9,8% e 6,5% ",windowWidth/2-40,windowHeight/2 +260);
  box3.velocityX=0;
  if(keyDown("2")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box3.y=windowHeight-70;
    box3.x=box2.x+100;
  }
  else if(keyDown("1") || keyDown("3")){
    gameState2=0;
    box3.y=windowHeight-70;
    box3.x=box2.x+100;
    box3.visible=false;
  }
}
function questionFour() {
  
  text("Cerca de __ das mulheres brasileiras já sofreu algum episódio de violência física e sexual pelo menos uma vez na vida.",windowWidth/2-480,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. 1/5",windowWidth/2-40,windowHeight/2 +200);
  text("2. 1/3",windowWidth/2-40,windowHeight/2 +230);
  text("3. 1/2",windowWidth/2-40,windowHeight/2 +260);
  box4.velocityX=0;
  if(keyDown("2")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box4.y=windowHeight-70;
    box4.x=box3.x+100;
  }
  else if(keyDown("1") || keyDown("3")){
    gameState2=0;
    box4.y=windowHeight-70;
    box4.x=box3.x+100;
    box4.visible=false;
  }
}
function questionFive() {
  
  text("O direito ao voto pelas mulheres no Brasil foi concedido em…",windowWidth/2-230,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. 1932",windowWidth/2-40,windowHeight/2 +200);
  text("2. 1944",windowWidth/2-40,windowHeight/2 +230);
  text("3. 1957",windowWidth/2-40,windowHeight/2 +260);
  box5.velocityX=0;
  if(keyDown("1")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box5.y=windowHeight-70;
    box5.x=box4.x+100;
  }
  else if(keyDown("2") || keyDown("3")){
    gameState2=0;
    box5.y=windowHeight-70;
    box5.x=box4.x+100;
    box5.visible=false;
  }
}
function questionSix() {
  
  text("Qual foi o primeiro país a permitir o voto feminino?",windowWidth/2-213,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. Estados Unidos",windowWidth/2-100,windowHeight/2 +200);
  text("2. Inglaterra ",windowWidth/2-100,windowHeight/2 +230);
  text("3. Nova Zelândia ",windowWidth/2-100,windowHeight/2 +260);
  box6.velocityX=0;
  if(keyDown("3")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box6.y=windowHeight-70;
    box6.x=box5.x+100;
  }
  else if(keyDown("1") || keyDown("2")){
    gameState2=0;
    box6.y=windowHeight-70;
    box6.x=box5.x+100;
    box6.visible=false;
  }
}
function questionSeven() {
  
  text("Qual foi a primeira mulher a ser eleita presidente no mundo?",windowWidth/2-255,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. Dilma Rousseff - Brasil ",windowWidth/2-140,windowHeight/2 +200);
  text("2. Vigdís Finnbogadóttir - Islândia  ",windowWidth/2-140,windowHeight/2 +230);
  text("3. Angela Merkel - Alemanha",windowWidth/2-140,windowHeight/2 +260);
  box7.velocityX=0;
  if(keyDown("2")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box7.y=windowHeight-70;
    box7.x=box6.x+100;
  }
  else if(keyDown("1") || keyDown("3")){
    gameState2=0;
    box7.y=windowHeight-70;
    box7.x=box6.x+100;
    box7.visible=false;
  }
}
function questionEight() {
  
  text("Qual foi a primeira mulher a pilotar um avião e atravessar o oceano Atlântico pelo ar? ",windowWidth/2-350,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. Amelia Earhart  ",windowWidth/2-100,windowHeight/2 +200);
  text("2. Anésia Pinheiro Machado",windowWidth/2-100,windowHeight/2 +230);
  text("3. Raymonde de Laroche",windowWidth/2-100,windowHeight/2 +260);
  box8.velocityX=0;
  if(keyDown("1")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box8.y=windowHeight-70;
    box8.x=box7.x+100;
  }
  else if(keyDown("2") || keyDown("3")){
    gameState2=0;
    box8.y=windowHeight-70;
    box8.x=box7.x+100;
    box8.visible=false;
  }
}
function questionNine() {
  
  text("Em qual ano foi conquistado o direito da mulher de frequentar uma universidade no Brasil? ",windowWidth/2-380,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. 1879",windowWidth/2-40,windowHeight/2 +200);
  text("2. 1900",windowWidth/2-40,windowHeight/2 +230);
  text("3. 1883",windowWidth/2-40,windowHeight/2 +260);
  box9.velocityX=0;
  if(keyDown("1")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box9.y=windowHeight-70;
    box9.x=box8.x+100;
  }
  else if(keyDown("2") || keyDown("3")){
    gameState2=0;
    box9.y=windowHeight-70;
    box9.x=box8.x+100
    box9.visible=false;
   }
}
function questionTen() {
  
  text("Qual a porcentagem de mulheres brasileiras com 25 anos ou mais que completaram a universidade? E de homens? ",windowWidth/2-490,windowHeight/2 +100);
  text("(pressione no teclado o número da resposta)",windowWidth/2-190,windowHeight/2 +135);
  text("1. 25% e 18%",windowWidth/2-100,windowHeight/2 +200);
  text("2. 19% e 15%",windowWidth/2-100,windowHeight/2 +230);
  text("3. 20% e 16%",windowWidth/2-100,windowHeight/2 +260);
  box10.velocityX=0;
  if(keyDown("1")){
    gameState2=0;
    correctAnswer=correctAnswer+1;
    box10.y=windowHeight-70;
    box10.x=box9.x+100;
  }
  else if(keyDown("2") || keyDown("3")){
    gameState2=0;
    box10.y=windowHeight-70;
    box10.x=box9.x+100;
    box10.visible=false;
  }
}//1
function gameP(){
      score= score;
      ground.velocityX = 0;
      trex.velocityY = 0
       obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0); 
        obstaclesGroup.setLifetimeEach(0);
        cloudsGroup.setLifetimeEach(0);
       
        
}

function spawnBox1(){
 
  box1.velocityX = -30;
  box1.visible=true;
}
function spawnBox2(){
  box2.velocityX = -30;
  box2.visible=true;

}
function spawnBox3(){
  box3.velocityX = -30;
  box3.visible=true;
}
function spawnBox4(){
  box4.velocityX = -30;
  box4.visible=true;
}
function spawnBox5(){
  box5.velocityX = -30;
  box5.visible=true;
}
function spawnBox6(){
  box6.velocityX = -30;
  box6.visible=true;

}
function spawnBox7(){
  box7.velocityX = -30;
  box7.visible=true;
}
function spawnBox8(){
  box8.velocityX = -30;
  box8.visible=true;
}
function spawnBox9(){
  box9.velocityX = -30;
  box9.visible=true;
}
function spawnBox10(){
  box10.velocityX = -30;
  box10.visible=true;

}