import React, { useState, useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Tasks from './components/Tasks';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Provider store={store}>
      <Tasks />
    </Provider>
  );
}

export default App;
