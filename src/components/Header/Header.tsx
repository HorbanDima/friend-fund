"use client"
import React from 'react';
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
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoContainer}>
        <Image src={logo} alt="FriendFund Logo" className={styles.logo} priority />
      </Link>
      <nav className={styles.nav}>
        <Link href="/create" className={styles.navLink}>
          Create Fundraiser
        </Link>        
        <Link href="/campaign" className={styles.navLink}>
        Open Fundraiser
        </Link>   
        <WalletMultiButton/>     
      </nav>      
    </header>
  );
};
