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
}



const colorReset = 'rgba(1,1,1,1)';

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
        Array.from(document.querySelectorAll('.default-cell')).forEach(el => el.style.backgroundColor = colorReset); //Resets grid
        const snake_size = body.length;

        for (let i = 0; i < snake_size; i++)
        {
            if (i === 0)// render head
            {
                document.querySelector(`.grid-cell-${head[0] + 1}-${head[1] + 1}`).style.backgroundColor = snake.color;
            }
            document.querySelector(`.grid-cell-${body[i][0] + 1}-${body[i][1] + 1}`).style.backgroundColor = snake.color;
        }
    }

}

const snake = {
    head: [0,2],
    body: [[0,1],[0,0]],
    direction: [1,0],
    eat: false,
    moveSnake: function (){
        this.body.unshift(this.head);
        this.head = [this.head[0] + this.direction[0], this.head[1] + this.direction[1]];
        this.eat ? null : (this.body.pop(), this.eat = false);
    },
    changeDirection: function (e){
        console.log(e.key);
        const direction = e.key === 'a'? [0, -1] : e.key === 's'? [1,0] : e.key === 'd'? [0,1] : e.key === 'w'? [-1,0] : null
        console.log(direction);
        if (direction === null)
        {
            return;
        }
        if (snake.head[0] + direction[0] === snake.body[0] && snake.head[1] + direction[1] === snake.body[1])
        {
            return;
        }
        else{
            snake.direction = direction;
        }
    },
    color: 'rgb(33, 170, 65)'
}

function startGame(){
    const nRows = 20;
    const nColumns = 20;
    

    function createGrid(row,columns)
    {
        return Array(row).fill(null).map(()=> Array(columns).fill(null));
    }


    
    render.createRenderGrid(nRows, nColumns);
    const grid = createGrid(nRows, nColumns);
    render.renderSnake(snake.head, snake.body);
    window.addEventListener('keydown', snake.changeDirection);
    setInterval(()=>{snake.moveSnake(); render.renderSnake(snake.head,snake.body); }, 500);
}