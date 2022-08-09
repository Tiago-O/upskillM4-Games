//menu

let ticTacMenu = $('#ticTacMenu');
let startGame = $('#startgame');
let ticTacToe = $('#ticTacToe');
let boxWin = $('#box-win');
let pwin = $("#player-winner");
let playAgainButton = $('#playAgainButton');
let timerInterval;
let minutes = $('#minutes');
let seconds = $('#seconds');

if (ticTacMenu.show()) {
    ticTacToe.hide();
    boxWin.hide();
    playAgainButton.hide();
}


function timer() {
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    timerInterval = setInterval( function(){
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}



startGame.click(function () {
    //timer
    // tem que começar a 00:00

    timer();




    if( players()){
       ticTacToe.show();
       ticTacMenu.hide();
   };
});

let player1 = $(`#player1`);
let player2 = $(`#player2`);
let turn1 = $(`#turn1`);
let turn2 = $(`#turn2`);
let border1 = $(`#border1`);
let border2 = $(`#border2`);

function players() {
    let p1 = player1.val();
    let p2= player2.val();
   if(p1!=="" && p2!==""){
       turn1.html(`${p1}`);
       turn2.html(`${p2}`);
       return true;
   }

return false;
}




//jogo
// identicação de variaveis
let turn = 1;
$("#border1").css("border","solid").css("border-color","#02ff0f");
let winner = "";
let score1 = $("#score1");
let point1 = 0;
let score2 = $("#score2");
let point2 = 0;
let round = $("#round");
let roundNumber = 1;
score1.append(`0`);
score2.append(`0`);
round.append(`${roundNumber}/5`);
let sec = 0;

// verificar o 3 em linha usando as imagens de background
function equalCells(a, b, c){
    let cellA = $("#cell"+a);
    let cellB = $("#cell"+b);
    let cellC = $("#cell"+c);
    let bgA = cellA.css("background-image");
    let bgB = cellB.css("background-image");
    let bgC = cellC.css("background-image");
    if( (bgA == bgB) && (bgB == bgC) && (bgA != "none" && bgA != "")){
        if(bgA.indexOf("1.png") >= 0){
            winner = player1.val();
            point1++;
            score1.empty();
            score1.append(`${point1}`);
        }else {
            winner = player2.val();
            point2++;
            score2.empty();
            score2.append(`${point2}`);
        }
        return true;
    }
    else{
        return false;
    }
}

// how to end the game
function endGame(){
    if( equalCells(1, 2, 3) || equalCells(4, 5, 6) || equalCells(7, 8, 9) ||
        equalCells(1, 4, 7) || equalCells(2, 5, 8) || equalCells(3, 6, 9) ||
        equalCells(1, 5, 9) || equalCells(3, 5, 7)
    ){
        //let result= $("#result");
        //result.append(`<h1>O jogador  ${winner}  venceu! </h1>`); // adicionar contador de score.
        // adicionar time out
        setTimeout(() => {
            pwin.append(`O ${winner} venceu!  `);
            if((roundNumber === 5 )|| (point1===3) || (point2===3)){
                gameover();
                round.empty();
                round.append(`${roundNumber}/5`);
                boxWin.show();
            }else {
                restart();
                roundNumber++;
                round.empty();
                round.append(`${roundNumber}/5`);
                boxWin.show();
            }
            winner="";

        }, "500");
        // Remove the click event
      // let cell =$(".cell");
       //cell.off("click");
    } else if(diferentCells()){ // alem do empate repetir a cada jogada adcionar uma border para seleccionar o...
       // let result= $("#result"); // ...jogador que esta a jogar.
        //result.append(`<h1>Empate!</h1>`);
        // adicionar time out
        setTimeout(() => {
           pwin.append(`Empate`);
            if((roundNumber === 5)){
                gameover();
                round.empty();
                round.append(`${roundNumber}/5`);
            }else {
                restart();
                roundNumber++;
                round.empty();
                round.append(`${roundNumber}/5`);
            }

        }, "500")


    } else {
        if( turn ===1){
            $("#border1").css("border","solid").css("border-color","#02ff0f");
            $("#border2").css("border","none");
        } else{
            $("#border2").css("border","solid").css("border-color","#02ff0f");
            $("#border1").css("border","none");
        }
    }
}

// what happens when u click a cell
let cell =$(".cell");
cell.click(function(){
    let bg = $(this).css("background-image");
    if(bg == "none" || bg == "")
    {
        let fig = "url(" + turn.toString() + ".png)";
        $(this).css("background-image", fig);
        turn = (turn == 1? 2:1);
        endGame();
    }
});

let continueButton = $("#continueButton");
continueButton.click(function () {
    boxWin.hide();
    pwin.empty();
});

playAgainButton.click(function () {
    boxWin.hide();
    restart();
    turn = 1;
    winner = "";
    point1 = 0;
    point2 = 0;
    roundNumber = 1;
    score1.empty();
    score2.empty();
    score1.append(`Score: 0`);
    score2.append(`Score: 0`);
    sec = 0;
    pwin.empty();

    timer();
});




function diferentCells() {

    for(let i =1; i <=9;i++) {
       let cell = $("#cell"+i);
       let bg = cell.css("background-image");
       if(bg === "" || bg === "none"){
           return false;
       }
    }
    return true;

}


function restart() {
    for(let i = 0;i<=9;i++){
        let cell = $("#cell"+i);
        let bg = cell.css("background-image", "");
    }
}



let champ;
function gameover(){//pq nao para qdo chega a 3?
    continueButton.hide();
    if(point1>point2){
        champ = player1.val();
        pwin.append(`O ${player1.val()} é o campeão!`);


    } else if(point1<point2){
        champ = player2.val();
        pwin.append(`O ${player2.val()} é o campeão!`);

    } else{
        champ = "Empate";
        pwin.append(`EMPATARAM`);
    }

    //guardar no historico
    saveGame();


    //clear interval
    clearInterval(timerInterval);

    playAgainButton.show();

    roundNumber = 1;
    round.empty();
    round.append(`${roundNumber}/5`);


}

function saveGame(){
    //load history

    let retrievedData = localStorage.getItem('history');
    let history = JSON.parse(retrievedData);
    if(!history) {
        history = [];
    }

    history.push({
        game: 'Tic Tac Toe',
        winner: champ,
        player1:  player1.val(),
        player2: player2.val(),
        gameTime: `${minutes.text()}:${seconds.text()}`,
        timestamp: Date.now()
    });


    // save to Local Storage
    localStorage.setItem("history", JSON.stringify(history));

    console.log(history);
}

