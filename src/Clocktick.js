import React, {useEffect, useState} from 'react';


function Clocktick() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000);
  },[])


  return (
    <>
      {time}
    </>
  )
}

export default Clocktick;
