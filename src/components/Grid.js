import React from 'react';
import Node from './Node';
import './Grid.css';

const Grid = ({ grid, onNodeClick }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => (
            <Node
              key={nodeIdx}
              node={node}
              onNodeClick={() => onNodeClick(node)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;