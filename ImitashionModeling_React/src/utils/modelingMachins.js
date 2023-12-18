
import modelingTime from "./modelingTime";



function modelingMachins(mathWaitDumpTrack, mathWaitRepairDumpTrack, mathWaitBuldoser, mathWaitRepairBuldoser) {


    const timeWorkDumpTrack = modelingTime(mathWaitDumpTrack);
    const timeRepairDumpTruck = modelingTime(mathWaitRepairDumpTrack);
    const timeWorkBuldoser = modelingTime(mathWaitBuldoser);
    const timeRepairBuldoser = modelingTime(mathWaitRepairBuldoser);




    let earnedPerDay = 0;
    let lossPerDay = 0;

    const timeWorkDay = 16;

    const modelTimeDumpTrack = [];
    const modelTiemeBuldoser = [];


    const dumpTruckStatus = [];
    const buldoserStatus = [];

    let timeDumpTrack = timeWorkDay;
    let timeBuldoser = timeWorkDay;



    function allTimeForOneMachine(array) {
        return (array.reduce((a, b) => a + b, 0));
    }


    while ((timeDumpTrack > 0) && (timeBuldoser > 0)) {


        timeDumpTrack = timeDumpTrack - timeWorkDumpTrack;
        if (timeDumpTrack < 0) { break }
        modelTimeDumpTrack.push(timeWorkDumpTrack);
        earnedPerDay += (timeWorkDumpTrack * 1500);
        dumpTruckStatus.push('Работает');

        timeBuldoser = timeBuldoser - timeWorkBuldoser;
        if (timeBuldoser < 0) { break }
        modelTiemeBuldoser.push(timeWorkBuldoser);
        earnedPerDay += (timeWorkBuldoser * 1300);
        buldoserStatus.push('Работает');



        if (allTimeForOneMachine(modelTimeDumpTrack) > allTimeForOneMachine(modelTiemeBuldoser)) {

            timeBuldoser = timeBuldoser - timeRepairBuldoser;

            if (timeBuldoser < 0) { break }

            modelTiemeBuldoser.push(timeRepairBuldoser);
            lossPerDay += (timeRepairBuldoser * 1300);
            buldoserStatus.push('Ремонт');






            if (allTimeForOneMachine(modelTiemeBuldoser) - allTimeForOneMachine(modelTimeDumpTrack) > 0) {
                timeDumpTrack = timeDumpTrack - (allTimeForOneMachine(modelTiemeBuldoser) - allTimeForOneMachine(modelTimeDumpTrack));

                if (timeDumpTrack < 0) { break }
                modelTimeDumpTrack.push(allTimeForOneMachine(modelTiemeBuldoser) - allTimeForOneMachine(modelTimeDumpTrack));
                lossPerDay += ((allTimeForOneMachine(modelTiemeBuldoser) - allTimeForOneMachine(modelTimeDumpTrack)) * 1500);
                dumpTruckStatus.push('Простой');
            }

            timeDumpTrack = timeDumpTrack - timeRepairDumpTruck;

            if (timeDumpTrack < 0) { break }

            modelTimeDumpTrack.push(timeRepairDumpTruck);
            lossPerDay += (timeRepairDumpTruck * 1500);
            dumpTruckStatus.push('Ремонт');

        }
        else {
            timeDumpTrack = timeDumpTrack - timeRepairDumpTruck;

            if (timeDumpTrack < 0) { break }

            modelTimeDumpTrack.push(timeRepairDumpTruck);
            lossPerDay += (timeRepairDumpTruck * 1500);
            dumpTruckStatus.push('Ремонт');



            timeBuldoser = timeBuldoser - (allTimeForOneMachine(modelTimeDumpTrack) - allTimeForOneMachine(modelTiemeBuldoser));

            if (timeBuldoser < 0) { break }

            if ((allTimeForOneMachine(modelTimeDumpTrack) - allTimeForOneMachine(modelTiemeBuldoser) > 0)) {
                modelTiemeBuldoser.push(allTimeForOneMachine(modelTimeDumpTrack) - allTimeForOneMachine(modelTiemeBuldoser));
                lossPerDay += ((allTimeForOneMachine(modelTimeDumpTrack) - allTimeForOneMachine(modelTiemeBuldoser)) * 1300);
                buldoserStatus.push('Простой');
            }


            timeBuldoser = timeBuldoser - timeRepairBuldoser;


            if (timeBuldoser < 0) { break }

            modelTiemeBuldoser.push(timeRepairBuldoser);
            lossPerDay += (timeRepairBuldoser * 1300);
            buldoserStatus.push('Ремонт');

        }
    }
   

        if (allTimeForOneMachine(modelTiemeBuldoser) < timeWorkDay) {
            while ((timeBuldoser > 0)) {
              
                if ((buldoserStatus[buldoserStatus.length-1] === 'Работает') || (buldoserStatus[buldoserStatus.length-1] === 'Простой')) {
                timeBuldoser = timeBuldoser - timeRepairBuldoser;
                
                if (timeBuldoser < 0) { break }
                lossPerDay = (timeRepairBuldoser * 1300);
                modelTiemeBuldoser.push(timeRepairBuldoser);
                buldoserStatus.push('Ремонт');
            }
            else{
                timeBuldoser = timeBuldoser - timeWorkBuldoser;
                if (timeBuldoser < 0) { break }
                modelTiemeBuldoser.push(timeWorkBuldoser);
                buldoserStatus.push('Работает');
                timeBuldoser = timeBuldoser - timeRepairBuldoser;
                earnedPerDay += (timeWorkBuldoser * 1300);
            }
    
        }
    }




    if (allTimeForOneMachine(modelTimeDumpTrack) < timeWorkDay) {
        while ((timeDumpTrack > 0)) {

            if ((dumpTruckStatus[dumpTruckStatus.length-1] === 'Работает') || (dumpTruckStatus[dumpTruckStatus.length-1] === 'Простой')) {
            timeDumpTrack = timeDumpTrack - timeRepairDumpTruck;
            if (timeDumpTrack < 0) { break }
            lossPerDay = (timeRepairDumpTruck * 1500);
            modelTimeDumpTrack.push(timeRepairDumpTruck);
            dumpTruckStatus.push('Ремонт');
        }
        else {
                timeDumpTrack = timeDumpTrack - timeWorkDumpTrack;
                if (timeDumpTrack < 0) { break }
                modelTimeDumpTrack.push(timeWorkDumpTrack);
                dumpTruckStatus.push('Работает');
                earnedPerDay += (timeWorkDumpTrack * 1500);
        }
    }



    }

    if (allTimeForOneMachine(modelTimeDumpTrack) < timeWorkDay) {
        let endPart = timeWorkDay - allTimeForOneMachine(modelTimeDumpTrack);
        modelTimeDumpTrack.push(endPart);


        if ((dumpTruckStatus[dumpTruckStatus.length-1] === 'Работает') || (dumpTruckStatus[dumpTruckStatus.length-1] === 'Простой')) {
            lossPerDay += (endPart * 1500);
            dumpTruckStatus.push('Ремонт');
        }
        else {
            earnedPerDay += (endPart * 1500);
            dumpTruckStatus.push('Работает');
        }
    }

    if (allTimeForOneMachine(modelTiemeBuldoser) < timeWorkDay) {

        let endPart = timeWorkDay - allTimeForOneMachine(modelTiemeBuldoser);
        modelTiemeBuldoser.push(endPart);


        if ((buldoserStatus[buldoserStatus.length-1] === 'Работает') || (buldoserStatus[buldoserStatus.length-1] === 'Простой')) {
            lossPerDay += (endPart * 1300);
            buldoserStatus.push('Ремонт');
        }
        else {
            earnedPerDay += (endPart * 1300);
            buldoserStatus.push('Работает');
        }

    }


 //   console.log(allTimeForOneMachine(modelTimeDumpTrack));
 //   console.log(dumpTruckStatus);
 //   console.log(modelTimeDumpTrack);
 //   console.log(allTimeForOneMachine(modelTiemeBuldoser));
 //    console.log(buldoserStatus);
 //   console.log(modelTiemeBuldoser);





    const dayResult = {
        dumpTruckStatus: dumpTruckStatus,
        modelTimeDumpTrack: modelTimeDumpTrack,
        buldoserStatus: buldoserStatus,
        modelTiemeBuldoser: modelTiemeBuldoser,
        earnedPerDay: earnedPerDay,
        lossPerDay: lossPerDay

    }



 //  console.log('');
 //   console.log(`Заработанно : ${earnedPerDay} Потрачено : ${lossPerDay} Разница ${earnedPerDay - lossPerDay}`);

    return (dayResult);

}

export default modelingMachins;