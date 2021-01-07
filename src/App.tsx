import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import WebMidi from 'webmidi'


(window as any).WebMidi = WebMidi
function App() {

  // Enable WebMidi.js
  WebMidi.enable(function (err) {

    if (err) {
      console.log('1', "WebMidi could not be enabled.", err);
    }

    // Viewing available inputs and outputs
    console.log('2', WebMidi.inputs);
    console.log('3', WebMidi.outputs);

    // Reacting when a new device becomes available
    WebMidi.addListener("connected", function (e) {
      console.log('4', e);
      if (e.port.type === "output") {
        e.port.playNote("C3")
      }
    });

    // Reacting when a device becomes unavailable
    WebMidi.addListener("disconnected", function (e) {
      console.log('5', e);
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
