import React from 'react'
import styles from './Footer.module.css'
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* <div>
          <Link to='/profile'>Profile</Link>
        </div>  */}
      <div>
        <a className={styles.container} href="mailto: mm10294@nyu.edu" color="white"> Contact Us </a>      {/*<Link to='/profile'>Profile</Link>      */}
      </div>
      <p>
        &copy;2022. Team Almaal. All rights reserved.
      </p>

    </footer>

  );
}
export default Footer;