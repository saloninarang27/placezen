import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';
import Header from "../sidebar/Header";
import Sidebar from "../sidebar/Sidebar";
import "./ResultStats.css";

function AdminResultStats() {
  let { Id } = useParams();
  const [y2025, sety2025] = useState(0);
  const [y2024, sety2024] = useState(0);
  const [y2023, sety2023] = useState(0);
  const [y2022, sety2022] = useState(0);
  const [Cse, setCSE] = useState(0);
  const [Ece, setEce] = useState(0);
  const [Ee, setEE] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`http://localhost:5000/student/cal/2021`);
        const response2 = await fetch(`http://localhost:5000/student/cal/2020`);
        const response3 = await fetch(`http://localhost:5000/student/cal/2019`);
        const response4 = await fetch(`http://localhost:5000/student/cal/2018`);
        const response5 = await fetch(`http://localhost:5000/student/calc/CSE`);
        const response6 = await fetch(`http://localhost:5000/student/calc/ECE`);
        const response7 = await fetch(`http://localhost:5000/student/calc/EE`);

        if (
          !response1.ok || !response2.ok || !response3.ok || !response4.ok ||
          !response5.ok || !response6.ok || !response7.ok
        ) {
          throw new Error('Network response was not ok');
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        const data5 = await response5.json();
        const data6 = await response6.json();
        const data7 = await response7.json();

        console.log(data1, data2, data3, data4, data5, data6, data7);

        sety2025(data1);
        sety2024(data2);
        sety2023(data3);
        sety2022(data4);
        setCSE(data5);
        setEce(data6);
        setEE(data7);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (barChartRef.current && pieChartRef.current) {
      const barChartCtx = barChartRef.current.getContext('2d');
      const pieChartCtx = pieChartRef.current.getContext('2d');

      const barChartData = {
        labels: ['2021-2025', '2020-2024', '2019-2023', '2018-2022'],
        datasets: [{
          label: 'Year Wise Placements',
          data: [y2025, y2024, y2023, y2022],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      };

      const pieChartData = {
        labels: ['CSE', 'ECE', 'EE'],
        datasets: [{
          label: 'Branch Wise Statistics',
          data: [Cse, Ece, Ee],
          backgroundColor: [
            'lightgray',
            'lightblue',
            'lightgreen',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      };

      const barChartInstance = new Chart(barChartCtx, {
        type: 'bar',
        data: barChartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                callback: function (value) {
                  return Number.isInteger(value) ? value : ''; // Show only whole numbers
                }
              }
            }
          }
        }
      });

      const pieChartInstance = new Chart(pieChartCtx, {
        type: 'pie',
        data: pieChartData,
        options: {
          responsive: true,
        }
      });

      return () => {
        barChartInstance.destroy();
        pieChartInstance.destroy();
      };
    }
  }, [y2025, y2024, y2023, y2022, Cse, Ece, Ee]);

  const sidebarLinks = [
    { path: `/AdminProfile/${Id}`, label: "Dashboard" },
    { path: `/ResultStats/${Id}`, label: "Statistics" },
    // { path: `/Alumnii/${Id}`, label: "Alumni" },
    { path: "/", label: "Logout" },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={sidebarLinks}
      />

      <h2 style={{marginLeft:"52%"}}>Result Statistics</h2>
      <div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="chart-container">
            <div className="chart" id="bar-chart-container">
              <canvas ref={barChartRef} />
            </div>
            <div className="chart">
              <canvas ref={pieChartRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminResultStats;
