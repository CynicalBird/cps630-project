//----------------------------------- global variables ------------------------------

var game_started = 0;
var timer;
var amber, rufighter, startbtn, start_bg;

/*
user details
*/

var name, avatar, stats, facility;
var name2, avatar2, stats2, facility2;

var reg, special, utility, ultimate, reg2, special2, utility2, ultimate2;

//----------------------------------- game frame ------------------------------------


/*
initializing the game
*/

var game = new Phaser.Game(1100, 600, Phaser.CANVAS, 'phaser-example', {
        preload: preload,
        create: create,
        update: update,
        render: render,
});

function preload() {

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize();

	//start screen 

        game.load.image('amber', 'assets/title_screen/logo.png');
        game.load.image('rufighter', 'assets/title_screen/RUFighter_logo.png');
        game.load.image('startbtn', 'assets/title_screen/start.png');
	game.load.image('start_bg', 'assets/title_screen/slc_tiles.jpg');

	game.load.image('player1', 'assets/thomas.png');
	game.load.image('player2', 'assets/HAMID.png');

	//Science skills 
	game.load.image('ss', 'assets/science_skills/sb_special.png');
     	game.load.image('sr', 'assets/science_skills/sb_reg.png');
     	game.load.image('sul', 'assets/science_skills/sb_ultimate.png');
     	game.load.image('sut', 'assets/science_skills/sb_utility.png');

 	game.load.image('es', 'assets/engineering_skills/eb_special.png');
        game.load.image('er', 'assets/engineering_skills/eb_reg.png');
        game.load.image('eul', 'assets/engineering_skills/eb_ultimate.png');
        game.load.image('eut', 'assets/engineering_skills/eb_utility.png');

}

function create()
{
        if (!game_started)
                startScreen();
        else
        {
                console.log("game starting");
                clearScreen();
                signupScreen();
        }

}

function update()
{
}

function render() {
                //Code from https://phaser.io/examples/v2/display/viewport
                var x = 32;
                var y = 0;
                var yi = 32;
}


//----------------------------------- Screens ---------------------------------------

function width(){
	return window.innerWidth;
	console.log('Width: ' + window.innerWidth);
}
function height(){
	return window.innerHeight;
	console.log('Height: ' + window.innerHeight);
}
function startScreen(){

	console.log("in start screen " + window.innerHeight);
     	game.stage.backgroundColor = '#000';

	start_bg = game.add.sprite(0,0,'start_bg');
	start_bg.scale.setTo(0.3,0.3);
	amber = game.add.sprite(20, 450,'amber');
	amber.scale.setTo(0.5,0.5);

	game.time.events.add(Phaser.Timer.SECONDS * 4, fadePicture, this);

	rufighter = game.add.sprite(150, 20,'rufighter');
//	rufighter.scale.setTo(1,1)
	startbtn = game.add.sprite(800, 525,'startbtn');
//	startbtn.scale.setTo(0.8,0.8);
	startbtn.anchor.set(0.5);
	startbtn.inputEnabled = true;
	startbtn.events.onInputDown.add(start_action, this);
}

function fadePicture(){
	console.log("in fade");
	game.add.tween(amber).to( {alpha: 0}, 1000, Phaser.Easing.Linear.None, true);

}
function start_action(){

	console.log("clearing the start screen");
	remove(amber);
	remove(rufighter);
	remove(startbtn);
	battleFeild();
}

function battleFeild(){

	console.log("in the battle screen");
	callingServer();
}

//------------------------------------ server related ---------------------------------
function callingServer(){

	var request = new XMLHttpRequest();
        var url = 'http://52.38.67.158:8081/';
        request.open('GET',url,true);
        request.onload = function ()
        {
                if (request.status >= 200 && request.status < 400)
                {
                        //do something 
                        storeJSON(JSON.parse(request.response));
                }
                else
                {
                        console.log("URL could not be reached: "+url);
                        alert("game server could not be reached");
                }
        };
        request.onerror = function ()
        {
                alert("error");
        }
        request.send();
}

function storeJSON(JSON_object)
{
        console.log(JSON_object);
	console.log(JSON_object[0]);
	console.log(JSON_object[1]);


	user_info(JSON_object[0].avatar, JSON_object[0].facility,JSON_object[0].name, JSON_object[0].stats);
	ai_info(JSON_object[1].avatar, JSON_object[1].facility,JSON_object[1].name, JSON_object[1].stats);

}

//---------------------------------- player info ----------------------------

function user_info(avatar, facility, name, stats){

	console.log( avatar); 
	console.log(facility);
	console.log(name); 
	console.log(stats);

	this.avatar = game.add.sprite(width()/9,height()/8,'player1');
	this.avatar.scale.setTo(0.2,0.2);

	if( facility == "Science")
		science();
	else
		engineering();

}

function ai_info(avatar, facility, name, stats){

	console.log( avatar); 
        console.log(facility);
        console.log(name); 
        console.log(stats);

        this.avatar2 = game.add.sprite(width()/2 + width()/3,height()/2,'player2');
        this.avatar2.scale.setTo(0.2,0.2);


}

// --------------------------------- facility skills ------------------------

function science(){

	reg = game.add.sprite(width()/15 ,window.innerHeight - 100,'sr');
  	reg.anchor.set(0.5);
        reg.inputEnabled = true;
        reg.events.onInputDown.add(reg_action, this);

}

function engineering(){

}

//----------------------------------- skill function -----------------------
function reg_action(){


}

//----------------------------------- remove ---------------------------------

function remove(element)
{
        element.visible = false;
}
