import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './ui/pages/App';
import { Pacman } from './models/Pacman';

const container = document.getElementById('root');
const root = createRoot(container!);
const pacman = new Pacman({ x: 0, y: 0 }, 40);
root.render(
  <React.StrictMode>
    <App pacman={pacman} />
  </React.StrictMode>,
);
