import React from 'react';
import { ipcRenderer } from 'electron';

function App() {

  const openSecondMonitor = () => {
    ipcRenderer.send('msg',"hello");
    console.log('asas');
  }

  return (
    <div>
      <h1>Hello, Electron!</h1>

      <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
      <button onClick={openSecondMonitor}>Click</button>
    </div>
  )
}

export default App
