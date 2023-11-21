import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import loginBg from '/public/login-bg-2.png'; 
import styles from '../styles/login.module.scss';
import '../styles/styles.scss'; 

import { showHiddenPass } from '../js/main.js';

const LoginForm: React.FC = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };
    
  return (
    <div className={styles.login + " custom-cursor"}>
      <Head>
        <title>Login!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>

      {/* Background image */}
      <Image src={loginBg} alt="Background" layout='fill' objectFit='cover' quality={100} />

      {/* Login Form */}
      <div className={styles.login__container}>
        <form className={styles.login__form}>
          <h1>Login</h1>

          <div className={styles.login__field}>
            <i className="ri-user-3-line"></i>
            <input type="email" placeholder="Email" required />
          </div>

          <div className={styles.login__field}>
            <i className="ri-lock-2-line"></i>
            <input type={passwordShown ? "text" : "password"} placeholder="Password" required />
            <i className={passwordShown ? "ri-eye-line" : "ri-eye-off-line"} onClick={togglePasswordVisibility}></i>
            </div>

          <div className={styles.login__footer}>
            <div className={styles.remember__me}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className={styles.forgot__password}>Forgot Password?</a>
          </div>

          <button type="submit" className={styles.login__button}>Login</button>

          <p className={styles.register__prompt}>
            Don&apos;t have an account? <a href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
