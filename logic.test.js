const {
  moveTowardsFood,
  distance,
  closestPoint,
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

