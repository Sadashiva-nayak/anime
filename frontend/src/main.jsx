import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<GoogleOAuthProvider clientId="198490193981-gnhopmv66o33liuam32tlkun4mn3s91q.apps.googleusercontent.com">
    <App />
</GoogleOAuthProvider>
  </BrowserRouter>
)