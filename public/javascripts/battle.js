var mana_count = 0;

var random ;
var reg, special, utility, ultimate, reg2, special2, utility2, ultimate2;
var uhp_txt,uhp, ulevel_txt, ulevel, umana_txt, umana, uspeed_txt, uspeed;
var chp_txt,chp, clevel_txt, clevel, cmana_txt, cmana, cspeed_txt, cspeed;

//The variable is set to true after the player's attack animation is finished
//Therefore, canGo is only set to true in each individual move's functions
var canGo = false;

function battle_functions()
{
	console.log("In battle function");
	aii();
	game.physics.startSystem(Phaser.Physics.ARCADE);
}
function aii()
{
	random = game.rnd.integerInRange(0, 1);
	console.log("Faculty" + player.facility);
	console.log("random: " + random);
	if(random == 1)
	{
		topText(ai_science_hp(), ai_science_mp(), ai_science_speed());
	}
	else
	{
		topText(ai_eng_hp(), ai_eng_mp(), ai_eng_speed());
	}
}


function topText(ai_hp, ai_mp, ai_speed)
{
c();

//rectangle box
//console.log("IN TOP TEXT FUNCTION");
	var graphics = game.add.graphics(10,10);

	//set a fill and line style
	graphics.beginFill(0x000000, 0.8);
	graphics.lineStyle(2, 0x0f0f12);

	//draw a rectangle
	graphics.drawRect(90,10,860,40);

	window.graphics = graphics;
	var bmd = game.add.bitmapData(200,40);
	bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,180,30);
        bmd.ctx.fillStyle = '#00ff00';
        bmd.ctx.fill();
        //user healt/mana hbar
        healthBar = game.add.sprite(110,35,bmd);
	healthBar.height = 20;
        healthBar.anchor.y = 0.5;
        manaBar = game.add.sprite(110,50,bmd);
        manaBar.height = 10;
        manaBar.anchor.y = 0.5;
        //ai health/mana bar
        aihealthBar = game.add.sprite(590,45,bmd);
	aihealthBar.height = 20;
        aihealthBar.anchor.y = 1;
        aimanaBar = game.add.sprite(725,55,bmd);
        aimanaBar.height = 10;
        aimanaBar.anchor.y = 1;

//Text

	uhp = 50;
	uhp_txt = game.add.text(110,30,"Hp : " + uhp,{
		font: "20px Arial",
		fill: "#ff0000",
		align: "center" });
    	healthBar.width = uhp*8;
 	 umana = 25;
         umana_txt = game.add.text(260,30,"Mp : " + umana,{
                font: "20px Arial",
                fill: "#ff0000",
                align: "center" });
	manaBar.width = umana*10;
	if(player.facility == "Science")
 		var uspeed = 3;
	else
		uspeed = 2;

	uspeed_txt = game.add.text(410,30,"Speed : " + uspeed,{
                font: "20px Arial",
                fill: "#ff0000",
                align: "center" });


 	 chp = ai_hp;
         chp_txt = game.add.text(560,30,"Hp : " + chp,{
                font: "20px Arial",
                fill: "#00ff00",
                align: "center" });
	aihealthBar.width = chp*8;

 	 cmana = ai_mp;
        cmana_txt = game.add.text(710,30,"Mp : " + cmana,{
                font: "20px Arial",
                fill: "#00ff00",
                align: "center" });
	aimanaBar.width = cmana*10;
         cspeed = ai_speed;
         cspeed_txt = game.add.text(860,30,"Speed : " + cspeed,{
                font: "20px Arial",
                fill: "#00ff00",
                align: "center" });

	playerSpeed(speed, cspeed);
}

var player_counter = 0, ai_counter = 0, counter = 0;


