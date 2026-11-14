import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {AuthProvider} from './AuthContext.tsx';
import {PrivacyChoices} from '../features/privacy/PrivacyChoices';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <PrivacyChoices />
    </AuthProvider>
  </StrictMode>,
);
