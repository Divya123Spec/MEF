import React from 'react';
import { createRoot } from 'react-dom/client';
import Sample from './Sample';

export default function mount(container) {
  const root = createRoot(container);
  root.render(<Sample />);
}