function playerSpeed(user, computer)
{
	console.log("User's speed:" +user +", Computer's speed: " +computer);
	if(counter == 0)
	{
	 	random = game.rnd.integerInRange(0, 1);
		if(user == computer)
		{
			if(random == 1)
			{
				chancePlayer("Player's turn");
				console.log("player will go first");

				//Let the player click a button
				canGo = true;

				player_counter++;
				 if(player.facility == "Science")
			                science();
	        		else
	        		        engineering();
					if(player.facility == "Science")
        				{       
						createbtn(); 
						console.log("creating science btn"); 
					}
        				else
        				{ 
						console.log("creating eng btn");              
						createEngBtn();
					}


			}
			else
			{
				ai_counter++;
	 			chanceAI("AI's turn");
				console.log("AI will go first");

				//Make the player wait for the computer to play
				canGo = true;

				if (computer == 3)
	        	        {
				       aisci_attacks();
				}
		                else{
	                	        aieng_attacks();
	                        }

				if(player.facility == "Science")
        			{       
					createbtn(); 
					console.log("creating science btn"); 
				}
        			else
        			{ 
					console.log("creating eng btn");
			                createEngBtn();
				}

			}
		}
		else if (user > computer)
		{
			player_counter++;
			chancePlayer("Player's Turn");

			//User can click on a button
			canGo = true;

			console.log("player will go first");
			if(player.facility == "Science")
	                        science();
       	         	else
		                engineering();

		}
		else
		{
			ai_counter++;
		 	chanceAI("AI's turn");
			console.log("AI will go first");

			//Make the user wait for the ai
			canGo = true;

			if (computer == 3)
				aisci_attacks();
			else
				aieng_attacks();
		}

		counter++;
		//truBattle();
	}


}
function incrementMana(player)
{
	if(player == 1) {
		umana = umana + 1;
		umana_txt.setText("Mp : " + umana);
	}
	else {
		cmana += 1;
		cmana_txt.setText("Mp : " + cmana);
	}
}
function trueBattle()
{
	mana_count = mana_count + 1;
	console.log("IN TRUE BATTLE, MANACOUNTER: " + mana_count);
	message_txt.destroy;
	report_txt.destroy;
	//player_report_txt.destroy;
	console.log("MANA: "  + mana_count);
	//console.log(!(mana_count%2));
	
	console.log("canGo: " + canGo);

	
	//cgraphics.visible = false;
	//pgraphics.visible = false;
	if( uhp > 0 && chp > 0)
	{
		//cgraphics.visible = true;
		//pgraphics.visible = true;
		if(player_counter < ai_counter)
		{
			 player_counter = player_counter + 2;
			 //chancePlayer("Player's turn");

                        if(player.facility == "Science")
                                science();
                        else
                                engineering();
		}
		else
		{
			 ai_counter = ai_counter + 2;
                         //chanceAI("AI's turn");
                        if (cspeed == 3)
                                aisci_attacks();
                        else
                                aieng_attacks();
		}
	}
        if(player.facility == "Science")
        {       
		createbtn(); 
		console.log("creating science btn"); 
	}
        else
        { 
		console.log("creating eng btn");              
		createEngBtn();
	}
}

function resetVariables() {
	player_counter = 0;
	ai_counter = 0;
	counter = 0;
	mana_count = 0;
}

function sr_action(){
	if(canGo == true) {
		console.log("Used regular science attack");
		canGo = false;
		chp = chp - 5;

		if (chp<=0)
		{
			resetVariables();
			game.state.start("win");
		} else
		{

		chp_txt.setText("Hp : " + chp);
		report= "Took 5 damage!";
		ai_dmg(report);
		doKunai(1);
		trueBattle();
		}
	}
}

function ss_action() {
	if(canGo == true) {
		if( umana >=3)
		{
			canGo = false;
		        chp = chp - 8;
			umana = umana-3;
    			if (chp<=0){
				resetVariables();
				game.state.start("win");
			} else {
			//console.log("user : special");
        		chp_txt.setText("Hp : " + chp);
			umana_txt.setText("Mp : " + umana);
			report = "Took 8 damage!";
			ai_dmg(report);
			player_report = "Used 3 MP";
			player_dmg(player_report);
			doExplosion(20);
			trueBattle();

//			if(cspeed == 3) ai_science(); 
			}
		}
	}
}
function utility_action() {
	if(canGo == true) {
		if(umana >= 6 && uhp>0){
			//canGo = false;
//			txt_color = '#0000ff';
        		uhp = uhp + 10;
        		umana =umana-6;
        		//console.log("user: utility");
			uhp_txt.setText("Hp : " + uhp);
        	        umana_txt.setText("Mp : " + umana);
        	        player_report = "Recovered 10 HP";
        	        player_dmg(player_report);
	       	    	trueBattle();
//			if(cspeed == 3) ai_science(); 
		}
	}
}
function ultimate_action() {
//	dmg_txt.destroy();
	if(canGo == true) {
		if(umana >= 14)
		{
			canGo = false;
			txt_color = '#ff0000';
  		      	chp = chp - 18;
        		umana =umana-14;
        		//console.log("user: ultimate");

			if (chp<=0){
				resetVariables();
				game.state.start("win");
			} else {
				 chp_txt.setText("Hp : " + chp);
	                        umana_txt.setText("Mp : " + umana);
         	       report = "Took 18 dmg! ";
         	       ai_dmg(report);
         	       player_report = "Used 14 MP";
         	       player_dmg(player_report);

			doAtomicRestructure(20);
        	      trueBattle();
			}
		}
	}
}

//engineering skill attacks for player --------------------------------------------------------

function er_action(){
	chp = chp - 5;
 	console.log("user : reg attack");
	if (chp<=0){
		resetVariables();
		game.state.start("win");
	} else {
	aihealthBar.width = chp*8;
 	chp_txt.setText("Hp : " + chp);
	report= "Took 5 damage!";
	ai_dmg(report);
	trueBattle();
	}
}

