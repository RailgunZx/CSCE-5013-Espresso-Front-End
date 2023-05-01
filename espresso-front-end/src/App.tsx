import React from 'react';
import './App.css';
import PressureConfigure from './components/PressureConfigure';


const App: React.FC = () => {

  return (
    <div className="app">
      <div className="main-window">
        <PressureConfigure/>
      </div>
    </div>
  );
}

export default App;
