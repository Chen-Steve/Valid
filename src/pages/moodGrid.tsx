import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/moodgrid.module.css';

import Draggable from 'react-draggable';

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

const MoodSquare: React.FC<{
  day: number,
  handleMoodClick: (day: number) => void,
  moodColor: string,
  daysInMonth: number
}> = ({ day, handleMoodClick, moodColor, daysInMonth }) => {
  const style = {
    '--mood-color': moodColor || colors.neutral,
  } as React.CSSProperties;

  return (
    <div
      className={styles.moodSquare}
      style={style}
      onClick={() => handleMoodClick(day)}
      onTouchEnd={() => handleMoodClick(day)}
      role="button"
      tabIndex={0}
      aria-label={`Set mood for day ${day}`}
    >
      {day <= daysInMonth ? day : ''}
    </div>
  );
};

const MoodGrid: NextPage = () => {
  const [moods, setMoods] = useState<Moods>({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate(); // month + 1 because JS months are 0-indexed
  };

  const months = Array.from({ length: 12 }, (_, index) => ({
    name: new Date(currentYear, index).toLocaleString('default', { month: 'long' }),
    days: getDaysInMonth(index, currentYear), // index is fine here because getDaysInMonth expects the actual month index (0-11)
  }));

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const totalSquares = Math.max(daysInMonth, 30); // Adjust grid size based on the month
  const daysArray = Array.from({ length: totalSquares }, (_, index) => index + 1);

  const updateLocalStorage = useCallback((newMoods: Moods) => {
    localStorage.setItem('monthInPixels', JSON.stringify(newMoods));
  }, []);

  const handleMoodClick = useCallback((monthIndex: number, day: number) => {
    const moodKey = `${monthIndex}-${day}`;
    const moodsArray = Object.keys(colors);
    const currentMood = moods[moodKey] || 'neutral';
    const currentMoodIndex = moodsArray.indexOf(currentMood);
    const nextMoodIndex = (currentMoodIndex + 1) % moodsArray.length;
    const nextMood = moodsArray[nextMoodIndex];

    const updatedMoods = { ...moods, [moodKey]: nextMood };
    setMoods(updatedMoods);
    updateLocalStorage(updatedMoods);
  }, [moods, updateLocalStorage]);

  const clearMoods = useCallback(() => {
    const clearedMoods: Moods = {};
    months.forEach((month, monthIndex) => {
      Array.from({ length: month.days }, (_, dayIndex) => {
        const moodKey = `${monthIndex}-${dayIndex + 1}`;
        clearedMoods[moodKey] = 'neutral';
      });
    });
    setMoods(clearedMoods);
    updateLocalStorage(clearedMoods);
  }, [months, updateLocalStorage]);
  
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

  const [background, setBackground] = useState<string>('/login-bg-2.png');
  const backgrounds = [
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },
    { name: 'mythic', url: '/background/mythic.jpg' },

  ];

  const handleBackgroundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBackground = event.target.value;
    setBackground(selectedBackground);
  };
  
  const throttledHandleMoodClick = throttle(handleMoodClick, 300);

  useEffect(() => {
    const storedMoods = localStorage.getItem('monthInPixels');
    if (storedMoods) {
      setMoods(JSON.parse(storedMoods));
    }
  }, []);

  return (
    <Draggable>
      <>
        <Head>
          <title>Year in Pixels</title>
        </Head>
        <Image
          src={background}
          alt="Background"
          width={1920}
          height={1080}
          className={styles.backgroundImage}
          priority
        />
        <main className={styles.container}>
        <select
          className={styles.backgroundSelector}
          value={background}
          onChange={handleBackgroundChange}
        >
          {backgrounds.map((bg, index) => (
            <option key={index} value={bg.url}>
              {bg.name}
            </option>
          ))}
        </select>
          <button className={styles.clearButton} onClick={clearMoods}>
            Clear Colors
          </button>
          {months.map((month, monthIndex) => (
            <div key={monthIndex} className={styles.monthContainer}>
              <h2 className={styles.monthTitle}>{month.name}</h2>
              <div className={styles.moodGrid}>
                {Array.from({ length: month.days }, (_, dayIndex) => {
                  const moodKey = `${monthIndex}-${dayIndex + 1}`;
                  return (
                    <MoodSquare
                      key={dayIndex}
                      day={dayIndex + 1}
                      handleMoodClick={() => handleMoodClick(monthIndex, dayIndex + 1)}
                      moodColor={colors[moods[moodKey]] || colors.neutral}
                      daysInMonth={month.days}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </main>
      </>
    </Draggable>
  );
};

export default MoodGrid;
