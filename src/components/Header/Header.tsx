"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/friendfund-logo.png';
import styles from './Header.module.css'; 
import dynamic from 'next/dynamic';
const WalletMultiButton = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      
      <Link href="/" className={`${styles.logoContainer} ${isMenuOpen ? styles.hiddenOnMobileMenuOpen : ''}`} onClick={closeMenu}>
        <Image src={logo} alt="FriendFund Logo" className={styles.logo} priority />
      </Link>
      
      <button 
        className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        
        <Link href="/" className={styles.mobileMenuLogoContainer} onClick={closeMenu}>
          <Image src={logo} alt="FriendFund Logo" className={styles.logo} priority />
        </Link>

        <Link href="/create" className={styles.navLink} onClick={closeMenu}>
          Create Fundraiser
        </Link>        
        <Link href="/campaign" className={styles.navLink} onClick={closeMenu}>
          Open Fundraiser
        </Link>
        <Link href="/my-campaigns" className={styles.navLink} onClick={closeMenu}>
          My Campaigns
        </Link>
        <div className={styles.walletButton}>
          <WalletMultiButton/>
        </div>
      </nav>      
    </header>
  );
};
