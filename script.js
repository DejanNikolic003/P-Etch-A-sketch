const WIDTH = 32; // Grid width
const HEIGHT = 32; // Grid height
const container = document.querySelector('.container');
const buttonsContainerEl = document.querySelector('.buttons');
const createGridButtonEl = document.createElement('button');
const clearButtonEl = document.createElement('button');
const eraserButtonEl = document.createElement('button');
const showGridButtonEl = document.createElement('button');

clearButtonEl.style.marginTop = '12px';
clearButtonEl.textContent = 'Clear';

createGridButtonEl.style.marginTop = '12px';
createGridButtonEl.style.marginLeft = '12px';
createGridButtonEl.textContent = 'Create new grid';

eraserButtonEl.style.marginTop = '12px';
eraserButtonEl.style.marginLeft = '12px';
eraserButtonEl.textContent = 'Eraser';

showGridButtonEl.style.marginTop = '12px';
showGridButtonEl.style.marginLeft = '12px';
showGridButtonEl.textContent = 'Show grid';

buttonsContainerEl.appendChild(clearButtonEl);
buttonsContainerEl.appendChild(createGridButtonEl);
buttonsContainerEl.appendChild(eraserButtonEl);
buttonsContainerEl.appendChild(showGridButtonEl);

let isEraserEnabled = false;
let isGridVisible = false;

const getCells = () => {
    const cells = document.querySelectorAll('.cell');

    return cells;
}

const createGrid = (width, height) => {
    for(let i = 0; i < width * height; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.setAttribute('id', 'cell' + i);

        container.appendChild(div);
    }

    setupCells(getCells());
};



const generateRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const destroyGrid = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.remove();
    })
};


const setupCells = (cells) => {
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', (event) => {
            let color = generateRandomColor();

            if(isEraserEnabled) {
                color = 'white';
            }

            event.target.style.backgroundColor = color;
        });

    });
};

// DEFAULT GRID
createGrid(WIDTH, HEIGHT);

clearButtonEl.addEventListener('click', () => {
    let cells = getCells();

    cells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
    });
});

eraserButtonEl.addEventListener('click', () => {
    isEraserEnabled = !isEraserEnabled;
    eraserButtonEl.textContent = isEraserEnabled ? 'Eraser - Enabled' : 'Eraser';
})

createGridButtonEl.addEventListener('click', () => {
    let width = prompt('Enter the width of the grid');
    let height = prompt('Enter the height of the grid');

    destroyGrid();
    createGrid(width, height);
});

showGridButtonEl.addEventListener('click', () => {
    let cells = getCells();
    isGridVisible = !isGridVisible;

    cells.forEach((cell) => {
        if(isGridVisible) {
            cell.style.border = '1px solid gray';
            return;
        }

        cell.style.border = 'none';
    });

    showGridButtonEl.textContent = isGridVisible ? 'Show grid' : 'Hide grid';
});
