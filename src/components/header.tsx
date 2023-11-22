import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/header.module.css';
import loginBg from '/public/home.png';

const Header: React.FC = () => {
    return (
      <>
        <Head>
          <title>Valid.</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&display=swap" />
        </Head>
  
        <Image src={loginBg} alt="Background image of homepage" layout='fill' objectFit='cover' quality={100} />
        
        <nav aria-label="Primary">
          <p className={styles.loginLink}>
            <Link href="/login" aria-label="Login page link">Login</Link>
          </p>
        </nav>

        <nav aria-label="Primary">
          <p className={styles.demoLink}>
            <Link href="/login" aria-label="Login page link">Demo</Link>
          </p>
        </nav>

        <nav aria-label="Primary">
          <p className={styles.comingSoon}>
            <Link href="/login" aria-label="Login page link">Coming Soon...!</Link>
          </p>
        </nav>
  
        <h1 className={styles.title} tabIndex={0}>Welcome</h1>
      </>
    );
  };

export default Header;