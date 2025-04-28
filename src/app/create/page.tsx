"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateCampaignPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState<number | undefined>();
  const [endDate, setEndDate] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [nftEnabled, setNftEnabled] = useState(false);
  const [nftThreshold, setNftThreshold] = useState<number | undefined>();
  

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
      setImage(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Створити новий збір коштів</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Назва збору:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Опис:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        <div>
          <label htmlFor="goal">Ціль (USDC):</label>
          <input
            type="number"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">Кінцева дата (необов'язково):</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>
            Зробити збір приватним?
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="image">Завантажити зображення (необов'язково):</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div>
          <label>
            Увімкнути видачу NFT за підтримку?
            <input
              type="checkbox"
              checked={nftEnabled}
              onChange={(e) => setNftEnabled(e.target.checked)}
            />
          </label>
        </div>
        {nftEnabled && (
          <div>
            <label htmlFor="nftThreshold">Мінімальна сума підтримки для отримання NFT (USDC):</label>
            <input
              type="number"
              id="nftThreshold"
              value={nftThreshold}
              onChange={(e) => setNftThreshold(parseInt(e.target.value))}
            />
          </div>
        )}
        {/* TODO: Додати UI для інтеграції з DAO */}
        <button type="submit">Створити збір</button>
      </form>
    </div>
  );
};

export default CreateCampaignPage;