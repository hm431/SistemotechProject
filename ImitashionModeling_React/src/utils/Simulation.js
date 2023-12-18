import Machine from "./Machine";
import React  from "react";
import { useState } from 'react';



class Simulation {
 /*   constructor(){
      this.isGarageFree = 'true';
    }
  
  changeGarageStatus(bool){
    this.isGarageFree = bool;
  } */

  static isGarageFree = true;

  modelOneDay(buldoserRepairMathWait, dumpTracRepairMathWait) {

    let profitOfDay = 0;
    let lossOfDay = 0;
    let revenueOfDay = 0;

    
  

    let buldoser = new Machine(this.modelingTime(6), this.modelingTime(buldoserRepairMathWait), 1300, 1300);
    let dumpTrac = new Machine(this.modelingTime(4), this.modelingTime(dumpTracRepairMathWait), 1500, 1500);



    const step = 1/60;
    

    for (let time = 0; time <= 16.0; time += step) {
      console.log(Simulation.isGarageFree);
      buldoser.temp(step);
      dumpTrac.temp(step);
    }
    console.log('Бульдозер');
    
    console.log(buldoser.statistic.list);
    console.log('СамоСвал')
    console.log(dumpTrac.statistic.list);

  }
 

  modelingTime(mathWait) { // Вычисление времени по математическому ожиданию
    const time = -1 * mathWait * Math.log(Math.random());
    console.log(time.toFixed(4));
    return (time.toFixed(4));
  }
}
export default Simulation;


