import React from 'react';
import Node from './Node';
import './Grid.css';

const Grid = ({ grid, onNodeClick, onNodeEnter, onNodeUp }) => {
  return (
    <div className="grid" onMouseLeave={onNodeUp}>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => (
            <Node
              key={nodeIdx}
              node={node}
              onMouseDown={() => onNodeClick(node)}
              onMouseEnter={() => onNodeEnter(node)}
              onMouseUp={onNodeUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
