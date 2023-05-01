import React, { useState } from 'react';
import './PressureConfigure.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import {
    Button,
    FocusStyleManager,
    NumericInput,
    Tag,
    Divider,
    Slider,
    SliderProps
} from "@blueprintjs/core";
  
  FocusStyleManager.onlyShowFocusOnTabs();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const PressureConfigure: React.FC = () => {
  const [timeSliderOne, setTimeSliderOne] = useState<number>(0);
  const [timeSliderTwo, setTimeSliderTwo] = useState<number>(0);
  const [timeSliderThree, setTimeSliderThree] = useState<number>(0);

  const [pressureSliderOne, setPressureSliderOne] = useState<number>(0);
  const [pressureSliderTwo, setPressureSliderTwo] = useState<number>(0);
  const [pressureSliderThree, setPressureSliderThree] = useState<number>(0);

  const sliderMaxTime = 60;
  const sliderMaxPressure = 10;

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grace: '5%'
      },
      x: {
        beginAtZero: true
      }
    },
    tension: 0.2,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Pressure (bar)',
      },
    },
  };

  const labels = [0, timeSliderOne, timeSliderOne + timeSliderTwo, timeSliderOne + timeSliderTwo + timeSliderThree];

  const actualData = [0, pressureSliderOne, pressureSliderTwo, pressureSliderThree]

  const data = {
    labels,
    datasets: [
      {
        label: 'Pressure (bar)',
        data: actualData,
        borderColor: 'rgb(240, 248, 255)',
        backgroundColor: 'rgb(240, 248, 255)',
      },
    ],
  };

  const handleOkButton = () => {
    
  }

  const handleCancelButton = () => {

  }

  return (
    <div className="mainDiv">
        <div className="header">
            Pressure
        </div>
        <div className="graph-container">
          <Line options={options} data={data} />
        </div>
        <hr />
      <div className="options-section">

        <div className="options-panel">
          <div className="header">1: preinfuse</div>
          <div className="options-panel-section">
            <div>duration: {timeSliderOne} seconds</div>
            <Slider min={0} max={sliderMaxTime} onChange={setTimeSliderOne} value={timeSliderOne} stepSize={1} labelStepSize={sliderMaxTime}></Slider>
            <br />
            <div>pressure: {pressureSliderOne} bar</div>
            <Slider min={0} max={sliderMaxPressure} onChange={setPressureSliderOne} value={pressureSliderOne} stepSize={1} labelStepSize={sliderMaxPressure}></Slider>
          </div>
        </div>

        <div className="options-panel">
        <div className="header">2: rinse and hold</div>
        <div className="options-panel-section">
            <div>duration: {timeSliderTwo} seconds</div>
            <Slider min={0} max={sliderMaxTime} onChange={setTimeSliderTwo} value={timeSliderTwo} stepSize={1} labelStepSize={sliderMaxTime}></Slider>
            <br />
            <div>pressure: {pressureSliderTwo} bar</div>
            <Slider min={0} max={sliderMaxPressure} onChange={setPressureSliderTwo} value={pressureSliderTwo} stepSize={1} labelStepSize={sliderMaxPressure}></Slider>
          </div>
        </div>

        <div className="options-panel">
        <div className="header">3: decline</div>
          <div className="options-panel-section">
              <div>duration: {timeSliderThree} seconds</div>
              <Slider min={0} max={sliderMaxTime} onChange={setTimeSliderThree} value={timeSliderThree} stepSize={1} labelStepSize={sliderMaxTime}></Slider>
              <br />
              <div>pressure: {pressureSliderThree} bar</div>
              <Slider min={0} max={sliderMaxPressure} onChange={setPressureSliderThree} value={pressureSliderThree} stepSize={1} labelStepSize={sliderMaxPressure}></Slider>
            </div>
          </div>
      </div>
      <div className="footer">
      <div><Button fill intent='primary' onClick={handleCancelButton}>Cancel</Button></div>
      <div><Button fill intent='primary' onClick={handleOkButton}>Ok</Button></div>
      </div>
    </div>
  );
}

export default PressureConfigure;
