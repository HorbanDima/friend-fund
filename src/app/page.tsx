'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import logo from '../../public/friendfund-logo.png';
import solanaLogo from '../../public/solana-logo.png'

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.logoContainer}>
                    <Image src={logo} alt="FriendFund Logo" className={styles.logo} priority />
                </Link>
            </header>

            <main className={styles.main}>
                <section className={styles.hero}>
                    <h2 className={styles.heroTitle}>Fund the moments that matter with friends.</h2>
                    <p className={styles.heroSubtitle}>A simple way to crowdfund within your trusted circles on Solana.</p>
                    <div className={styles.heroFeatures}>
                        <span>🎁 Gifts</span>
                        <span>✈️ Trips</span>
                        <span>💡 Ideas</span>
                    </div>
                    <div className={styles.heroActions}>
                        <Link href="/create" className={styles.createButton}>
                            Start a Fundraiser
                        </Link>
                    </div>
                </section>

                <section className={styles.features}>
                    <h3>Why Choose FriendFund?</h3>
                    <div className={styles.featuresGrid}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🤝</div>
                            <h4>Trusted Circles</h4>
                            <p>Focus on raising funds from friends, family, and DAO members.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}><span role="img" aria-label="eye">👁️</span></div>
                            <h4>Transparent</h4>
                            <p>Leveraging the Solana blockchain for verifiable contributions.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}><span role="img" aria-label="no entry">🚫</span></div>
                            <h4>Zero Fees</h4>
                            <p>Keep 100% of the funds you raise.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}><span role="img" aria-label="nft">🖼️</span></div>
                            <h4>NFT Rewards</h4>
                            <p>Offer "I Helped" NFTs to your supporters.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIconImage}>
                                <Image src={solanaLogo} alt="Solana Logo" width={40} height={40} />
                            </div>
                            <h4>Powered by Solana</h4>
                            <p>Enjoy fast and low-cost transactions.</p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🏛️</div>
                            <h4>DAO Ready</h4>
                            <p>Facilitate community-driven funding within DAOs.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2025 FriendFund. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;