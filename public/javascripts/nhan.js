var enemy;

function nhanclass()
{
	enemy = new Player(780,180,'nhan');
	nhan_bg = game.add.sprite(0,0,'nhan_bg');
        nhan_bg.scale.setTo(0.9,0.9);
//	console.log("Background: " + nhan_bg);
	console.log(enemy);
	console.log(enemy.sprite);
	console.log(enemy.sprite.scale);
	displayPlayer(enemy);
//	console.log("Nhan: " + nhan);
    //nhan.scale.setTo(0.25,0.25);
	characterBounce(nhan);
}
