function changeScreen(screen){
    if (!(screen === 'new-game' || screen === 'in-game' || screen === 'end-game'))
    {
        console.log('Screen parameter is wrong');
        return false;
    }
    document.querySelector('#new-game').classList.add('hidden');
    document.querySelector('#in-game').classList.add('hidden');
    document.querySelector('#end-game').classList.add('hidden');

    if (screen === 'in-game')
    {
        startGame();
        document.querySelector(`#${screen}`).classList.remove('hidden');
    }
    if (screen === 'new-game')
    {
        document.querySelector(`#${screen}`).classList.remove('hidden');
    }
    if (screen === 'end-game')
    {
        document.querySelector(`#${screen}`).classList.remove('hidden');
    }
}

const user = {
    gameUpdate: '',
    gameScore: 0
}

const grid = {
    start: function createGrid(row,columns)
    {
        this.gridRows = row;
        this.gridColumns = columns;
        this.createdGrid = Array(row).fill(null).map(()=> Array(columns).fill(null));
    }
}

const render = {
    createRenderGrid: function (rows,columns) {
        const parent = document.querySelector('.grid-game')
        parent.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        parent.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        for (let r = 0; r < rows; r++)
        {
            for (let c = 0; c < columns; c++)
            {
                const newDiv = document.createElement('div');
                newDiv.classList.add('default-cell', `grid-cell-${r+1}-${c+1}`);
                newDiv.style.backgroundColor = `rgba(${Math.random()* 255},${Math.random() * 255}, ${Math.random() * 255}, 1)`;
                parent.appendChild(newDiv);
            }
        }
    },
    renderSnake: function (head, body){
        const colorReset = 'rgba(1,1,1,1)';
        Array.from(document.querySelectorAll('.default-cell')).forEach(el => el.style.backgroundColor = colorReset); //Resets grid
        const snake_size = body.length;

        for (let i = 0; i < snake_size; i++)
        {try{
            if (i === 0)// render head
            {
                document.querySelector(`.grid-cell-${head[0] + 1}-${head[1] + 1}`).style.backgroundColor = snake.color;
            }
            document.querySelector(`.grid-cell-${body[i][0] + 1}-${body[i][1] + 1}`).style.backgroundColor = snake.color;
        }catch(err){
            changeScreen('end-game');
            snake.resetGame();
        }
        }
        }
    ,
    renderApple: function(position){
    try{
        document.querySelector(`.grid-cell-${position[0] + 1}-${position[1] + 1}`).style.backgroundColor = apple.color;
    }catch(err){}
    },
    renderScore: function(){
        document.querySelector('.score-div').innerHTML = user.gameScore;
    },
    renderAll: function(){
        render.renderSnake(snake.head, snake.body); //in-reset
        render.renderApple(apple.location);
        render.renderScore();
    }

}

const snake = {
    head: [0,2],
    body: [[0,1],[0,0]],
    direction: [1,0],
    eat: false,
    color: 'rgb(33, 170, 65)',
    moveSnake: function (){
        snake.body.unshift(snake.head);
        snake.head = [snake.head[0] + snake.direction[0], snake.head[1] + snake.direction[1]];
        snake.checkEaten();
        snake.checkLose();
        snake.eat ? snake.eat = false : snake.body.pop();
    },
    changeDirection: function (e){
        const direction = e.key === 'a'? [0, -1] : e.key === 's'? [1,0] : e.key === 'd'? [0,1] : e.key === 'w'? [-1,0] : null
        if (direction === null)
        {
            return;
        }
        if (snake.head[0] + direction[0] === snake.body[0][0] && snake.head[1] + direction[1] === snake.body[0][1])
        {
            return;
        }
        else{
            snake.direction = direction;
        }
    },
    checkEaten: function() {
        if (apple.location[0] === snake.head[0] && apple.location[1] === snake.head[1])
        {
            console.log('Peguei Frutinha hummmm!');
            user.gameScore++;
            snake.eat = true;
            apple.generate();
        }
    },
    checkLose: function(){
        for (let i = 0; i < snake.body.length; i++)
        {
            if(snake.head[0] === snake.body[i][0] && snake.head[1] === snake.body[i][1])
            {
                changeScreen('end-game');
                snake.resetGame();
            } 
        }
    },
    resetGame: function(){
        clearInterval(user.gameUpdate);
        document.querySelector('.grid-game').innerHTML = '';
        snake.head = [0,2];
        snake.body = [[0,1],[0,0]];
        snake.direction = [1,0];
        snake.eat = false;
        apple.generate();
        user.gameScore = 0;
    }
}

const apple = {
    color: 'rgb(255, 0, 0)',
    location: [],
    generate: function(){
        const randomY = Math.floor(Math.random() * grid.gridRows);
        const randomX = Math.floor(Math.random() * grid.gridColumns);
        for (let i = 0; i < snake.body.length; i++)
        {
            if (i === 0 && randomY === snake.head[0] && randomX === snake.head[1])
            {
                return apple.generate;
            }
            else if (randomY === snake.body[i][0] && randomX === snake.body[i][1])
            {
                return apple.generate;
            }
        }
        apple.location = [randomY, randomX];
        render.renderApple(apple.location);
    }
}

function startGame(){
    const nRows = 20;
    const nColumns = 20;
    const difficulty = 150;
    grid.start(nRows, nColumns);
    render.createRenderGrid(nRows, nColumns);
    render.renderSnake(snake.head, snake.body);
    window.addEventListener('keydown', snake.changeDirection);
    apple.generate();
    user.gameUpdate = setInterval(()=>{snake.moveSnake(); render.renderAll(); }, difficulty);
}

function changeEvent(el)
{
    const elementClass = el.getAttribute()
    el.classList.remove('')
}