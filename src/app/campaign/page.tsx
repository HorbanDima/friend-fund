'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';


interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
}


const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Help John with his Medical Bills',
    description: 'John needs our support to cover his medical expenses after an accident.',
    goal: 1000,
    raised: 650,
    image: 'https://i.pinimg.com/736x/ca/40/79/ca4079ce0a09fbb25f16246913cd7748.jpg',
  },
  {
    id: '2',
    title: 'Support Local Animal Shelter',
    description: 'Let\'s raise funds for our local animal shelter to provide care for abandoned pets.',
    goal: 500,
    raised: 320,
    image: 'https://i.pinimg.com/736x/ca/40/79/ca4079ce0a09fbb25f16246913cd7748.jpg',
  },
  {
    id: '3',
    title: 'Fund a Community Garden Project',
    description: 'We\'re starting a community garden to bring fresh produce to everyone.',
    goal: 1500,
    raised: 900,
    image: 'https://i.pinimg.com/736x/ca/40/79/ca4079ce0a09fbb25f16246913cd7748.jpg',
  },
];

const CampaignsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Open Fundraisers</h1>
      <ul className={styles.campaignList}>
        {mockCampaigns.map((campaign) => (
          <li key={campaign.id} className={styles.campaignItem}>
            <Link href={`/campaign/${campaign.id}`} className={styles.campaignLink}>
              <div className={styles.campaignImageContainer}>
                <Image src={campaign.image} alt={campaign.title} width={300} height={200} style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.campaignDetails}>
                <h2 className={styles.campaignTitle}>{campaign.title}</h2>
                <p className={styles.campaignDescription}>{campaign.description.substring(0, 100)}...</p>
                <div className={styles.progressBarContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                  ></div>
                </div>
                <p className={styles.campaignProgress}>
                  ${campaign.raised} raised of ${campaign.goal}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignsPage;