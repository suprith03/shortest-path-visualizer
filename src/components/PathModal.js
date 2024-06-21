import React from 'react';
import './Modal.css';

const PathModal = ({ onClose, pathNodes }) => {
  const pathLength = pathNodes.length ; 

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-heading">Shortest Path Found!</h2>
        <p>
          The shortest path from the start to the end node has {pathLength} nodes
        </p>
        <button onClick={onClose}>ok!</button>
      </div>
    </div>
  );
};

export default PathModal;
