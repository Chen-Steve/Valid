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
    <div className="login">
      <Head>
        <title>Login!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>

      {/* Background image */}
      <Image src={loginBg} alt="Background" layout='fill' objectFit='cover' quality={100} />

      {/* Login Form */}
        <form action="" className="login__form">
        <h1 className="login__title">Login</h1>

        <div className="login__content">
               <div className="login__box">
                  <i className="ri-user-3-line login__icon"></i>

                  <div className="login__box-input">
                  <input type="email" required className="login__input" id="login-email" placeholder=" "/>
                    <label htmlFor="login-email" className="login__label">Email</label>
                  </div>
               </div>

               <div className="login__box">
                  <i className="ri-lock-2-line login__icon"></i>

                  <div className="login__box-input">
                  <input 
                    type={passwordShown ? "text" : "password"} 
                    required className="login__input" 
                    id="login-pass" 
                    placeholder=" "
                  />
                  <label htmlFor="login-pass" className="login__label">Password</label>
                  <i className={passwordShown ? "ri-eye-line login-eye" : "ri-eye-off-line login-eye"} 
                    onClick={togglePasswordVisibility} 
                    id="login-eye"></i>
                  </div>
               </div>
            </div>

            <div className="login__check">
               <div className="login__check-group">
                  <input type="checkbox" required className="login__login__check-input" id="login-check"/>
                  <label htmlFor="login-check" className="login__check-label">Remember me</label>
               </div>
               <a href="#" className="login__forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="login__button">Login</button>

            <p className="login__register">
               Don&apos;t have an account? <a href="#">Register</a>
            </p>
         </form>
      </div>
  );
};

export default LoginForm;