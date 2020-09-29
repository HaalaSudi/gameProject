
/*

The Game Project

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlumeting;

var game_score;
var flagpole;
var lives;
var collection_sound;
var sun;
var heart;
var platform;


function preload() {
    soundFormats('mp3');
    collection_sound = loadSound('sounds/collection.mp3');  
    sun = loadImage('images/sun.png');
    heart = loadImage('images/heart.png');
   
  
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlumeting = false;

	// Initialise arrays of scenery objects.
    trees_x = 
    [
       200, 400, 
       600, 800,
       1000,1200,
       1400,1600,
       1800,2000,
        2200,2400,
        2600,2800,
        3000,3200
    
    ];
 
    cloud = 
        [
    {
         x_pos: 200, 
         y_pos: 90, 
         size: 0.6
    },
    {
         x_pos: 900, 
         y_pos: 90, 
         size: 0.8 
    },
    {
        x_pos: 1600, 
        y_pos: 90, 
        size: 0.6
    },

        ];
    
    mountains =
        [
    {
        x_pos: 400, 
        y_pos:120,
        size:50
    },
        {
        x_pos: 1000, 
        y_pos:120,
        size:50
    },
    {
        x_pos: 1400, 
        y_pos:120,
        size:50
    },
         {
        x_pos: 2000, 
        y_pos:120,
        size:50
    },
    
    {
        x_pos: 2600, 
        y_pos:120,
        size:50
    },
         {
        x_pos: 3000, 
        y_pos:120,
        size:50
    },
    
        
        ];
    
      canyon =
          [
       
    {
        x_pos: 80,
        width: 83,
              
    },
    {
        x_pos: 400,
        width: 83,
    },
    {
        x_pos: 900,
        width: 83
    },
    {
        x_pos: 1400,
        width: 83
    },
    {
        x_pos: 2000,
        width: 83
    },
    
          ];
    
          
    collectable =
            [
    {
        x_pos: 46,
        y_pos: 315,
        isFound: false,
        size: 1
        
   },
        {
        x_pos: 106,
        y_pos: 315,
        isFound: false,
        size: 1
        
   },
        {
        x_pos: 168,
        y_pos: 244,
        isFound: false,
        size: 1
        
   },
  {
        x_pos: 240,
        y_pos: 422,
        isFound: false,
        size: 1
        
        
   },
    {
        x_pos: 466,
        y_pos: 313,
        isFound: false,
        size: 1
        
        
   },
    {
        x_pos: 498,
        y_pos: 313,
        isFound: false,
        size: 1
        
        
   },

            
    {
        x_pos: 490,
        y_pos: 422,
        isFound: false,
        size: 1
        
   },
               {
        x_pos: 537,
        y_pos: 237,
        isFound: false,
        size: 1
        
        
   },
               {
        x_pos: 573,
        y_pos: 184,
        isFound: false,
        size: 1
        
        
   },
               {
        x_pos: 630,
        y_pos: 184,
        isFound: false,
        size: 1
        
        
   },
  
    {
        x_pos: 1040,
        y_pos: 422,
        isFound: false,
        size: 1
        
   },
          {
        x_pos: 1240,
        y_pos: 422,
        isFound: false,
        size: 1
        
   },
          {
        x_pos: 1640,
        y_pos: 422,
        isFound: false,
        size: 1
        
   },
            {
        x_pos: 1840,
        y_pos: 422,
        isFound: false,
        size: 1
        
   },
            {
        x_pos: 2240,
        y_pos: 422,
        isFound: false,
        size: 1
        
   },
        
     
     
     
        ];
    
  
    
// Initialise game score
    game_score = 0;
    
// Initialise flag pole
    
    flagpole = 
    {
        x_pos: 2500,
        isReached: false
    }
    
// Initialise lives
    
    lives -= 1;
    
    platform = [];
    platform.push(createPlatform(0,floorPos_y-100,100));
    platform.push(createPlatform(120,floorPos_y-170,100));
    platform.push(createPlatform(420,floorPos_y-100,100));
    platform.push(createPlatform(520,floorPos_y-170,100));
    platform.push(createPlatform(620,floorPos_y-230,100));
    platform.push(createPlatform(1350,floorPos_y-100,100));
    platform.push(createPlatform(1920,floorPos_y-100,100));

}

function setup()
{   
    
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	startGame();
  
    //setup for collection sound
    collection_sound.setVolume(0.1);
    
    //initialising lives available for player
    lives = 4;
    
    


}

function draw()
{
    
	// fill the sky
    background(222, 97, 25); 

	// draw some green ground
    noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4);
    //snow on grass
    fill(255);
	rect(0, floorPos_y, width, height/8);


    
    push();
    
    translate(scrollPos,0);

	// Draw clouds.

    drawClouds();

	// Draw mountains.
    
    drawMountains();

	// Draw trees.
    
   drawTrees();
        
    
    
    
    // Draw canyons
    for (var i = 0; i < canyon.length; i++)
{
            
    drawCanyon(canyon[i]);
    checkCanyon(canyon[i]);
                
};
    // Draw Flagpole
    
    renderFlagpole();
    
    //Draw platform
    for(var i = 0; i < platform.length; i++)
    {
        platform[i].draw();
    }
    
    	// Draw collectable items
    for (var i = 0; i < collectable.length; i++)
{
        
    checkCollectable(collectable[i]);

    if(collectable[i].isFound == false)
    {
        drawCollectable(collectable[i]);
    }
    

    


};
   
    pop();
    
  
    
    // Draw screen text
    
    fill(255);
    noStroke();
    textSize(13);
    text("CHERRIES: " + game_score, 20,30);
    text("LIVES: ", 150,30);
        
	// Draw game character.
	
	drawGameChar();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.6)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.5)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}
    

    // Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y)

    {
        //platform logic so character can climb a platform
        var isContact = false;
        for(var i=0; i<platform.length;i++)
        {
            if(platform[i].checkContact(gameChar_world_x,gameChar_y) ==true)
            {
                isContact = true;
                break;
            }   
        }
        if(isContact == false)
        {
            gameChar_y += 2;
           isFalling = true;
             
        }
        else
        {
           isFalling = false; 
        }
       
     }
    else
    {
        isFalling = false;   
    }
   
    //Logic for flagpole
    if(flagpole.isReached != true)
        {
            checkFlagpole();
        }
    
    if(gameChar_y > 700 && lives > 0)
        {
            startGame();
        }
    
    for(var i = 0; i < lives; i++)
        {
            image(heart,199+i*40,10,25,25);
        }
    if(lives < 1)
        {
            noStroke();
            fill(222,10,10);
            textSize(30);
            text("YOU'VE FAILED! GAME OVER!", 
                 280,250); 
            fill(121,21,21);
            textSize(25);
            text("Press space to try again.", 380,302);
            return;
        }
    
    if(flagpole.isReached)
        {
            
           noStroke();
           fill(52,228,75);
           textSize(30);
           text("Level complete. Help is on its way!", 
                280,250);
            fill(64,196,82);
            textSize(25);
            text("Press space to start again.", 380, 302);
           return; 
             
        
        }

    
   
    
    
    

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

    if(flagpole.isReached && key == ' ')
{
    startGame();
    lives=4;
    return
}
    else if(lives == 0 && key == ' ')
{
    
    startGame();
    lives=4;
    return
}
    
    if(keyCode == 37)
{
        
    isLeft = true;

}
    
    if(keyCode == 39)
{
        
    isRight = true;

}

 for (var i = 0; i < platform.length; i++)
    {
        if (gameChar_y == floorPos_y)
        {
            if(keyCode == 32 ){
               gameChar_y -=100; 
            }
            
        }
        
        else if (keyCode == 32)
        {
            if(platform[i].checkContact(gameChar_world_x, gameChar_y) == true){
               gameChar_y -=100; 
            }
            
        }
    }


      

    
   

}

function keyReleased()
{
    
    if(keyCode == 37)
{
        
    isLeft = false;
}
    
    if(keyCode == 39)
{
        
    isRight = false;
}

     

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    
   	if(isLeft && isFalling)
{
		// add your jumping-left code
        
     //head
    fill(104,63,32);
    ellipse(gameChar_x - 6,
            gameChar_y - 59,
            15,
            20);
    
   //neck
    rect(gameChar_x - 7,
         gameChar_y - 48,
         5,
         3);
    
    //eyes
    fill(255);
    ellipse(gameChar_x - 10,
            gameChar_y - 59,
            5,
            4);
    
    
    
    noStroke();
    
    
    fill(124,7,7);
    //body
    fill(124,7,7);
    rect(gameChar_x - 9,
         gameChar_y - 45,
         12,
         16);
    noStroke();
    
    
    
    fill(104,63,32);
    stroke(0);
    strokeWeight(0.3);
    //left arm
    fill(104,63,32);
    rect(gameChar_x - 2,
         gameChar_y - 45,
         -5,
         16);
    noStroke();
    beginShape();
    vertex(gameChar_x - 4,
           gameChar_y - 31);
    vertex(gameChar_x - 13,
           gameChar_y - 40);
    vertex(gameChar_x - 12,
           gameChar_y - 35);
    vertex(gameChar_x - 7,
           gameChar_y - 29);
    endShape(CLOSE);
    
    
   stroke(100);
    strokeWeight(0.3);
    //left leg
    rect(gameChar_x - 8 ,
         gameChar_y - 25,
         6,
         18);
    //right leg
    rect(gameChar_x - 6,
         gameChar_y - 25,
         6,
         18);
    
    //boots
    fill(0);
    //left
    rect(gameChar_x - 8,
         gameChar_y - 8,
         6,
         9);
    //right
    fill(0);
     rect(gameChar_x - 6,
         gameChar_y - 8,
         6,
         9);
    
    noStroke();
    

    //skirt
    fill(0);
    quad(gameChar_x - 9,
         gameChar_y - 29,
         gameChar_x - 9,
         gameChar_y - 21,
         gameChar_x + 3,
         gameChar_y - 12,
         gameChar_x + 3,
         gameChar_y - 29);
    
        

}
	else if(isRight && isFalling)
{
		// add your jumping-right code
        
  //head
    fill(104,63,32);
    ellipse(gameChar_x - 2,
        gameChar_y - 59,
        15,
        20);
    
   //neck
    rect(gameChar_x - 4,
         gameChar_y - 48,
         5,
         3);
    
    
    

    //eyepatch
    noStroke();
    fill(124,7,7);
    beginShape();
    vertex(gameChar_x - 9,
           gameChar_y - 63);
    
    vertex(gameChar_x - 4,
           gameChar_y - 60);
    
    vertex(gameChar_x - 2,
           gameChar_y - 55);
    
    vertex(gameChar_x + 4,
           gameChar_y - 54);
    
    vertex(gameChar_x + 6.5,
           gameChar_y - 56);
    
    vertex(gameChar_x + 8,
           gameChar_y - 60);
    
    vertex(gameChar_x - 7,
           gameChar_y - 67);
    
    vertex(gameChar_x - 9,
           gameChar_y - 63);
    endShape(CLOSE);
    
    
    noStroke();
    
    //body
    fill(124,7,7);
    rect(gameChar_x - 6,
         gameChar_y - 45,
         12,
         16);
    
   
    
    stroke(0);
    strokeWeight(0.3);
    
    //right arm
    fill(104,63,32);
    rect(gameChar_x - 3,
         gameChar_y - 45,
         5,
         16);
    noStroke();
    beginShape();
    vertex(gameChar_x - 2,
           gameChar_y - 30);
    vertex(gameChar_x + 7,
           gameChar_y - 40);
    vertex(gameChar_x + 7,
           gameChar_y - 37);
    vertex(gameChar_x + 3,
           gameChar_y - 29);
    endShape(CLOSE);
    
     stroke(100);
    strokeWeight(0.3);
    //right leg
    rect(gameChar_x - 1,
         gameChar_y - 25,
         6,
         18);
     //left leg
    rect(gameChar_x - 3 ,
         gameChar_y - 25,
         6,
         18);
    
    
    //boots
    //right
    fill(0);
     rect(gameChar_x - 1,
         gameChar_y - 8,
         6,
         11);
    //left
    rect(gameChar_x - 3,
         gameChar_y - 8,
         6,
         11);
    
   
    noStroke();
    
    //skirt
    fill(0);
    quad(gameChar_x - 6,
         gameChar_y - 29,
         gameChar_x - 6,
         gameChar_y - 21,
         gameChar_x + 6,
         gameChar_y - 14,
         gameChar_x + 6,
         gameChar_y - 29);
    
 
	}
	else if(isLeft)
	{
		// add your walking left code
        
          //head
    fill(104,63,32);
    ellipse(gameChar_x - 6,
            gameChar_y - 59,
            15,
            20);
    
    //neck
    rect(gameChar_x - 7,
         gameChar_y - 48,
         5,
         3);
    
    //eyes
    fill(255);
    ellipse(gameChar_x - 10,
            gameChar_y - 59,
            5,
            4);
    
    noStroke(); 
    //body
    fill(124,7,7);
    rect(gameChar_x - 9,
         gameChar_y - 45,
         12,
         16);
    
    stroke(0);
    strokeWeight(0.3);
    //left arm
    fill(104,63,32);
    rect(gameChar_x - 2,
         gameChar_y - 45,
         -5,
         16);
    


    stroke(100);
    strokeWeight(0.3);
    //left leg
    rect(gameChar_x - 8 ,
         gameChar_y - 25,
         6,
         18);
    //right leg
    rect(gameChar_x - 6,
         gameChar_y - 25,
         6,
         18);
    
    //boots
    fill(0);
    //left
    rect(gameChar_x - 8,
         gameChar_y - 8,
         6,
         11);
    //right
    fill(0);
     rect(gameChar_x - 6,
         gameChar_y - 8,
         6,
         11);
    
    noStroke();
    //skirt
    fill(0);
    quad(gameChar_x - 9,
         gameChar_y - 29,
         gameChar_x - 9,
         gameChar_y - 21,
         gameChar_x + 3,
         gameChar_y - 12,
         gameChar_x + 3,
         gameChar_y - 29);
    

}
	else if(isRight)
{
		// add your walking right code
        
        //head
    fill(104,63,32);
    ellipse(gameChar_x - 2,
        gameChar_y - 59,
        15,
        20);
    
    //neck
    rect(gameChar_x - 4,
         gameChar_y - 48,
         5,
         3);
    

    //eyepatch
    noStroke();
    fill(124,7,7);
    beginShape();
    vertex(gameChar_x - 9,
           gameChar_y - 63);
    
    vertex(gameChar_x - 4,
           gameChar_y - 60);
    
    vertex(gameChar_x - 2,
           gameChar_y - 55);
    
    vertex(gameChar_x + 4,
           gameChar_y - 54);
    
    vertex(gameChar_x + 6.5,
           gameChar_y - 56);
    
    vertex(gameChar_x + 8,
           gameChar_y - 60);
    
    vertex(gameChar_x - 7,
           gameChar_y - 67);
    
    vertex(gameChar_x - 9,
           gameChar_y - 63);
    endShape(CLOSE);
    
    
    noStroke();
    //body
    fill(124,7,7);
    rect(gameChar_x - 6,
         gameChar_y - 45,
         12,
         16);
    
    
    stroke(0);
    strokeWeight(0.3);
    
    //right arm
    fill(104,63,32);
    rect(gameChar_x - 3,
         gameChar_y - 45,
         5,
         16);
    
    stroke(100);
    strokeWeight(0.3);
    //right leg
    rect(gameChar_x - 1,
         gameChar_y - 25,
         6,
         18);
     //left leg
    rect(gameChar_x - 3 ,
         gameChar_y - 25,
         6,
         18);
    
    
    //boots
    //right
    fill(0);
     rect(gameChar_x - 1,
         gameChar_y - 8,
         6,
         11);
    //left
    rect(gameChar_x - 3,
         gameChar_y - 8,
         6,
         11);
    
   
    noStroke();
    //skirt
    fill(0);
    quad(gameChar_x - 6,
         gameChar_y - 29,
         gameChar_x - 6,
         gameChar_y - 21,
         gameChar_x + 6,
         gameChar_y - 14,
         gameChar_x + 6,
         gameChar_y - 29);

}
	else if(isFalling || isPlumeting)
{
		// add your jumping facing forwards code
        
        
       //head
    fill(104,63,32);
    ellipse(gameChar_x - 3,
        gameChar_y - 59,
        20,
        20);
    
    //neck
    rect(gameChar_x - 6,
         gameChar_y - 48,
         7,
         3);
    
    //eyes
    fill(255);
    ellipse(gameChar_x - 8,
            gameChar_y - 59,
            5,
            4);
    


    //eyepatch
    noStroke();
    fill(124,7,7);
    beginShape();
    vertex(gameChar_x - 11,
           gameChar_y - 63);
    
    vertex(gameChar_x - 4,
           gameChar_y - 60);
    
    vertex(gameChar_x - 2,
           gameChar_y - 55);
    
    vertex(gameChar_x + 4,
           gameChar_y - 54);
    
    vertex(gameChar_x + 6.5,
           gameChar_y - 56);
    
    vertex(gameChar_x + 8,
           gameChar_y - 60);
    
    vertex(gameChar_x - 9,
           gameChar_y - 67);
    
    vertex(gameChar_x - 12,
           gameChar_y - 63);
    endShape(CLOSE);
    
    
    noStroke();
    
    //body
    fill(124,7,7);
    rect(gameChar_x - 9,
         gameChar_y - 45,
         15,
         20);
    noStroke();
    
    //right arm
    fill(104,63,32);
    rect(gameChar_x + 6,
         gameChar_y - 45,
         5,
         10);
    beginShape();
    vertex(gameChar_x + 11,gameChar_y - 35);
    vertex(gameChar_x - 1,gameChar_y - 43);
    vertex(gameChar_x - 1,gameChar_y - 40);
    vertex(gameChar_x + 8,gameChar_y - 31);
    endShape(CLOSE);
    
    //left arm
    rect(gameChar_x - 9,
         gameChar_y - 45,
         -5,
         15);
    beginShape();
    vertex(gameChar_x - 15,gameChar_y - 31);
    vertex(gameChar_x - 5,gameChar_y - 35);
    vertex(gameChar_x - 2,gameChar_y - 34);
    vertex(gameChar_x - 11,gameChar_y - 28);
    endShape(CLOSE);
    

    
    //left leg
    rect(gameChar_x - 9 ,
         gameChar_y - 25,
         6,
         18);
    
    
    //right leg
    rect(gameChar_x,
         gameChar_y - 25,
         6,
         18);
    //skirt
    fill(0);
    quad(gameChar_x - 9,
         gameChar_y - 29,
         gameChar_x - 9,
         gameChar_y - 21,
         gameChar_x + 6,
         gameChar_y - 14,
         gameChar_x + 6,
         gameChar_y - 29);
    
    //boots
    fill(0);
    rect(gameChar_x - 9,
         gameChar_y - 8,
         6,
         8);
   beginShape();
    vertex(gameChar_x + 6,gameChar_y - 11);
    vertex(gameChar_x + 9,gameChar_y - 11);
    vertex(gameChar_x + 9,gameChar_y - 8);
    vertex(gameChar_x + 6,gameChar_y - 7);
    endShape(CLOSE);

}
	else
{
		// add your standing front facing code
        
         //head
    fill(104,63,32);
    ellipse(gameChar_x - 3,
        gameChar_y - 59,
        20,
        20);
    
    //neck
    rect(gameChar_x - 6,
         gameChar_y - 48,
         7,
         3);
    
    //eyes
    fill(255);
    ellipse(gameChar_x - 8,
            gameChar_y - 59,
            5,
            4);
    
    

    //eyepatch
    noStroke();
    fill(124,7,7);
    beginShape();
    vertex(gameChar_x - 11,
           gameChar_y - 63);
    
    vertex(gameChar_x - 4,
           gameChar_y - 60);
    
    vertex(gameChar_x - 2,
           gameChar_y - 55);
    
    vertex(gameChar_x + 4,
           gameChar_y - 54);
    
    vertex(gameChar_x + 6.5,
           gameChar_y - 56);
    
    vertex(gameChar_x + 8,
           gameChar_y - 60);
    
    vertex(gameChar_x - 9,
           gameChar_y - 67);
    
    vertex(gameChar_x - 12,
           gameChar_y - 63);
    endShape(CLOSE);
    
    
    noStroke();
    //body
    fill(124,7,7);
    rect(gameChar_x - 9,
         gameChar_y - 45,
         15,
         20);
    
    //right arm
    fill(104,63,32);
    rect(gameChar_x + 6,
         gameChar_y - 45,
         5,
         20);
    
    //left arm
    rect(gameChar_x - 9,
         gameChar_y - 45,
         -5,
         20);
    

    
    //left leg
    rect(gameChar_x - 9 ,
         gameChar_y - 25,
         6,
         18);
    
    
    //right leg
    rect(gameChar_x,
         gameChar_y - 25,
         6,
         18);
    //skirt
    fill(0);
    quad(gameChar_x - 9,
         gameChar_y - 29,
         gameChar_x - 9,
         gameChar_y - 21,
         gameChar_x + 6,
         gameChar_y - 14,
         gameChar_x + 6,
         gameChar_y - 29);
    
    //boots
    fill(0);
    rect(gameChar_x - 9,
         gameChar_y - 8,
         6,
         11);
    rect(gameChar_x,
         gameChar_y - 8,
         6,
         11);

}
    
}


// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds()
{
    for(var i = 0; i < cloud.length; i++)
{
            
    fill(105);
    ellipse(cloud[i].x_pos,
            cloud[i].y_pos - 5 * cloud[i].size, 
        100 * cloud[i].size, 
        75 * cloud[i].size );
    fill(180,180,180);
    ellipse(cloud[i].x_pos  - 50 * cloud[i].size ,
        cloud[i].y_pos,
        80 * cloud[i].size,
        80 * cloud[i].size);
    ellipse(cloud[i].x_pos + 50 * cloud[i].size,
            cloud[i].y_pos,
        80 * cloud[i].size,
        80 * cloud[i].size);
    fill(190,190,190);
    ellipse(cloud[i].x_pos + 81 * cloud[i].size,
            cloud[i].y_pos,
        80 * cloud[i].size,
        60 * cloud[i].size);
    ellipse(cloud[i].x_pos - 77 * cloud[i].size,
            cloud[i].y_pos,
        80 * cloud[i].size,
        60 * cloud[i].size);
    image(sun, 1119, 10, 200, 200);
    
}
    
}

// Function to draw mountains objects.
function drawMountains()
{
  for( var i = 0; i < mountains.length; i++)
{
     noStroke();
    fill(90,48,0);
    //small
    triangle(//top
             mountains[i].x_pos + 126,
             mountains[i].y_pos + 115,
             //left
             mountains[i].x_pos + 16 - mountains[i].size,
             mountains[i].y_pos + 312,
             //right
             mountains[i].x_pos + 228 + mountains[i].size,
             mountains[i].y_pos + 312);
    //snow on top//small
    fill(255);
    beginShape();
    vertex(mountains[i].x_pos + 228/6 + mountains[i].size,
             mountains[i].y_pos + 312);
    vertex(mountains[i].x_pos + 16 - mountains[i].size,
             mountains[i].y_pos + 312)
    vertex(mountains[i].x_pos + 126,
             mountains[i].y_pos + 115);
    endShape(CLOSE);

    //large
    fill(102,51,0);
    triangle(
             mountains[i].x_pos,
             mountains[i].y_pos,
             //left
             mountains[i].x_pos - 131 - mountains[i].size,
             mountains[i].y_pos + 312,
             //right
             mountains[i].x_pos + 115 + mountains[i].size ,
             mountains[i].y_pos + 312);
    //snow on top
    
    fill(255);
    beginShape();
    vertex(mountains[i].x_pos,
           mountains[i].y_pos);
    vertex(mountains[i].x_pos -32,
           mountains[i].y_pos +53);
    vertex(mountains[i].x_pos -12,
           mountains[i].y_pos + 72);
    vertex(mountains[i].x_pos - 1,
           mountains[i].y_pos + 55);
    vertex(mountains[i].x_pos +13,
           mountains[i].y_pos +75);
    vertex(mountains[i].x_pos+16,
           mountains[i].y_pos+63);
    vertex(mountains[i].x_pos+47,
           mountains[i].y_pos+87);

    endShape(CLOSE);
   
           
}  
}

// Function to draw trees objects.
function drawTrees()
{
   for(var i = 0; i < trees_x.length; i++)
    
{
         noStroke();
	fill(51,25,0);
    //trunk
    rect(trees_x[i] - 8, //914,
         floorPos_y - 80, //358,
         21,
         80);
    //branch
    rect(trees_x[i] - 3,
         floorPos_y - 50,
         34,
         4);
    rect(trees_x[i] + 26,
         floorPos_y - 100,
         5,
         50);
            
    //leaves
    fill(0,102,0);
    rect(trees_x[i] - 47,
         floorPos_y - 155,
         89,
         79);
    
    fill(0,152,0);
    rect(trees_x[i] + 6,
         floorPos_y - 100,
         43,
         35);
   //snow
    fill(255);
    ellipse(trees_x[i]-40,284,40,30);
    ellipse(trees_x[i]-10,284,40,30);
    ellipse(trees_x[i]+10,284,40,30);
    ellipse(trees_x[i]+40,284,40,30);
    ellipse(trees_x[i]+40,333,20,10);
    ellipse(trees_x[i]+30,335,20,10);
    ellipse(trees_x[i]+20,333,20,10);
    ellipse(trees_x[i]+10,335,20,10);
    
}
    
  
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.


function drawCanyon(t_canyon)
{
    
    //t_canyon.posX
    noStroke();
    fill(35,137,218);
    rect(t_canyon.x_pos,
         432,
         t_canyon.width,
         150);
   
    
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
   //logic for canyon
    
    if((gameChar_world_x < 400 + t_canyon.width) && 
       (gameChar_world_x > 320 + t_canyon.width)&& 
       (gameChar_y >= floorPos_y))
      {
            isPlumeting = true;
          
           
         
          
      }

    if((gameChar_world_x < 80 + t_canyon.width) && 
       (gameChar_world_x > 22 + t_canyon.width)&& 
       (gameChar_y >= floorPos_y))
      {
            isPlumeting = true;
       
          
      }

    if((gameChar_world_x < 900 + t_canyon.width) && 
       (gameChar_world_x > 825 + t_canyon.width)&& 
       (gameChar_y >= floorPos_y))
      {
            isPlumeting = true;
        
      }
    //1400,2000
     if((gameChar_world_x < 1400 + t_canyon.width) && 
       (gameChar_world_x > 1320 + t_canyon.width)&& 
       (gameChar_y >= floorPos_y))
      {
            isPlumeting = true;
        
      }
    if((gameChar_world_x < 2000 + t_canyon.width) && 
       (gameChar_world_x > 1920 + t_canyon.width)&& 
       (gameChar_y >= floorPos_y))
      {
            isPlumeting = true;
        
      }
    
    if(isPlumeting == true)
       {
          gameChar_y +=1;
            
            
       }

   
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
          noStroke();
    fill(210,0,0);
    //big
    ellipse(t_collectable.x_pos - 4 * t_collectable.size,
            t_collectable.y_pos + 10,
            10 * t_collectable.size,
            10 * t_collectable.size);
    
    fill(255,0,0);
    //small
    ellipse(t_collectable.x_pos + 1 * t_collectable.size,
            t_collectable.y_pos + 10,
            9 * t_collectable.size,
            9 * t_collectable.size);
    
    stroke(45,90,74);
    strokeWeight(0.5);
    line(//connected to cherry
         t_collectable.x_pos - 5 ,
         t_collectable.y_pos + 6,
         //top
         t_collectable.x_pos - 3,
         t_collectable.y_pos);
    line(//connected to cherry
         t_collectable.x_pos,
         t_collectable.y_pos + 7,
         //top
         t_collectable.x_pos - 3,
         t_collectable.y_pos);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    var d_collectible = dist(gameChar_world_x, 
                             gameChar_y, 
                             t_collectable.x_pos, 
                             t_collectable.y_pos);
    
    if(d_collectible < 21 && t_collectable.isFound == false)
        {
            t_collectable.isFound = true;
            game_score +=1;
            collection_sound.play();
        }
    
}

function renderFlagpole()
{
    push();
    stroke(131);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
    
    
    if(flagpole.isReached)
    {
        fill(40,11,10);
        noStroke();
        rect(flagpole.x_pos, floorPos_y - 200, 50, 50);
        image(heart,flagpole.x_pos + 8, floorPos_y - 195, 40, 40);
    }
    else
    {
        fill(40,11,10);
        noStroke();
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);

        
    }
    pop();
}

function checkFlagpole()
{

    
    var d = abs(gameChar_world_x - flagpole.x_pos)
    
    if(d < 50)
        {
            flagpole.isReached = true;
        }
}
 function createPlatform(x,y,length){
     var p ={
         x:x,
         y:y,
         length: length,
         draw: function()
         {
             stroke(255);
             fill(153,0,0);
             rect(this.x,this.y,this.length,20);
             //snow on platform
             fill(255);
             rect(this.x,this.y,this.length,20/2);
             
             
            
         },
         checkContact: function(gc_x, gc_y)
         {
            //checks if character is in contact with platform 
             if(gc_x>this.x && gc_x<this.x+this.length)
             {
                 var d = this.y - gc_y;
                 if(d >= 0 && d < 5)
                 {
                    return true; 
                 }
                 
             }
             return false;
         }
    }
     
     return p;
 }

   

