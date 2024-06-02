'use client';
import React, { useRef, useState, useEffect } from 'react';

// Function to get the current caret position in a contenteditable div
function getCaretPosition(element: HTMLElement): number {
  let caretOffset = 0;
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }
  return caretOffset;
}

// Function to set the caret position in a contenteditable div
function setCaretPosition(element: HTMLElement, offset: number): void {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  const nodes = Array.from(element.childNodes);
  let currentOffset = 0;

  for (const node of nodes) {
    const textLength = (node.textContent || '').length;
    if (offset <= currentOffset + textLength) {
      const childOffset = offset - currentOffset;
      if (node.childNodes.length === 0) {
        range.setStart(node, childOffset);
        range.setEnd(node, childOffset);
      } else {
        const leaf = getLeafNodeAtOffset(node, childOffset);
        range.setStart(leaf.node, leaf.offset);
        range.setEnd(leaf.node, leaf.offset);
      }
      break;
    }
    currentOffset += textLength;
  }

  selection.removeAllRanges();
  selection.addRange(range);
}

// Function to get the leaf node at a specific offset
function getLeafNodeAtOffset(node: Node, offset: number): { node: Node; offset: number } {
  const nodes = Array.from(node.childNodes);

  for (const child of nodes) {
    const textLength = (child.textContent || '').length;
    if (offset <= textLength) {
      if (child.childNodes.length === 0) {
        return { node: child, offset };
      } else {
        return getLeafNodeAtOffset(child, offset);
      }
    }
    offset -= textLength;
  }

  return { node, offset };
}

type EditableDivProps = {
  text: string;
  setText: (text: string) => void;
  onMouseDown?: any;
  onMouseUp?: any;
};

const EditableDiv: React.FC<EditableDivProps> = ({ text, setText, onMouseDown,onMouseUp, ...props }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(text);

  const handleInput = () => {
    if (contentEditableRef.current) {
      const newContent = contentEditableRef.current.innerHTML;
      setContent(newContent);
      setText(newContent);
    }
  };

  useEffect(() => {
    if (content !== text) {
      setContent(text);
    }
  }, [text]);

  useEffect(() => {
    if (contentEditableRef.current) {
      const caretPosition = getCaretPosition(contentEditableRef.current);
      contentEditableRef.current.innerHTML = content;
      setCaretPosition(contentEditableRef.current, caretPosition + 1); // Move caret to the right
    }
  }, [content]); // Only depend on content, not on every render

  return (
    <div
      ref={contentEditableRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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
