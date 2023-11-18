// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import styles from '../styles/header.module.css';
import Link from 'next/link';


const Header: React.FC = () => {
    return (
        <>
        <Head>
            <title>Welcome Page</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
                rel="stylesheet"
                />
            </Head>
            <div className={`${styles.container} custom-cursor`}>
            <div className={`${styles.circle} ${styles.circle1}`} />
            <div className={`${styles.circle} ${styles.circle2}`} />
            <div className={`${styles.circle} ${styles.circle3}`} />
            <div className={`${styles.circle} ${styles.circle4}`} />
            <div className={`${styles.circle} ${styles.circle5}`} />
            <div className={`${styles.circle} ${styles.circle6}`} />
            <div className={`${styles.circle} ${styles.circle7}`} />
            <div className={`${styles.circle} ${styles.circle8}`} />
            <p className={styles.loginLink}>
                <Link href="/login">Login</Link>
            </p>
            <h1 className={styles.title}>Welcome :)</h1>
          </div>
        </>
      );
};

export default Header;

