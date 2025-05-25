'use client';

import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Campaign {
  title: string;
  description: string;
  goal: number;
  endDate: string;
  isPrivate: boolean;
  walletAddress: string;
  createdAt: string;
  nftEnabled: boolean;
  nftThreshold?: number;
  previewUrl?: string;
}

const MyCampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);

  React.useEffect(() => {
    
    const storedCampaigns = localStorage.getItem('myCampaigns');
    if (storedCampaigns) {
      setCampaigns(JSON.parse(storedCampaigns));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Fundraisers</h1>
      
      <Link href="/create" className={styles.createButton}>
        Create New Fundraiser
      </Link>

      {campaigns.length === 0 ? (
        <p className={styles.noCampaigns}>You haven't created any fundraisers yet.</p>
      ) : (
        <div className={styles.campaignsGrid}>
          {campaigns.map((campaign, index) => (
            <div key={index} className={styles.campaignCard}>
              {campaign.previewUrl && (
                <div className={styles.imageContainer}>
                  <Image 
                    src={campaign.previewUrl} 
                    alt={campaign.title} 
                    width={300}
                    height={200}
                    className={styles.campaignImage}
                  />
                </div>
              )}
              <h2 className={styles.campaignTitle}>{campaign.title}</h2>
              <p className={styles.campaignDescription}>{campaign.description.substring(0, 100)}...</p>
              <div className={styles.campaignDetails}>
                <p><strong>Goal:</strong> {campaign.goal} USDC</p>
                <p><strong>Wallet:</strong> {campaign.walletAddress.substring(0, 6)}...{campaign.walletAddress.substring(campaign.walletAddress.length - 4)}</p>
                {campaign.endDate && <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>}
                <p><strong>Created:</strong> {new Date(campaign.createdAt).toLocaleDateString()}</p>
                {campaign.nftEnabled && (
                  <p><strong>NFT Threshold:</strong> {campaign.nftThreshold} USDC</p>
                )}
              </div>
              <button className={styles.viewButton}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCampaignsPage;