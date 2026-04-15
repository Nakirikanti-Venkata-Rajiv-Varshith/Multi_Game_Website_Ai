
export const getGoalState = (size) => {
  const arr = Array.from({ length: size * size }, (_, i) => i + 1);
  arr[arr.length - 1] = 0;
  return arr;
};

export const getManhattanDistance = (state, size) => {
  let dist = 0;

  state.forEach((val, i) => {
    if (val === 0) return;

    const targetX = Math.floor((val - 1) / size);
    const targetY = (val - 1) % size;

    const x = Math.floor(i / size);
    const y = i % size;

    dist += Math.abs(x - targetX) + Math.abs(y - targetY);
  });

  return dist;
};

export const getNeighbors = (state, size) => {
  const neighbors = [];

  const zeroIndex = state.indexOf(0);
  const x = Math.floor(zeroIndex / size);
  const y = zeroIndex % size;

  const moves = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [nx, ny] of moves) {
    if (nx >= 0 && ny >= 0 && nx < size && ny < size) {
      const newIndex = nx * size + ny;

      const newState = [...state];
      [newState[zeroIndex], newState[newIndex]] = [
        newState[newIndex],
        newState[zeroIndex],
      ];

      neighbors.push(newState);
    }
  }

  return neighbors;
};

export const shuffle = (state, size, moves = 50) => {
  let newState = [...state];

  for (let i = 0; i < moves; i++) {
    const neighbors = getNeighbors(newState, size);
    newState = neighbors[Math.floor(Math.random() * neighbors.length)];
  }

  return newState;
};


export const aStar = (start, size) => {
  const goal = getGoalState(size).toString();

  const open = new Map();
  const visited = new Set();

  open.set(start.toString(), {
    state: start,
    g: 0,
    h: getManhattanDistance(start, size),
    path: [],
  });

  while (open.size) {
    let currentKey = null;
    let current = null;

    for (let [key, node] of open) {
      if (!current || node.g + node.h < current.g + current.h) {
        current = node;
        currentKey = key;
      }
    }

    open.delete(currentKey);

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (currentKey === goal) return current.path;

    const neighbors = getNeighbors(current.state, size);

    for (let next of neighbors) {
      const key = next.toString();

      if (!visited.has(key)) {
        open.set(key, {
          state: next,
          g: current.g + 1,
          h: getManhattanDistance(next, size),
          path: [...current.path, next],
        });
      }
    }

    if (visited.size > 50000) break;
  }

  return null;
};