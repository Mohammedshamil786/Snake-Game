var cvs = document.getElementById("canvas").getContext("2d")
var x = 80;
var y = 80;
var nx = 0;
var ny = 0;
var fx = 140;
var fy = 140;
var snakeTail = [];
var snakeSize = 1;
var score = 0;
var gameStatus = "Ready";



////onload
window.onload = function () {
    document.addEventListener("keydown", inputControl);
    game = setInterval(mainGame, 200);
}

//maingame

function mainGame() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("game-status").innerHTML = gameStatus;

    //move snake
    x += nx;
    y += ny;

    //control snake movement

    if (x > 400) {
        x = 0;
    }


    if (y > 400) {
        y = 0;
    }

    if (x < 0) {
        x = 400;
    }

    if (y < 0) {
        y = 400;
    }


    //game area


    //background color

    cvs.fillStyle = "black";
    cvs.fillRect(0, 0, 400, 400);

    //gridline

    for (var cl = 0; cl < 400; cl += 20) {

        cvs.moveTo(cl, 0);
        cvs.lineTo(cl, 400);
    }

    for (var rl = 0; rl < 400; rl += 20) {

        cvs.moveTo(0, rl);
        cvs.lineTo(400, rl);
    }
    cvs.strokeStyle = "grey"
    cvs.stroke();


    //snake

    cvs.fillStyle = "yellow";
    // cvs.fillRect(x, y, 20, 20);
    for (var i = 0; i < snakeTail.length; i++) {
        cvs.fillRect(
            snakeTail[i].x, snakeTail[i].y, 20, 20
        );
        if (x == snakeTail[i].x && y == snakeTail[i].y && snakeSize > 1) {
            clearInterval(game);
            gameStatus = "Game Over";
            document.getElementById("game-status").innerHTML = gameStatus;



        }

    }

    //fruit

    cvs.fillStyle = "red";
    cvs.fillRect(fx, fy, 20, 20);

    //if snake eat fruit

    if (x == fx && y == fy) {
        snakeSize++;
        score += 10;
        fx = Math.floor(Math.random() * 20) * 20;
        fy = Math.floor(Math.random() * 20) * 20;

    }

    snakeTail.push({ x: x, y: y });
    while (snakeTail.length > snakeSize) {
        snakeTail.shift();
    }


}

//input control

function inputControl(e) {
    console.log(e.keyCode);
    console.log(e.key);

    switch (e.keyCode) {
        case 38:
            //up
            ny -= 20;
            nx = 0;
            break;
        case 40:
            //down
            ny += 20;
            nx = 0;
            break;
        case 39:
            //right
            nx += 20;
            ny = 0;
            break;
        case 37:
            //left
            nx -= 20;
            ny = 0;
            break;
    }

    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
        gameStatus = "Game Started";
        document.getElementById("game-status").innerHTML = gameStatus;


    }

}