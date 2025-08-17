import { useEffect, useState } from 'react';

type Prop = {
  time: number;
  onTick?: (secondsLeft: number) => void;
};

export default function Timer({ time, onTick }: Prop) {
  const [totalSeconds, setTotalSeconds] = useState(time);

  useEffect(() => {
    if (totalSeconds <= 0) {
      setTotalSeconds(time);
    }

    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, time]);

  useEffect(() => {
    onTick?.(totalSeconds);
  }, [totalSeconds, onTick]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  const counterLabel = `${paddedHours} hours ${paddedMinutes} minutes ${paddedSeconds} seconds`;

  return (
    <main className=''>
      <div
        className='grid grid-flow-col gap-5 text-center auto-cols-max p-2 justify-center'
        aria-label={counterLabel}
      >
        <div className='flex flex-col p-2 bg-black rounded-md text-neutral-content text-white md:text-7xl text-3xl'>
          <span className='countdown font-mono md:text-9xl text-5xl'>
            <span
              style={
                {
                  '--value': paddedHours,
                } as React.CSSProperties
              }
              aria-live='polite'
              aria-label={`${paddedHours} hours`}
            >
              {paddedHours}
            </span>
          </span>
          hours
        </div>
        <div className='flex flex-col p-2 bg-black rounded-md text-neutral-content text-white md:text-7xl text-3xl'>
          <span className='countdown font-mono md:text-9xl text-5xl'>
            <span
              style={
                {
                  '--value': paddedMinutes,
                } as React.CSSProperties
              }
              aria-live='polite'
              aria-label={`${paddedMinutes} minutes`}
            >
              {paddedMinutes}
            </span>
          </span>
          min
        </div>
        <div className='flex flex-col p-2 bg-black rounded-md text-neutral-content text-white md:text-7xl text-3xl'>
          <span className='countdown font-mono md:text-9xl text-5xl'>
            <span
              style={
                {
                  '--value': paddedSeconds,
                } as React.CSSProperties
              }
              aria-live='polite'
              aria-label={`${paddedSeconds} seconds`}
            >
              {paddedSeconds}
            </span>
          </span>
          sec
        </div>
      </div>
    </main>
  );
}
