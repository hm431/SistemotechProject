import modelingMachins from "./modelingMachins";

function modelingForIteration(countOfIteration){

    let profit = 0;

    for(let i = countOfIteration; i>=0; i--){
       let modelDay =  modelingMachins(2, 1.5, 3, 0.5);
       profit += (modelDay.earnedPerDay - modelDay.lossPerDay);
       
    }

    return(profit);
}


export default modelingForIteration;