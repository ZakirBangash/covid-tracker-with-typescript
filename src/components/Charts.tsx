import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { FetchDailyChart } from '../Services/api'
import Grid from '@material-ui/core/Grid';
import './paper.css';
import { covid_types } from '../Types/covid_types';

const Linee: React.FC<covid_types> = (prop) => {
  const [daily, setdaily] = useState<[]>()
  const [load, setload] = useState(false)
  let { country, confirmed, deaths, recovered } = prop;


  useEffect(() => {
    const FetchDailyData = async () => {
      const data = await FetchDailyChart();
      setload(true);
      setdaily(data);
    }

    FetchDailyData();
  }, [])

  const lineChart = (
    <Line data={{
      labels: daily?.map((ind: any) => ind?.reportDate),
      datasets: [
        {
          label: 'Confirmed',
          data: daily?.map((ind: any) => ind?.totalConfirmed),
          fill: false,
          maintainAspectRatio: false,
          lineTension: 0.1,
          responsive: true,
          backgroundColor: 'red',
          borderColor: 'blue',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10

        },
        {
          label: 'Deaths',
          data: daily?.map((ind: any) => ind?.deaths.total),
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'red',
          borderColor: 'red',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 5,
          pointRadius: 1,
          pointHitRadius: 10

        }
      ]
    }} />
  );


  const BarChart = (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [confirmed, recovered, deaths]
          }
        ]
      }}

      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  );


  if (!load) {
    return (

      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {

    return (
      <div className='container'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {country ? BarChart : lineChart}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Linee;