import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import { getDates, getAverages } from './helpers.js';

export default function ChartContainer({games, highScore, average, seedAverage}) {
  const averages = getAverages(games, seedAverage);

  const data = {
  labels: getDates(games),
  datasets: [
      {
        label: 'Daily Average',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(133,216,56,1)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        data: averages.daily
      },
      {
        label: 'Cumulative Average',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(250,130,76,1)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        data: averages.cumulative
      }
    ]
  };

  var options = {
    legend: {
      display: false
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    global: {
      responsive: true,
      maintainAspectRatio: false,
    },
    scales: {
      xAxes: [{
        type: 'time',
        tooltipFormat: 'MMM DD',
        gridLines: {
          lineWidth: 2
        },
        time: {
          unit: 'week',
          displayFormats: {
            millisecond: 'MMM DD',
            second: 'MMM DD',
            minute: 'MMM DD',
            hour: 'MMM DD',
            day: 'MMM DD',
            week: 'MMM DD',
            month: 'MMM DD',
            quarter: 'MMM DD',
            year: 'MMM DD',
          },
          tooltipFormat: 'MMM DD'
        }
      }],
      yAxes: [{
        display: true,
      }]
    }
  };

  return (
    <div className="horizontal-flex margin-top">
      {averages.daily.length && <div className="chart">
        <Line data={data} options={options} width={600} height={275}/>
      </div>}
      <div className="chart-data">
        <div className="average">
          <div className="data-label">Your Average:</div>
          <div className="jumbo">{Math.round(average)}</div>
        </div>
        <div className="best">
          <div className="data-label">Personal Best:</div>
          <div className="jumbo">{highScore}</div>
        </div>
      </div>
    </div>
  );
}

ChartContainer.propTypes = {
  games: PropTypes.array,
  highScore: PropTypes.number,
  average: PropTypes.number
};
