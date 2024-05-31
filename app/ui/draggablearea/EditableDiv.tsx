'use client';
import React from 'react';

function EditableDiv({ text, setText, onMouseDown, onFocus, onBlur }) {
  const handleChange = (event) => {
    setText(event.target.innerText);
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning={true}
      onInput={handleChange}
      onMouseDown={onMouseDown}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        border: '1px solid black',
        padding: '8px',
        cursor: 'text',
        whiteSpace: 'pre-wrap',
        minHeight: '20px',
      }}
    >
      {text}
    </div>
  );
}

export default EditableDiv;
