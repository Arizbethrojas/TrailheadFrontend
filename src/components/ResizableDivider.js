import React from 'react';
import '../styles/ResizableDivider.css'; // Create this CSS file for styling

const ResizableDivider = ({ onDrag, minWidth, maxWidth }) => {
  return (
    <div
      className="resizer"
      onMouseDown={onDrag}
      style={{ cursor: 'ew-resize', width: '5px', backgroundColor: '#ccc' }} // Optional styles
    />
  );
};

export default ResizableDivider;