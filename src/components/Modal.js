import React from 'react';
import './Modal.css';

const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-heading">Welcome to Shortest Path Finder Visualizer</h2>
        <p>
          This visualizer allows you to find the shortest path between two points.
        </p>
        <h3>Instructions:</h3>
        <ol>
          <li>Click on a cell to set the start point.</li>
          <li>Click on another cell to set the end point.</li>
          <li>Drag mouse to create walls.</li>
          <li>Click "Visualize Dijkstra Algorithm" to see the shortest path.(Basically BFS)</li>
          <li>Click "Reset" to start over.</li>
        </ol>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
};

export default Modal;
