import Statistic from "./Statistic";
import Simulation from "./Simulation";
import Info from "./Info";

export default class Machine {
    constructor(workTime, repairTime, activeProfit, idleDeficit) {
        this.workTime = workTime; // Математическое ожидание продолжительности работы
        this.currentWorkTime = this.workTime;
        this.repairTime = repairTime; // Математичекое ожидание продолжительности ремонта
        this.currentRepairTime = this.repairTime;
        this.activeProfit = activeProfit; // Прибыль за час в активном состоянии
        this.deficit = idleDeficit; // Убыток за час в простое/ремонта
        this.machineState = 0; // 0 - Working, 1 - Repair, 2 - Idle 
     //   this.garage = Simulation.isGarageFree;
        this.statistic = new Statistic;
    }

    temp(timePassed) {
        let res = 0;
        switch (this.machineState) {
            case (0):
                if (this.currentWorkTime > timePassed) {
                    res = this.activeProfit * timePassed

                    this.currentWorkTime -= timePassed

                    this.statistic.pushInfo(new Info(0, timePassed))
                }
                else {
                    this.currentWorkTime= this.currentWorkTime.toFixed(4)
                    res = this.currentWorkTime * this.activeProfit
                    let timeLeft = timePassed - this.currentWorkTime
                    this.statistic.pushInfo(new Info(0, this.currentWorkTime))
                    this.currentWorkTime = 0
                    this.currentRepairTime = this.repairTime;
                    if (Simulation.isGarageFree) {
                        Simulation.isGarageFree = false;
                        this.machineState = 1;
                        res += -1 * timeLeft * this.deficit;
                        this.currentRepairTime -= timeLeft;
                        this.statistic.pushInfo(new Info(1, timeLeft))
                    }
                    else {
                        this.machineState = 2;
                        res += -1 * timeLeft * this.deficit;
                        this.statistic.pushInfo(new Info(2, timeLeft))

                    }
                }



                break
            case (1):
                if (this.currentRepairTime > timePassed) {
                    res = (this.deficit * timePassed) * -1;
                    this.currentRepairTime -= timePassed
                    this.statistic.pushInfo(new Info(1, timePassed))
                }
                else {
                    this.currentRepairTime= this.currentRepairTime.toFixed(4); //Округление плавающей точки создают проблемы. Это их решает
                    res = -1 * this.currentRepairTime * this.deficit;
                    let timeLeft = timePassed - this.currentRepairTime;
                    this.statistic.pushInfo(new Info(1, this.currentRepairTime));
                    this.currentRepairTime = 0;

                    Simulation.isGarageFree = true;
                    this.currentWorkTime = this.workTime;
                    this.machineState = 0;
                    res += timeLeft * this.activeProfit;
                    this.currentWorkTime -= timeLeft;
                    this.statistic.pushInfo(new Info(0, timeLeft));
                }
                

                break
            case (2):

                res = (this.deficit * timePassed) * -1;
                this.statistic.pushInfo(new Info(2, timePassed))

                if (Simulation.isGarageFree) {
                    this.machineState = 1;
                }
                break
        }
        return (res);
    }








}