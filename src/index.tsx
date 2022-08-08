// CSS imported here will be bundled by webpack
import './index.css';

// You can import any components here
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/app/app';

// You can import any components here

ReactDOM.render(<App />, document.getElementById('root'));
