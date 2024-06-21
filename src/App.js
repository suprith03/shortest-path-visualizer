import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import './App.css';
import Modal from './components/Modal';

const NUM_ROWS = 20;
const NUM_COLS = 45;

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: false,
    isEnd: false,
    isWall: false,
    isVisited: false,
    isPath: false,
    distance: Infinity,
    previousNode: null,
    stepNumber: null,
  };
};

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const App = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const initialGrid = createGrid();
    setGrid(initialGrid);
  }, []);

  const handleNodeClick = (node) => {
    if (!startNode) {
      node.isStart = true;
      setStartNode(node);
    } else if (!endNode) {
      node.isEnd = true;
      setEndNode(node);
    } else {
      node.isWall = !node.isWall;
    }
    setGrid([...grid]);
  };

  const visualizeDijkstra = () => {
    if (!startNode || !endNode) return;
    const newGrid = [...grid];
    const visitedNodesInOrder = dijkstra(newGrid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.isVisited = true;
        setGrid((prevGrid) => [...prevGrid]);
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        node.isPath = true;
        node.stepNumber = i + 1;
        setGrid((prevGrid) => [...prevGrid]);
      }, 100 * i);
    }
  };

  const resetGrid = () => {
    const newGrid = createGrid();
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      {showModal && <Modal onClose={closeModal} />}
      <nav className="navbar">
        <h1 className="navbar-heading" onClick={resetGrid}>Shortest Path Finder Visualizer</h1>
      </nav>
      <div className="grid-container">
        <Grid grid={grid} onNodeClick={handleNodeClick} />
      </div>
      <div className="buttons">
        <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
        <button onClick={resetGrid}>Reset</button>
      </div>
    </div>
  );
};

export default App;
