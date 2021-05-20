class Game {
  constructor(){
    this.result = createElement('h2');
    this.rank = createElement('h2');
    this.result.hide();
    this.rank.hide();
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    });

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("car1", car1_img);

    car2 = createSprite(300,200);
    car2.addImage("car2", car2_img);

    car3 = createSprite(500,200);
    car3.addImage("car3", car3_img);

    car4 = createSprite(700,200);
    car4.addImage("car4", car4_img);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0, -displayHeight*4, displayWidth, displayHeight*5);
      //var display_position = 130;
      // Index of the array
      var index = 0;

      // X and Y position of the cars
      var x = 175;
      var y ;
      for(var plr in allPlayers){
        // Add 1 to the index for every loop
        index = index+ 1;

        // Position of cars having different X positions
        x = x+200;
        
        // Use data from the database for the Y direction of the cars
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
    }
    drawSprites();
  }
  end(){
    console.log("GAME ENDED");
    console.log(player.rank);
  }
  showResult(){
    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      stroke('black');
      strokeWeight(5);
      textSize(30);
      this.result.html("GameOver !!!  Your Rank :" );
      this.result.position(displayWidth/2-100,30);
      this.result.show();
      var p = 0;
      for(var plr in allPlayers){
        p = p+1;
        if(p === player.index){
          this.rank.html(allPlayers[plr].name + ":" + allPlayers[plr].rank);
          this.rank.position(displayWidth/2-100, 70);
          this.rank.show();
        }
      } 
    }
  }
}
