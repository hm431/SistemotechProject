// Импортировать необходимые компоненты из библиотеки react-vis и хуки из React
import React, { useState, useEffect } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  DiscreteColorLegend,
} from "react-vis";

// Определить функцию компонента, которая принимает пропсы states и times
function Grath({ states, times }) {
  // Создать и обновить состояние data, которое будет хранить массив объектов для графика
  const [data, setData] = useState([]);

  // Определить функцию, которая преобразует входные массивы в массив объектов и построит компонент графика
  function buildChart() {
    // Создать массив объектов, где каждый объект содержит время и состояние машины, а также соответствующий цвет
    // Для этого можно использовать функцию map или цикл for
    // Здесь используется функция map
    const data = states.map((state, index) => {
      // Определить цвет для каждого состояния
      // Можно использовать любые цвета, которые нравятся
      // Здесь используются зеленый, желтый и красный
      let color;
      if (state === "Работает") {
        color = "green";
      } else if (state === "Простой") {
        color = "yellow";
      } else if (state === "Ремонт") {
        color = "red";
      }

      // Вернуть объект, содержащий время, состояние и цвет
      return {
        x: index + 1, // Номер интервала
        y: times[index], // Время в интервале
        label: state, // Состояние машины
        color: color, // Цвет столбца
      };
    });

    // Обновить состояние data с новым массивом объектов
    setData(data);
  }

  // Использовать хук useEffect для вызова функции преобразования и построения графика при изменении пропсов states и times или при первом рендеринге компонента
  useEffect(() => {
    buildChart();
  }, [states, times]);

  // Создать массив легенды, содержащий названия и цвета состояний
  // Можно использовать тот же порядок, что и в массиве states, или любой другой
  const legend = [
    { title: "Работает", color: "green" },
    { title: "Простой", color: "yellow" },
    { title: "Ремонт", color: "red" },
  ];

  // Вернуть компонент графика, используя компоненты XYPlot, XAxis, YAxis, VerticalBarSeries и DiscreteColorLegend
  // Установить нужные параметры для каждого компонента, такие как ширина, высота, масштаб, цвета, подписи и т.д.
  // Передать компоненту графика состояние data и массив legend
  return (
    <div>
      <XYPlot width={500} height={300} xDomain={[0, 6]} yDomain={[0, 25]}>
        <XAxis title="Интервал" />
        <YAxis title="Время (мин)" />
        <VerticalBarSeries
          data={data}
          colorType="literal" // Использовать цвета из состояния data
          barWidth={0.8} // Установить ширину столбцов
        />
      </XYPlot>
      <DiscreteColorLegend
        items={legend} // Использовать массив легенды
        orientation="horizontal" // Установить горизонтальную ориентацию
      />
    </div>
  );
}


export default Grath;
// Отрендерить компонент графика в нужном месте приложения
// Передать ему пропсы states и times

