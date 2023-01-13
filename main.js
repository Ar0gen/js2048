document.addEventListener('DOMContentLoaded',start);
function start(){ 
    const canvasDisplay = document.querySelector('.canvas');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;

    //游戏的基础板子
    function createboard() {
        for(let i = 0; i < width*width; i++){
                let square = document.createElement("div");
                square.innerHTML = '';
                canvasDisplay.appendChild(square);
                squares.push(square); 
        }
        generate();
        generate();
    }
    createboard();

    //随机产生新的方块
    function generate(){
        let randomNumber = Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].innerHTML === ''){
            let randomNum = Math.random() < 0.3 ? 4 : 2;
            squares[randomNumber].innerHTML = randomNum;
        }else generate();
    }

    function moveRight(){
        for(let x=0; x < 4; x++){
            for(let y=3; y >= 0; y--){
                if(squares[x*4 + y].innerHTML !== ''){
                    let t = parseInt(squares[x*4 + y].innerHTML);
                    let flag = true;
                    for(let i=y+1; i < 4; i++){
                        if(squares[x*4 + i].innerHTML !== ''){
                            let m = parseInt(squares[x*4 + i].innerHTML);
                            if(m !== t){
                                if(i !== y+1){
                                    squares[x*4 + i-1].innerHTML = t;
                                    squares[x*4 + y].innerHTML = '';
                                }
                            }else{
                                squares[x*4 + i].innerHTML *= 2;
                                squares[x*4 + y].innerHTML = '';
                                score += parseInt(squares[x*4 + i].innerHTML);
                                scoreDisplay.innerHTML = score;
                            }
                            flag = false;
                            break;
                        }
                    }
                    if(flag && y!==3){
                        squares[x*4 + 3].innerHTML = t;
                        squares[x*4 + y].innerHTML = '';
                    }
                }
            }
        }
    }

    function moveLeft(){
        for(let x=0; x < 4; x++){
            for(let y=0; y < 4; y++){
                if(squares[x*4 + y].innerHTML !== ''){
                    let t = parseInt(squares[x*4 + y].innerHTML);
                    let flag = true;
                    for(let i=y-1; i >= 0; i--){
                        if(squares[x*4 + i].innerHTML !== ''){
                            let m = parseInt(squares[x*4 + i].innerHTML);
                            if(m !== t){
                                if(i !== y-1){
                                    squares[x*4 + i+1].innerHTML = t;
                                    squares[x*4 + y].innerHTML = '';
                                }
                            }else{
                                squares[x*4 + i].innerHTML *= 2;
                                squares[x*4 + y].innerHTML = '';
                                score += parseInt(squares[x*4 + i].innerHTML);
                                scoreDisplay.innerHTML = score;
                            }
                            flag = false;
                            break;
                        }
                    }
                    if(flag && y!==0){
                        squares[x*4].innerHTML = t;
                        squares[x*4 + y].innerHTML = '';
                    }
                }
            }
        }  
    }

    function moveUp(){
        for(let y=0; y < 4; y++){
            for(let x=0; x < 4; x++){
                if(squares[x*4 + y].innerHTML !== ''){
                    let t = parseInt(squares[x*4 + y].innerHTML);
                    let flag = true;
                    for(let i=x-1; i >= 0; i--){
                        if(squares[i*4 + y].innerHTML !== ''){
                             let m = parseInt(squares[i*4 + y].innerHTML);
                            if(m !== t){
                                if(i !== x-1){
                                    squares[(i+1)*4 + y].innerHTML = t;
                                    squares[x*4 + y].innerHTML = '';
                                }
                            }else{
                                squares[i*4 + y].innerHTML *= 2;
                                squares[x*4 + y].innerHTML = '';
                                score += parseInt(squares[i*4 + y].innerHTML);
                                scoreDisplay.innerHTML =  score;
                            }
                            flag = false;
                            break;
                        }
                    }
                    if(flag && x!==0){
                        squares[y].innerHTML = t;
                        squares[x*4 + y].innerHTML = '';
                    }
                }
            }
        }
    }

    function moveDown(){
        for(let y=0; y < 4; y++){
            for(let x=3; x >= 0; x--){
                if(squares[x*4 + y].innerHTML !== ''){
                    let t = parseInt(squares[x*4 + y].innerHTML);
                    let flag = true;
                    for(let i=x+1; i < 4; i++){
                        if(squares[i*4 + y].innerHTML !== ''){
                            let m = parseInt(squares[i*4 + y].innerHTML);
                            if(m !== t){
                                if(i !== x+1){
                                    squares[(i-1)*4 + y].innerHTML = t;
                                    squares[x*4 + y].innerHTML = '';
                                }
                            }else{
                                squares[i*4 + y].innerHTML *= 2;
                                squares[x*4 + y].innerHTML = '';
                                score += parseInt(squares[i*4 + y].innerHTML);
                                scoreDisplay.innerHTML = score;
                            }
                            flag = false;
                            break;
                        }
                    }
                    if(flag && x!==3){
                        squares[12+y].innerHTML = t;
                        squares[x*4 + y].innerHTML = '';
                    }
                }
            }
        }
    }

    //键位移动
    document.addEventListener('keyup', control);

    function checkForWin(){
        for(let i=0; i<16; i++){
            if(parseInt(squares[i].innerHTML) === 2048){
                resultDisplay.innerText = 'You Win !';
            }
        }
    }

    function checkForLose(){
        for(let i=0; i<16; i++){
            if(squares[i].innerHTML === ''){
                return;
            }
        }
        for(let x=0; x<3; x++){
            for(let y=0; y <3;y++){
                if(x !== 0){
                    if(squares[(x-1)*4+y].innerHTML === squares[x*4+y].innerHTML){
                        return;
                    }
                }
                if(x !== 3){
                    if(squares[(x+1)*4+y].innerHTML === squares[x*4+y].innerHTML){
                        return;
                    }
                }
                if(y !== 0){
                    if(squares[x*4+ y-1].innerHTML === squares[x*4+y].innerHTML){
                        return;
                    }
                }
                if(y !== 3){
                    if(squares[x*4+ y+1].innerHTML === squares[x*4+y].innerHTML){
                        return;
                    }
                }
            }
        }
        if(squares[15].innerHTML === squares[11].innerHTML
            || squares[15].innerHTML === squares[14].innerHTML)
            return;
        document.getElementById('result').innerHTML = 'Game Over!';
        document.removeEventListener('keyup', control);
        return;
    }

    function canMoveRight(){
        for(let x=0; x < 4; x++){
            for(let y=2;y >= 0; y--){
                if(squares[4*x + y].innerHTML !== '') {
                    if(squares[4*x + y+1].innerHTML === '' 
                    || squares[4*x + y].innerHTML === squares[4*x + y+1].innerHTML)
                        return true;
                }
            }
        }
        return false;
    }

    function canMoveLeft(){
        for(let x=0; x < 4; x++){
            for(let y=1;y < 4; y++){
                if(squares[4*x + y].innerHTML !== '') {
                    if(squares[4*x + y-1].innerHTML === '' 
                        || squares[4*x + y].innerHTML === squares[4*x + y-1].innerHTML)
                        return true;
                }
            }
        }
        return false;
    }

    function canMoveUp(){
        for(let y=0; y < 4; y++){
            for(let x=1;x < 4; x++){
                if(squares[4*x + y].innerHTML !== '') {
                    if(squares[4*(x-1) + y].innerHTML === '' 
                    || squares[4*x + y].innerHTML === squares[4*(x-1) + y].innerHTML)
                        return true;
                }
            }
        }
        return false;
    }

    function canMoveDown(){
        for(let y=0; y < 4; y++){
            for(let x=2;x >= 0; x--){
                if(squares[4*x + y].innerHTML !== '') {
                    if(squares[4*(x+1) + y].innerHTML === '' 
                    || squares[4*x + y].innerHTML === squares[4*(x+1) + y].innerHTML)
                        return true;
                }
            }
        }
        return false;
    }

    function keyRight(){
        if(canMoveRight()){
            moveRight();
            checkForWin();
            generate();
            checkForLose();
        }
    }

    function keyLeft(){
        if(canMoveLeft()){
            moveLeft();
            checkForWin();
            generate(); 
            checkForLose();
        }
    }

    function keyUp(){
        if(canMoveUp()){
            moveUp();
            checkForWin();
            generate();
            checkForLose();
        }
    }

    function keyDown(){
        if(canMoveDown()){
            moveDown();
            checkForWin();
            generate();
            checkForLose();
        }
    }
    function control(e){
        if(e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }
    function addColours() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
            else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8' 
            else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179' 
            else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4' 
            else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064' 
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e' 
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982' 
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c' 
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5' 
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
        }
}
    addColours();
    let myTimer = setInterval(addColours, 50);
}

function restart(){
    document.getElementById('clear').innerHTML = '';
    document.getElementById('score').innerHTML = 0;
    document.getElementById('result').innerHTML = '';
    start();
}

