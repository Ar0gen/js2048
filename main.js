document.addEventListener('DOMContentLoaded',() => { 
    const canvasDisplay = document.querySelector('.canvas');
    const scoreDisplay = document.getElementById('score');
    const width = 4;
    let squares = [];
    let pos = [0,0];

    //游戏的基础板子
    function createboard() {
        for(let i = 0; i < width*width; i++){
                let square = document.createElement("div");
                square.innerHTML = 0;
                canvasDisplay.appendChild(square);
                squares.push(square); 
        }
        generate();
        generate();
    }
    createboard();

    function generate(){
        let randomNumber = Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2;
            // checkoutLose();
        }else generate();
    }

    function moveRight(){
        for(let x=0; x < 4; x++){
            for(let y=3; y >= 0; y--){
                let t = parseInt(squares[x*4 + y].innerHTML);
                if(t !== 0){
                    let flag = 1;
                    let m = parseInt(squares[x*4 + i].innerHTML);
                    for(let i=y+1; i < 4; i++){
                        if(m !== 0){
                            if(m !== t){
                                if(i !== y+1){
                                    squares[x*4 + i-1].innerHTML = t;
                                    squares[x*4 + y].innerHTML = 0;
                                }
                            }else{
                                combine(x,y,i);
                            }
                            flag = 0;
                        }
                    }
                    if(flag && y!==3){
                        squares[x*4 + 3].innerHTML = t;
                        squares[x*4 + y].innerHTML = 0;
                    }
                }
            }
        }
    }

    function moveLeft(){
        for(let x=0; x < 4; x++){
            for(let y=1; y < 4; y++){
                if(squares[x*4 + y].innerHTML !== 0){
                    for(let i=0; i < y; i++){
                        if(squares[x*4 + i].innerHTML != 0){
                            if(squares[x*4 + i].innerHTML !== squares[x*4 + y].innerHTML){
                                if(i !== y-1){
                                    squares[x*4 + i+1].innerHTML = squares[x*4 + y].innerHTML;
                                    squares[x*4 + y].innerHTML = 0;
                                }
                            }else{
                                combine(x,y,i);
                            }
                        }else{
                            move(x,y,i);
                            moveLeft();
                        }
                    }
                }
            }
        }  
    }

    function combine(x,y,i){
        squares[x*4 + i].innerHTML *= 2;
        squares[x*4 + y].innerHTML = 0;
    }

    function move(x,y,i){
        squares[x*4 + i].innerHTML = squares[x*4 + y].innerHTML;
        squares[x*4 + y].innerHTML = 0;
    }
    //键位移动
    document.addEventListener('keyup', control);
    function keyLeft(){
        moveLeft();
        // checkoutWin();
        generate();
    }

    function keyRight(){
        moveRight();
        // checkoutWin();
        generate();
    }

    function keyUp(){
        moveUp();

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
});

