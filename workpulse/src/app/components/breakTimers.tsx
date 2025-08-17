'use client';
import { useEffect, useRef, useState } from 'react';
import Timer from './timer';
import { showNotification } from './notification';

type TimerProps = {
  breakInterval: number; // taukoväli minuutteina
  breakLength: Array<number>; // kunkin tauon pituus minuutteina
  breakName: string[]; // kunkin tauon nimi
};

export default function BreakTimers({
  breakInterval,
  breakLength,
  breakName,
}: TimerProps) {
  const sessionStart = useRef(Date.now()); // session aloitushetki
  const indexRef = useRef(0); // monennenko tauon vuoro

  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => getNextBreakSeconds(0));
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(
    breakLength[0] ? breakLength[0] * 60 : 0
  );

  // Laskee seuraavan tauon jäljellä olevat sekunnit kiinteästi
  function getNextBreakSeconds(index: number) {
    const nextBreakTime =
      sessionStart.current + (index + 1) * breakInterval * 60 * 1000;
    return Math.max(0, Math.floor((nextBreakTime - Date.now()) / 1000));
  }

  const currentBreak = breakLength[indexRef.current];

  // Aloita tauko, kun työaika loppuu
  useEffect(() => {
    if (!isBreak && secondsLeft <= 0 && currentBreak !== undefined) {
      showNotification('Break time! ' + (breakName[indexRef.current] ?? ''));
      setIsBreak(true);
      setBreakSecondsLeft(currentBreak * 60);
    }
  }, [secondsLeft, currentBreak, breakName, isBreak]);

  // Lopeta tauko, siirry seuraavaan työjaksoon
  useEffect(() => {
    if (isBreak && breakSecondsLeft <= 0) {
      showNotification('Break over!!');
      setIsBreak(false);
      indexRef.current += 1;

      if (indexRef.current < breakLength.length) {
        setSecondsLeft(getNextBreakSeconds(indexRef.current));
      } else {
        setSecondsLeft(0); // kaikki tauot tehty
      }
    }
  }, [breakSecondsLeft, isBreak, breakLength.length]);

  // Jos kaikki tauot tehty
  if (currentBreak === undefined && !isBreak) {
    return (
      <main className='pt-10 text-center'>
        <h2 className='text-4xl'>
          All breaks completed, a little bit of work left!
        </h2>
      </main>
    );
  }

  return (
    <main className='pt-10 text-center'>
      <h2 className='text-4xl'>
        {isBreak ? 'Break ends in' : 'Next break in'}
      </h2>
      <Timer
        key={`${isBreak ? 'break' : 'work'}-${indexRef.current}`}
        time={isBreak ? currentBreak * 60 : secondsLeft}
        onTick={isBreak ? setBreakSecondsLeft : setSecondsLeft}
      />
    </main>
  );
}
