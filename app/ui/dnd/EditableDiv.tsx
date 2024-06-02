'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';

type EditableDivProps = {
  text: string;
  textUpdate?:any;
};

const EditableDiv: React.FC<EditableDivProps> = ({ text, textUpdate,...props }) => {
  const [content, setContent] = useState(text);

  useEffect(() => {
    console.log("rerender");
    setContent(text);
  }, [text,content]);

  return (
    <div
      onBlur={textUpdate}
      contentEditable
      suppressContentEditableWarning
      style={{
        cursor: 'text',
        whiteSpace: 'pre-wrap',
        minHeight: '20px',
      }}
      className="text-base focus:border-black outline-none bg-0"
      {...props}
    >
      {content}
    </div>
  );
};

export default EditableDiv;
