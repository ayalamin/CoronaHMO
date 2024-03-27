import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { CategoryScale } from 'chart.js'; // Import CategoryScale
// import Chart from 'chart.js';

const LastMonthGraph = () => {
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
        document.head.appendChild(script);
         script.remove();
       
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/month/count`);
                const lastMonthData = await response.json();
                // const jsonData = JSON.stringify(lastMonthData, null, 2);
                console.log("the lastMonthData is: " + lastMonthData);
                debugger;

                const data = {
                    labels: lastMonthData.length > 0 ? lastMonthData.map(day => moment(day.date).format('DD/MM')) : [],
                    datasets: [
                        {
                            label: 'Active Patients',
                            data: lastMonthData.length > 0 ? lastMonthData.map(day => day.active_patients) : [],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }
                    ]
                };
                setChartData(data);
                setIsLoading(false);

                console.log("the data is: " + data);
            } catch (error) {
                console.error('Error:', error);
            }


        };

        fetchData();
    }, []);

    return (
    
        <div>
            <h2>Last Month Active Patients Graph</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ height: '400px', width: '600px' }}>
                    {/* <Line data={chartData} /> */}
                </div>
            )}:
        </div>
    );
};

export default LastMonthGraph;


