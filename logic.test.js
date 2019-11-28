const {
  moveTowardsFood,
  distance,
  closestPoint,
  avoidWalls,
} = require('./logic.js');

const origin = {
  x: 0,
  y: 0,
};

const points = [
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 2, y: 0 },
]

describe('avoids walls', () => {
  test('all', () => {
    expect(avoidWalls({ x: 3, y: 5 }, 11)).toEqual([
      'up',
      'right',
      'down',
      'left',
    ]);
  });

  test('up', () => {
    expect(avoidWalls({ x: 3, y: 0 }, 11)).toEqual([
      undefined,
      'right',
      'down',
      'left',
    ]);
  });

  test('right', () => {
    expect(avoidWalls({ x: 10, y: 5 }, 11)).toEqual([
      'up',
      undefined,
      'down',
      'left',
    ]);
  });

  test('down', () => {
    expect(avoidWalls({ x: 3, y: 10 }, 11)).toEqual([
      'up',
      'right',
      undefined,
      'left',
    ]);
  });

  test('left', () => {
    expect(avoidWalls({ x: 0, y: 5 }, 11)).toEqual([
      'up',
      'right',
      'down',
      undefined,
    ]);
  });
});

test('it moves towards the food', () => {
  expect(moveTowardsFood(points, origin)).toEqual({
    x: 0,
    y: 1,
  });
});

test('gets the distance between two points', () => {
  const a = { x: 0, y: 3 };
  const b = { x: 5, y: 4 };

  expect(distance(a, b)).toEqual({
    x: -5,
    y: -1,
  });
});

test('finds the closest point from a set of points', () => {
  expect(closestPoint(origin, points)).toEqual(points[1]);
});

