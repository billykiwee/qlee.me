
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default function Reactdnd() {

function List({ items }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </DndProvider>
  );
}
    return (
        <div>reactdnd</div>
    )
}
