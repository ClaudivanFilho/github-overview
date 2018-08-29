import './styles.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRoute } from 'react-router-dom'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import './tachyons.min.css'

ReactDOM.render(
  <BrowserRoute>
    <App />
  </BrowserRoute>,
  document.getElementById('root')
)
registerServiceWorker()
