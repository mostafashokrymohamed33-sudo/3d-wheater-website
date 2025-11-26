"use client";

import { useEffect, useRef } from "react";
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
  const allhouredata =prop.hours.filter(([key,valu])=>{return key !== "time"}).map(([key,value],i)=>{
    return {
            label: key,
            data: value,
            borderWidth: 3,
            tension: 0.4,
            borderColor: "rgba(255, 255, 255, 0.68)",
            pointRadius:0,
            hidden:i!==0
          }
  })

  useEffect(() => {
    if (!prop.hours || prop.hours.length === 0) return ;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: prop.hours[0][1],
        datasets:allhouredata
      },
      options: {
        responsive: true,

        plugins: {
          responsive:true, 
          maintainAspectRatio: false,
          legend: {
            labels: {
              color: "white",      // ← الليجند labels
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
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        window.removeEventListener("resize",handleResize);
      }
    };
  }, [allhouredata]);

  return (
    <div >
      <canvas ref={chartRef} style={{width:"100%",display:"block",minHeight:"500px"}}  height={490}/>
    </div>
  );
}
