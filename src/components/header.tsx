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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet" />
      </Head>

      <Image src={loginBg} alt="Background" layout='fill' objectFit='cover' quality={100} />
      <p className={styles.loginLink}>
        <Link href="/login">Login</Link>
      </p>

      <h1 className={styles.title}>Welcome</h1>
    </>
  );
};

export default Header;