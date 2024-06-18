import React from 'react';
import './Node.css';

const Node = ({ node, onNodeClick }) => {
  const { row, col, isStart, isEnd, isWall, isVisited, isPath, stepNumber } = node;
  const extraClassName = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : isVisited
    ? 'node-visited'
    : isPath
    ? 'node-path'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onClick={onNodeClick}
    >
      {isPath && <span className="step-number">{stepNumber}</span>}
    </div>
  );
};

export default Node;