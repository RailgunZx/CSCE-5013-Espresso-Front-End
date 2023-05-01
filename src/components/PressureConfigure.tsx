import React from 'react';
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
    Divider
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

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const actualData = [69, 70, 95, 60, 35, 20, 69]

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: actualData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="mainDiv">
        <div className="header">
            Pressure
        </div>
      <Line options={options} data={data} />
      <div className="options-section">

      </div>
      <div className="footer">
      
      </div>
    </div>
  );
}

export default PressureConfigure;
