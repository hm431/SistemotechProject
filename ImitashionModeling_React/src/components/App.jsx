import Simulation from '../utils/Simulation';
import React, { useEffect } from 'react';

import Grath from "./Grath";

import FormIntegration from './FormIntegration';

function App() {

  
  //const modelOfOneDay = modelingMachins(2, 1.5, 3, 0.5);
 /// console.log(modelOfOneDay);
  //const states = modelOfOneDay.buldoserStatus;
  //const times = modelOfOneDay.modelTiemeBuldoser;
 // <div>{modelingForIteration(10000)}</div>
 
  let newSimulation = new Simulation;
  newSimulation.modelOneDay(1.5, 0.5);
  return (
    <div className="App">
      <h1>График состояний машины</h1>
      
      <FormIntegration/>
    </div>
  );
}


export default App;
//<Grath states={states} times={times} /> 