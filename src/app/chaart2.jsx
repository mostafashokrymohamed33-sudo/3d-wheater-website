"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent(prop) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if(Object.keys(prop.days).length===0) return ;
    console.log(prop.days);
    console.log(";;");


    const alldataui =prop.days.filter(([key,value])=>key!="time").map(([key,value],i)=>{
        return {
            label: key,
            data: value,
            borderWidth: 3,
            tension: 0.4,
            borderColor: getComputedStyle(document.documentElement).getPropertyValue("--clr1").trim(),
            pointRadius:0,
            hidden:i!=0,
          }
    })


    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartRef.current.height = 500;
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: prop?.time,
        datasets:[...alldataui],
      },
      options: {
        responsive: true,

        plugins: {
          responsive:true, 
          maintainAspectRatio: false,
          legend: {
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue("--clr1").trim(),      // ← الليجند labels
            },
          },
          tooltip: {
            titleColor: "white",
            bodyColor: "white",
            footerColor: "white",
          },
        },

        scales: {
          x: {
            ticks: {
              color: "white",      // ← لون الأيام (Sat .. Fri)
            },
            grid: {
              color: "rgba(255, 255, 255, 0.23)", // ← grid خفيفة
            },
          },

          y: {
            ticks: {
              color: "white",      // ← أرقام مقياس Y
            },
            grid: {
              color: "rgba(255,255,255,0.2)",
            },
          },
        },
      },
    });

    
    const handleResize = () => {
        chartInstance.current.resize();
        chartRef.current.height = 10;
    };
        chartRef.current.height = 10;
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    },[prop]);
    
  return (
    <div  >
      <canvas ref={chartRef} style={{width:"100%",display:"block",maxHeight:"500px"}}  />
    </div>
  );
}
