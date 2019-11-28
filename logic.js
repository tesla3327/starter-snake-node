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

let previous = 'up';

const move = ({ turn, board, you }) => {
  // Keep moving in a straight line
  let move = previous;

  // Move towards food if we can
  if (board.food.length > 0) {
    move = fromEuclid(moveTowardsFood(board.food, you.body[0]));
  }

  previous = move;
  return move;
};

module.exports = {
  move,
  moveTowardsFood,
  distance,
  closestPoint,
};
