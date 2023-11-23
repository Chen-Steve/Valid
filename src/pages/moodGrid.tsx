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
  // Add more moods and colors as needed
};

const MoodGrid: NextPage = () => {
  const [moods, setMoods] = useState<Moods>({});

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const totalSquares = 30;
  const daysArray = Array.from({ length: totalSquares }, (_, index) => index + 1);

  const handleMoodClick = (day: number) => {
    const moodsArray = Object.keys(colors);
    const currentMoodIndex = moodsArray.indexOf(moods[day]);
    const nextMood = moodsArray[(currentMoodIndex + 1) % moodsArray.length] || 'neutral';
    const newMoods = { ...moods, [day]: nextMood };
    setMoods(newMoods);
    localStorage.setItem('monthInPixels', JSON.stringify(newMoods));
  };

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
        layout="fill" 
        objectFit="cover"
        className={styles.backgroundImage}
      />
      <main className={styles.container}>
        <h1 className={styles.title}>Month in Pixels</h1>
        <div className={styles.moodGrid}>
          {daysArray.map(day => {
            // Declare style within the function body
            const style = { '--mood-color': colors[moods[day]] || colors.neutral } as React.CSSProperties;

            return (
              <div
                key={day}
                className={styles.moodSquare}
                style={style}
                onClick={() => handleMoodClick(day)}
                role="button"
                tabIndex={0}
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
