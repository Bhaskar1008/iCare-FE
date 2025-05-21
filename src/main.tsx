import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { config } from './config/environment';

// Set document title based on environment
document.title = config.appTitle;

createRoot(document.getElementById('root')!).render(
  <App />
);