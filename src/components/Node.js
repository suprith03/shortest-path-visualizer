import React from 'react';
import './Node.css';

const Node = ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { isStart, isEnd, isWall, isVisited, isPath, algorithm } = node;

  const extraClassName = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : isPath
    ? `node-path-${algorithm}`
    : isVisited
    ? 'node-visited'
    : '';

  return (
    <div
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default Node;
