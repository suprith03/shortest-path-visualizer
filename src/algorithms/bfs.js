export function bfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();

    // If we encounter a wall, we skip the node.
    if (currentNode.isWall) continue;

    visitedNodesInOrder.push(currentNode);

    // If we've reached the end node, we're done.
    if (currentNode === endNode) return visitedNodesInOrder;

    // Get the unvisited neighbors of the current node and enqueue them.
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }

  return visitedNodesInOrder; // In case no path is found
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
