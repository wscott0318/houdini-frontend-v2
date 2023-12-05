import React, { useEffect} from 'react'
import { DigitalLockup } from '../DigitalLockup';
// import { clearInterval } from 'timers';
// import { clearInterval } from 'timers';

interface ProgressProviderProps {
  valueStart: number;
  valueEnd: number;
}

const ProgressProvider = ({valueStart, valueEnd}: ProgressProviderProps) => {
  const [value, setValue] = React.useState(valueStart);
  useEffect(() => {
    const interval = setInterval(() => {
      if (value == valueEnd) {
        clearInterval(interval);
      } else {
        if(valueStart < valueEnd)
          setValue(value => value + 1);
        else
          setValue(value => value - 1);
      }
    }, 5);
    return () => clearInterval(interval);
  }, [value, valueEnd]);

  return (
    <DigitalLockup value={value} status={false}/>
  );
}

export default ProgressProvider;