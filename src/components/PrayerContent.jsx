import Prayer from './prayer';
import { Stack } from '@mui/system';
import photo4 from "../images/photo1.webp"
import photo1 from "../images/photo2.jpeg"
import photo3 from "../images/photo3.jpeg"
import photo5 from "../images/photo4.jpeg"
import photo2 from "../images/photo5.jpeg"
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function PrayerContent() {
    const  getTimings=async ()=>{
        const city = "Cairo"; // اسم المدينة
        const country = "Egypt"; // اسم الدولة
        const response=await axios.get( `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`);
        console.log(response.data.data.timings)
        setTimings(response.data.data.timings)
    }
    useEffect(()=>{
        getTimings();
    },[])
    const [timings, setTimings]=useState({
        Fajr: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
    })
    const data=[{
        "id": 1,
        name:"الفجر",
        src: photo1,
        time:timings.Fajr
    },
{
    "id": 2,
    name:"الظهر",
    src: photo2,
    time:timings.Dhuhr
},{  "id": 3,
    name:"العصر",
    src: photo3,
    time:timings.Asr
},
{  "id": 4,
    name:"المغرب",
    src: photo4,
    time:timings.Maghrib
},
{
"id": 5,
name:"العشاء",
src: photo5,
time:timings.Isha
},
]
    var res=data.map((item)=>{
        return(<Prayer key={item.id} src={item.src} name={item.name} time={item.time}/>)
    })
  return (
    <Stack direction="row" justifyContent={"space-between"}>
            
           {res}
            
        </Stack>
  )
}
