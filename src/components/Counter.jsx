import { useState } from "react"

export default function Counter({ onTotal }) {
  
  const [counter, setCounter] = useState(0);

  console.log('Counter');

  const handleCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);

    if(onTotal){
      onTotal();
    }
  }

  return (
    <button onClick={handleCounter}>Counter: {counter}</button>
  )
}

