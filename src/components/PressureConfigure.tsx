import React, { useState, useEffect } from 'react';
import './PressureConfigure.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

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

    const [pressureReading, setPressureReading] = useState<number>(-1);
    
    const sliderMaxTime = 60;
    const sliderMaxPressure = 10;
    
    const options = {
      type: 'line',
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
    type: 'line',
    datasets: [
      {
        label: 'Pressure (bar)',
        data: actualData,
        //data: [{x: 0, y: 1}, {x: 5, y: 6}, {x: 7, y: 8}, {x: 9, y: 5}],
        borderColor: 'rgb(240, 248, 255)',
        backgroundColor: 'rgb(240, 248, 255)',
      },
    ],
  };
  
  const socket = io("http://localhost:3123");
  // A socket connecting to a server running on port 3123.
  // All communication to and from the espresso machine micro controller will go through this socket.

  const handleSendButton = () => {
    const dataMessage = {
      timeOne: timeSliderOne,
      pressureOne: pressureSliderOne,
      timeTwo: timeSliderTwo,
      pressureTwo: pressureSliderTwo,
      timeThree: timeSliderThree,
      pressureThree: pressureSliderThree
    }
    // dataMessage is an object containing all of the time and pressure information.

    socket.emit("send_to_back_end", dataMessage);
    // Send configuration to the micro controller when the user presses the "Send to machine" button.
  }
  
  const handleCancelButton = () => {
    // currently not in use.
  }

  useEffect(() =>{
    socket.on("send_to_front_end", (reading: number) =>{
        setPressureReading(reading);
    });
  }, [socket]);
  // When the micro controller sends data to the front end using the "send_to_front_end" event, it will be interpreted as a number and put into setPressureReading.
  // This will update the pressureReading state every time the micro controller sends a new value to the front end.
  // The purpose of this is for displaying the pressure over time during the process of an actual brew.
  // Currently just a number, but this can be adjusted to send an object with a timestamp along side it for easy graphing.
  
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
            <div>Puration: {timeSliderOne} seconds</div>
            <Slider min={0} max={sliderMaxTime} onChange={setTimeSliderOne} value={timeSliderOne} stepSize={1} labelStepSize={sliderMaxTime}></Slider>
            <br />
            <div>Pressure: {pressureSliderOne} bar</div>
            <Slider min={0} max={sliderMaxPressure} onChange={setPressureSliderOne} value={pressureSliderOne} stepSize={1} labelStepSize={sliderMaxPressure}></Slider>
          </div>
        </div>

        <div className="options-panel">
        <div className="header">2: rinse and hold</div>
        <div className="options-panel-section">
            <div>Duration: {timeSliderTwo} seconds</div>
            <Slider min={0} max={sliderMaxTime} onChange={setTimeSliderTwo} value={timeSliderTwo} stepSize={1} labelStepSize={sliderMaxTime}></Slider>
            <br />
            <div>Pressure: {pressureSliderTwo} bar</div>
            <Slider min={0} max={sliderMaxPressure} onChange={setPressureSliderTwo} value={pressureSliderTwo} stepSize={1} labelStepSize={sliderMaxPressure}></Slider>
          </div>
        </div>

        <div className="options-panel">
        <div className="header">3: decline</div>
          <div className="options-panel-section">
              <div>Duration: {timeSliderThree} seconds</div>
              <Slider min={0} max={sliderMaxTime} onChange={setTimeSliderThree} value={timeSliderThree} stepSize={1} labelStepSize={sliderMaxTime}></Slider>
              <br />
              <div>Pressure: {pressureSliderThree} bar</div>
              <Slider min={0} max={sliderMaxPressure} onChange={setPressureSliderThree} value={pressureSliderThree} stepSize={1} labelStepSize={sliderMaxPressure}></Slider>
            </div>
          </div>
      </div>
      <div className="footer">
      {/*<div><Button fill intent='primary' onClick={handleCancelButton}>{pressureReading}</Button></div>*/}
      <div><Button fill intent='primary' onClick={handleSendButton}>Send to machine</Button></div>
      </div>
    </div>
  );
}

export default PressureConfigure;
