import React from 'react';
import cs from 'classnames';

import './App.css';

// Travel speed of the Snake
const speed = 75;

// Size of the game and number of squares
const gridSize = 25;

const grid = [];

for (let i = 0; i <= gridSize; i++) {
  grid.push(i);
}
// Setting snakes direction of grid travel
const directions = {
  UP: 'UP',
  BOTTOM: 'BOTTOM',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

const DIRECTION_TICKS = {
  UP: (x, y) => ({ x, y: y - 1 }),
  BOTTOM: (x, y) => ({ x, y: y + 1 }),
  RIGHT: (x, y) => ({ x: x + 1, y }),
  LEFT: (x, y) => ({ x: x - 1, y }),
};
// Mapping directional keys to control the snakes direction
const controls = {
  38: 'UP',
  39: 'RIGHT',
  37: 'LEFT',
  40: 'BOTTOM',
};

const getRandomNumberFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// Randomly generates Snakes spawn position and snacks position after eaten 
const getRandomCoordinate = () => ({
  x: getRandomNumberFromRange(1, gridSize - 1),
  y: getRandomNumberFromRange(1, gridSize - 1),
});

const isBorder = (x, y) =>
  x === 0 || y === 0 || x === gridSize || y === gridSize;

const isPosition = (x, y, diffX, diffY) => x === diffX && y === diffY;

const isSnake = (x, y, snakeCoordinates) =>
  snakeCoordinates.filter(coordinate =>
    isPosition(coordinate.x, coordinate.y, x, y)
  ).length;

const getSnakeHead = snake => snake.coordinates[0];
//slice to grow snake
const getSnakeWithoutStub = snake =>
  snake.coordinates.slice(0, snake.coordinates.length - 1);

const getSnakeTail = snake => snake.coordinates.slice(1);
// If snake hits borders, game over
const getIsSnakeOutside = snake =>
  getSnakeHead(snake).x >= gridSize ||
  getSnakeHead(snake).y >= gridSize ||
  getSnakeHead(snake).x <= 0 ||
  getSnakeHead(snake).y <= 0;
// If snake hits itself, game over
const getIsSnakeClumsy = snake =>
  isSnake(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    getSnakeTail(snake)
  );
// If snake eats snack, increase size of snake by 1 coordinate
const getIsSnakeEating = ({ snake, snack }) =>
  isPosition(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    snack.coordinate.x,
    snack.coordinate.y
  );

const getCellCs = (isGameOver, snake, snack, x, y) =>
  cs('grid-cell', {
    'grid-cell-border': isBorder(x, y),
    'grid-cell-snake': isSnake(x, y, snake.coordinates),
    'grid-cell-snack': isPosition(
      x,
      y,
      snack.coordinate.x,
      snack.coordinate.y
    ),
    'grid-cell-hit':
      isGameOver &&
      isPosition(x, y, getSnakeHead(snake).x, getSnakeHead(snake).y),
  });

const reducer = (state, action) => {
  switch (action.type) {
    case 'SNAKE_CHANGE_DIRECTION':
      return {
        ...state,
        playground: {
          ...state.playground,
          direction: action.direction,
        },
      };
    case 'SNAKE_MOVE':
      const isSnakeEating = getIsSnakeEating(state);

      const snakeHead = DIRECTION_TICKS[state.playground.direction](
        getSnakeHead(state.snake).x,
        getSnakeHead(state.snake).y
      );

      const snakeTail = isSnakeEating
        ? state.snake.coordinates
        : getSnakeWithoutStub(state.snake);

      const snackCoordinate = isSnakeEating
        ? getRandomCoordinate()
        : state.snack.coordinate;

      return {
        ...state,
        snake: {
          coordinates: [snakeHead, ...snakeTail],
        },
        snack: {
          coordinate: snackCoordinate,
        },
      };
    case 'GAME_OVER':
      return {
        ...state,
        playground: {
          ...state.playground,
          isGameOver: true,
        },
      };
    default:
      throw new Error();
  }
};
// Game starts with snake moving right, Can't start game immediatley dead
const initialState = {
  playground: {
    direction: directions.RIGHT,
    isGameOver: false,
  },
  snake: {
    coordinates: [getRandomCoordinate()],
  },
  snack: {
    coordinate: getRandomCoordinate(),
  },
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
// Handling directional inputs
  const onChangeDirection = event => {
    if (controls[event.keyCode]) {
      dispatch({
        type: 'SNAKE_CHANGE_DIRECTION',
        direction: controls[event.keyCode],
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener('keyup', onChangeDirection, false);

    return () =>
      window.removeEventListener('keyup', onChangeDirection, false);
  }, []);
// Each tick checks state of Snake, if game over or still moving
  React.useEffect(() => {
    const onTick = () => {
      getIsSnakeOutside(state.snake) || getIsSnakeClumsy(state.snake)
        ? dispatch({ type: 'GAME_OVER' })
        : dispatch({ type: 'SNAKE_MOVE' });
    };

    const interval = setInterval(onTick, speed);

    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="app">
      
      <h1>Game Over = Hire me</h1>
      <Grid
        snake={state.snake}
        snack={state.snack}
        isGameOver={state.playground.isGameOver}
      />
    </div>
  );
};

const Grid = ({ isGameOver, snake, snack }) => (
  <div>
    {grid.map(y => (
      <Row
        y={y}
        key={y}
        snake={snake}
        snack={snack}
        isGameOver={isGameOver}
      />
    ))}
  </div>
);

const Row = ({ isGameOver, snake, snack, y }) => (
  <div className="grid-row">
    {grid.map(x => (
      <Cell
        x={x}
        y={y}
        key={x}
        snake={snake}
        snack={snack}
        isGameOver={isGameOver}
      />
    ))}
  </div>
);

const Cell = ({ isGameOver, snake, snack, x, y }) => (
  <div className={getCellCs(isGameOver, snake, snack, x, y)} />
);

export default App;
