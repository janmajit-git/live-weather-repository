import React,{useEffect, useState} from 'react'

function Datepicker() {
    const date = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const[fullDate,setFullDate] = useState(date.toLocaleString('en-IN', options));
    useEffect(()=>{
        setInterval(() => {
            setFullDate(date.toLocaleString('en-IN', options));
        }, 86400000);
    },[]);
    return (
        <>
           {fullDate}
        </>
      )
}

export default Datepicker
