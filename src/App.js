import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Modal from './components/Modal';
import PathModal from './components/PathModal';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import './App.css';

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
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showPathModal, setShowPathModal] = useState(false);
  const [pathNodes, setPathNodes] = useState([]);

  useEffect(() => {
    const initialGrid = createGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (node) => {
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
    setIsMousePressed(true);
  };

  const handleMouseEnter = (node) => {
    if (!isMousePressed) return;
    if (!startNode || !endNode || node.isStart || node.isEnd) return;
    node.isWall = true;
    setGrid([...grid]);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
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
        setGrid([...grid]);
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    const pathNodesCopy = [...nodesInShortestPathOrder];
    for (let i = 0; i < pathNodesCopy.length; i++) {
      setTimeout(() => {
        const node = pathNodesCopy[i];
        node.isPath = true;
        node.stepNumber = i + 1;
        setGrid([...grid]);
        if (i === pathNodesCopy.length - 1) {
          setTimeout(() => {
            setShowPathModal(true);
            setPathNodes(pathNodesCopy);
          }, 1000); 
        }
      }, 100 * i);
    }
  };

  const closeIntroModal = () => {
    setShowIntroModal(false);
  };

  const closePathModal = () => {
    setShowPathModal(false);
  };

  const resetGrid = () => {
    const newGrid = createGrid();
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
    // setShowIntroModal(true);
    setShowPathModal(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="navbar-heading" onClick={resetGrid}>Shortest Path Finder Visualizer</h1>
      </nav>
      <div className="grid-container">
        <Grid
          grid={grid}
          onNodeClick={handleMouseDown}
          onNodeEnter={handleMouseEnter}
          onNodeUp={handleMouseUp}
        />
      </div>
      <div className="buttons">
        <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
        <button onClick={resetGrid}>Reset</button>
      </div>
      {showIntroModal && <Modal onClose={closeIntroModal} />}
      {showPathModal && <PathModal onClose={closePathModal} pathNodes={pathNodes} />}
      {(showIntroModal || showPathModal) && <div className="overlay"></div>}
    </div>
  );
};

export default App;
