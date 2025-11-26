'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Three from "./three";
import Three2 from "./three2";
import Three3 from "./three3";
import Three4 from './three4';
import Chaart from "./chaart.jsx";
import Chaart2 from "./chaart2.jsx";
import { useEffect, useState } from "react";

import cities from './conties.jsx';
import { Triodion } from "next/font/google";





export default function Home() {
  const [data,setdata]=useState({});
  let [inf,setInf]=useState([]);
  const [bol,setbol]=useState(true);
  const [days,setdays]=useState({});
  const [hours,sethours]=useState([]);
  const [location,setLocation]=useState("latitude=30.0444&longitude=31.2357");
  const [night,setNght]=useState(true);
  console.log(cities)
  
  useEffect(()=>{
    async function getMainData() {
      console.log("loading")
      const res =await fetch ("https://api.open-meteo.com/v1/forecast?"+location+"&current=temperature_2m,weathercode,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weathercode,relative_humidity_2m,wind_speed_10m,precipitation,cloudcover&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto");
      const dataa = await res.json();
      setdata(dataa);
    }
    getMainData();
  },[location])
  useEffect(()=>{
    console.log(data)
    data.hourly?sethours(Object.entries(data.hourly)):null;
    data.daily?setdays(Object.entries(data.daily)):null;
    if(data.current){
      setInf(Object.entries(data.current))
      setNght(data?.current?.time?.split("T")[1].split(":")[0]>12)
      console.log("kkk")
    }
    
  },[data])

  function handelui (){
    if(data?.current?.weathercode==0){
      document.documentElement.style.setProperty('--clr1',"#fff")
      return (<Three cloud={false} night={night} />)
    }else if(data?.current?.weathercode<=2){
      document.documentElement.style.setProperty('--clr1',"#fff")
      return (<Three cloud={true} night={night} />)
    }else if(data?.current?.weathercode<=48){
      document.documentElement.style.setProperty('--clr1',"#fff")
      return (<Three2 />)
    }else if(data?.current?.weathercode<=82){
      document.documentElement.style.setProperty('--clr1',"#fff")
      return (<Three2 rain={true}  />)
    }else if(data?.current?.weathercode<=86){
      document.documentElement.style.setProperty('--clr1',"black")
      return (<Three3 rain={true}  />)
    }else if(data?.current?.weathercode<=99){
      document.documentElement.style.setProperty('--clr1',"#fff")
      return (<Three4 rain={true}  />)
    }
  }
  return (
    <div className="home-page">
      {handelui()}
      <nav >
        <select onChange={(e)=>setLocation(e.target.value)}>
          {cities.map((item,i)=>{return <option   value={`latitude=${item.latitude}&longitude=${item.longitude}`} key={i}>{item.name} : {item.country}</option>})}
        </select>
      </nav>
      <main className="main">
        <div className="main-inf">
          <div className="main-card">
            <h1>
              {data?.current!== undefined && <div>
                  {data.current.temperature_2m}
                  {data.current_units.temperature_2m}
                  <br/>
              </div>} 
            </h1>
            <div style={{display:"flex",gap:"10px"}}>
              <span>{data?.current?.time?.split("T")[1]}</span>
              <span>{data?.current?.time?.split("T")[0]}</span>
            </div>
            <i>
              {data?.timezone !== undefined &&<span>
                {data.timezone}
              </span>}
            </i> 
          </div>
          {
            inf.map(([value,key],i)=>{
              return<div key={key} className="card">
                <div className="glass"></div>
                <h6>{value}</h6>
                <div>{key}</div>
              </div>
            })
          }
        </div>
        <h1 style={{textAlign:"center"}}>Hourly forecast </h1>
        <section className="chart">
          <div className="glass"></div>
          <Chaart2 time={data?.hourly?.time} days={hours}/>
        </section>
        <section className="chart">
          <Chaart2 time={data?.daily?.time} days={days}/>
        </section>
      </main>


    </div> 
  );
}
