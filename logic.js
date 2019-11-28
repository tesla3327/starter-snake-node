const distance = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

const closestPoint = (a, points) => {
  const distances = points
    .map(point => distance(a, point))
    .map(({ x, y }) => Math.abs(x) + Math.abs(y));

  let closest = 0;
  for (let i = 0; i < distances.length; i++) {
    if (distances[i] < distances[closest]) {
      closest = i;
    }
  }

  return points[closest];
};

const moveTowardsFood = (food, head) => {
  const closestFood = closestPoint(head, food);
  const delta = distance(head, closestFood);

  // Move towards the food
  return {
    x: delta.x !== 0 ? delta.x * -1 : 0,
    y: delta.y !== 0 ? delta.y * -1 : 0,
  };
};

const fromEuclid = ({ x, y }) => {
  if (x === 1) {
    return 'right';
  } else if (x === -1) {
    return 'left';
  } else if (y === 1) {
    return 'up';
  } else if (y === -1) {
    return 'down';
  }
};

// Return valid moves to avoid a wall
const avoidWalls = (head, boardSize) => {
  return [
    head.y > 0 ? 'up' : undefined,
    head.x < boardSize - 1 ? 'right' : undefined,
    head.y < boardSize - 1 ? 'down' : undefined,
    head.x > 0 ? 'left' : undefined,
  ].filter(move => move !== undefined);
};

let previous = 'down';

const move = ({ board, you }) => {
  // Keep moving in a straight line
  let move = previous;

  console.log(board);
  console.log(you);
  console.log(previous);

  // Move towards food if we can
  if (board.food.length > 0) {
    const foodMove = moveTowardsFood(board.food, you.body[0]);
    console.log('Towards food');
    console.log(foodMove);
    move = fromEuclid(foodMove);
  } else {
    // Avoid walls generally
    const validMoves = avoidWalls(you.body[0], board.width).includes(move);
    move = validMoves.includes(move) || validMoves[0];
  }

  console.log(move);

  previous = move;
  return move;
};

module.exports = {
  move,
  moveTowardsFood,
  distance,
  closestPoint,
  avoidWalls,
  fromEuclid,
};
