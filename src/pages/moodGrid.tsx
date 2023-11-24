import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/moodgrid.module.css';

interface Moods {
  [key: string]: string;
}

const colors: { [mood: string]: string } = {
  happy: "#ffdf65",
  neutral: "#efefef",
  sad: "#87a2fb",
  excited: "#f7786b",
  angry: "#ff0000",
  anxious: "#f1c5ff",
  tired: "#d7d7d7",
  loved: "#ff9dff",
  lonely: "#b5b5b5",
  stressed: "#ff9d9d",
  sick: "#ff9d9d",
  grateful: "#ffdf65",
};

const MoodGrid: NextPage = () => {
  const [moods, setMoods] = useState<Moods>({});

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const totalSquares = Math.max(daysInMonth, 30); // Adjust grid size based on the month
  const daysArray = Array.from({ length: totalSquares }, (_, index) => index + 1);

  const handleMoodClick = (day: number) => {
    const moodsArray = Object.keys(colors);
    const currentMood = moods[day] || 'neutral'; // Default to 'neutral' if no mood is set
    const currentMoodIndex = moodsArray.indexOf(currentMood);
    const nextMoodIndex = (currentMoodIndex + 1) % moodsArray.length;
    const nextMood = moodsArray[nextMoodIndex];
  
    setMoods({ ...moods, [day]: nextMood });
    localStorage.setItem('monthInPixels', JSON.stringify({ ...moods, [day]: nextMood }));
  };

  const handleMoodInteraction = (day: number) => {
    const moodsArray = Object.keys(colors);
    const currentMood = moods[day] || 'neutral'; // Default to 'neutral' if no mood is set
    const currentMoodIndex = moodsArray.indexOf(currentMood);
    const nextMoodIndex = (currentMoodIndex + 1) % moodsArray.length;
    const nextMood = moodsArray[nextMoodIndex];
  
    setMoods({ ...moods, [day]: nextMood });
    localStorage.setItem('monthInPixels', JSON.stringify({ ...moods, [day]: nextMood }));
  };

  const clearMoods = () => {
    const clearedMoods = {};
    daysArray.forEach(day => {
      clearedMoods[day.toString()] = 'neutral';
    });
    setMoods(clearedMoods);
    localStorage.setItem('monthInPixels', JSON.stringify(clearedMoods));
  };
  

  function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
  
    return function(this: any, ...args: Parameters<T>) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  

  const throttledHandleMoodClick = throttle(handleMoodClick, 300);

  
  

  useEffect(() => {
    const storedMoods = localStorage.getItem('monthInPixels');
    if (storedMoods) {
      setMoods(JSON.parse(storedMoods));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Month in Pixels</title>
      </Head>
      <Image
        src="/login-bg-2.png"
        alt="Background"
        width={1920}
        height={1080}
        className={styles.backgroundImage}
        priority // Improves loading time for the background image
      />
      <main className={styles.container}>
        <h1 className={styles.title}>Month in Pixels</h1>
        <button onClick={clearMoods}>Clear Colors</button> {/* Add this line */}
        <div className={styles.moodGrid}>
          {daysArray.map(day => {
            const style = {
              '--mood-color': colors[moods[day]] || colors.neutral
            } as React.CSSProperties;

            return (
              <div
                key={day}
                className={styles.moodSquare}
                style={style}
                onClick={() => throttledHandleMoodClick(day)}
                onTouchEnd={() => throttledHandleMoodClick(day)} // Added touch handler
                role="button"
                tabIndex={0}
                aria-label={`Set mood for day ${day}`} // Accessibility improvement
              >
                {day <= daysInMonth ? day : ''}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default MoodGrid;
