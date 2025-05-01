'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; 
import Image from 'next/image';

const CreateCampaignPage: React.FC = () => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState<number | undefined>();
  const [endDate, setEndDate] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [nftEnabled, setNftEnabled] = useState(false);
  const [nftThreshold, setNftThreshold] = useState<number | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCampaign = {
      title,
      description,
      goal,
      endDate,
      isPrivate,
      image,
      nftEnabled,
      nftThreshold,
    };
    console.log('Створено новий збір:', newCampaign);

    alert('Збір буде створено (функціонал бекенду не реалізовано).');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}>Create a New Fundraiser</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Fundraiser Title:</label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="goal" className={styles.label}>Goal (USDC):</label>
          <input
            type="number"
            id="goal"
            className={styles.input}
            value={goal}
            onChange={(e) => setGoal(parseInt(e.target.value))}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate" className={styles.label}>End Date (Optional):</label>
          <input
            type="date"
            id="endDate"
            className={styles.input}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            Make this fundraiser private?
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Upload Image (Optional):</label>
          <input type="file" id="image" className={styles.fileInput} onChange={handleImageChange} />
          {previewUrl && (
            <div className={styles.previewContainer}>
              <h3>Image Preview:</h3>
              <Image src={previewUrl} alt="Image Preview" width={150} height={100} style={{ objectFit: 'contain' }} />
            </div>
          )}
        </div>
        <div className={styles.nftSettings}>
          <label className={styles.checkboxLabel}>
            Enable "I Helped" NFT rewards?
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={nftEnabled}
              onChange={(e) => setNftEnabled(e.target.checked)}
            />
          </label>
          {nftEnabled && (
            <div className={styles.formGroup}>
              <label htmlFor="nftThreshold" className={styles.label}>Minimum support amount for NFT (USDC):</label>
              <input
                type="number"
                id="nftThreshold"
                className={styles.input}
                value={nftThreshold}
                onChange={(e) => setNftThreshold(parseInt(e.target.value))}
              />
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>Create Fundraiser</button>
      </form>
    </div>
  );
};

export default CreateCampaignPage;