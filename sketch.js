//Create variables here
var dog,happyDog,dogImg,happyDogImg;
var database;
var foodS,foodStock;
food=20;
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happyDogImg=loadImage("dogImg1.png");
}

function setup() {
 database=firebase.database();
 console.log(database);

	createCanvas(500, 500);
  dog=createSprite(250,400,20,20);
  dog.addImage(dogImg);
  dog.scale=0.2;

 foodStock=database.ref('Food')
 foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
 textSize(20);
 fill("white");
 text("Note:Press UP_ARROW To Feed Drago Milk!",50,50);

 textSize(20);
 fill("white");
 text("Food remaining:"+food,200,300);
 
 if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
  food=food-1;
 }
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
  x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