function es_action() {
	if( umana >=3)
	{
		//txt_color = '#ff0000';
	        chp = chp - 8;
		umana = umana-3;
		console.log("user : special");
        	if (chp<=0){
			resetVariables();
			game.state.start("win");
		} else {
 			aihealthBar.width = chp*8;
			chp_txt.setText("Hp : " + chp);
			manaBar.width=umana*10;
                        umana_txt.setText("Mp : " + umana);
		report = "Took 8 damage!";
		ai_dmg(report);
		player_report = "Used 3 MP";
		player_dmg(player_report);
trueBattle();
		}
	}
}
function eutility_action() {
	if(umana >= 6){
//		txt_color = '#0000ff';
        	chp = chp - 10;
        	umana =umana-6;
        	console.log("user: utility");
		if (chp<=0){
			resetVariables();
			game.state.start("win");
		} else {
 			aihealthBar.width = chp*8;
			chp_txt.setText("Hp : " + chp);
			manaBar.width=umana*10;
                        umana_txt.setText("Mp : " + umana);
                report = "Took 10 damage!"
		ai_dmg(report);
                player_report = "Used 6 MP";
                player_dmg(player_report);
          trueBattle();
		}
	}
}
function eultimate_action() {
//	dmg_txt.destroy();

	if(umana >= 14)
	{
		//txt_color = '#ff0000';
  	      	chp = chp - 18;
        	umana = umana - 14;
        	console.log("user: ultimate");
 		if (chp<=0){
			resetVariables();
			game.state.start("win");
		} else {
		 	aihealthBar.width = chp*8;
			chp_txt.setText("Hp : " + chp);
			manaBar.width = umana*10;
                        umana_txt.setText("Mp : " + umana);
                report = "Took 18 damage!";
                ai_dmg(report);
                player_report = "Used 14 MP";
                player_dmg(player_report);
            	trueBattle();
		}
	}
}


//---------------------------AI Attack Functions ---------------------------------------------
function ai_ultimate_action()
{
	//canGo = true;
	uhp = uhp - 18;
	cmana = cmana - 14;
	if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
	healthBar.width = uhp*8;
	uhp_txt.setText("Hp : " + uhp);
	aimanaBar.width=cmana*10;
	cmana_txt.setText("Mp : " + cmana);
	player_report = "Took 18 damage!";
        player_dmg(player_report);
        report = "Used 14 MP";
        ai_dmg(report);
      	trueBattle();
	}


}
function ai_utility_action()
{
	//canGo = true;
	chp = chp + 10;
        cmana = cmana - 6;
	if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
	healthBar.width = uhp*8;
	uhp_txt.setText("Hp : " + uhp);
	aimanaBar.width=cmana*10;
        cmana_txt.setText("Mp : " + cmana);
        report = "Used 6 MP and recovered 10 HP";
        ai_dmg(report);
        trueBattle();
	}

}
function  ai_ss_action()
{
	//canGo = true;
	uhp = uhp - 8;
        cmana = cmana - 3;
        if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
	healthBar.width = uhp*8;
	uhp_txt.setText("Hp : " + uhp);
	aimanaBar.width=cmana*10;
        cmana_txt.setText("Mp : " + cmana);
        player_report = "Took 8 damage!";
        player_dmg(player_report);
        report = "Used 3 MP";
        ai_dmg(report);
        trueBattle();
	}


}
function ai_sr_action()
{
	//canGo = true;
	uhp = uhp - 5;

        if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
	healthBar.width = uhp*8;
	uhp_txt.setText("Hp : " + uhp);
	aimanaBar.width=cmana*10;
        cmana_txt.setText("Mp : " + cmana);
        player_report = "Took 5 damage!";
        player_dmg(player_report);
       	//report = "";
       	//ai_dmg(report);
	trueBattle();

	}
}



// AI ATTACK FOR ENG  ---------------------------------------------------------------------------

function ai_eultimate_action()
{
	console.log("Eng AI used ult");
	//canGo = true;
	uhp = uhp - 18;
	cmana = cmana - 14;

	if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
	uhp_txt.setText("Hp : " + uhp);
        cmana_txt.setText("Mp : " + cmana);
	player_report = "Took 18 damage!";
        player_dmg(player_report);
        report = "Used 14 MP";
        ai_dmg(report);
  	trueBattle();
	}


}
function ai_eutility_action()
{
	console.log("Eng AI used utility");
	//canGo = true;
	uhp = uhp - 10;
        cmana = cmana - 6;
	if(uhp<=0) {
		resetVariables();
		game.state.start("lose");
	} else {
	uhp_txt.setText("Hp : " + uhp);
        cmana_txt.setText("Mp : " + cmana);
        report = "Used 6 MP";
        ai_dmg(report);
	 player_report = "Took 10 damage!";
        player_dmg(player_report);
    	trueBattle();
	}

}
function  ai_es_action()
{
	console.log("Eng AI used special");
	//canGo = true;
	uhp = uhp - 8;
        cmana = cmana - 3;
        if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
        uhp_txt.setText("Hp : " + uhp);
        cmana_txt.setText("Mp : " + cmana);
	player_report = "Took 8 damage!";
        player_dmg(player_report);
        report = "Used 3 MP";
        ai_dmg(report);
      trueBattle();
	}

}
function ai_er_action()
{
	console.log("Eng AI used regular");
	//canGo = true;
	uhp = uhp - 5;
        if (uhp<=0){
		resetVariables();
		game.state.start("lose");
	} else {
        uhp_txt.setText("Hp : " + uhp);
        cmana_txt.setText("Mp : " + cmana);
	player_report = "Took 5 damage!";
        player_dmg(player_report);
       trueBattle();

	}
}
