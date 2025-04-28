"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Donation {
  name: string;
  amount: number;
  message?: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  endDate?: string;
  organizer: string;
  donations: Donation[];
  nftEnabled: boolean;
  nftThreshold?: number;
}

const CampaignPage: React.FC <{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    if (id) {
      
      setTimeout(() => {
        const mockCampaign: Campaign = {
          id: id as string,
          title: 'Збираємо на незабутній день народження для Оленки! 🎉',
          description:
            'Привіт усім! Ми хочемо влаштувати для нашої чудової подруги Оленки особливий день народження. Давайте разом зберемо кошти на крутий подарунок та святкову вечерю. Кожна ваша підтримка має значення!',
          goal: 500,
          raised: 320,
          endDate: '15 травня 2025',
          organizer: 'Петро',
          donations: [
            { name: 'Іван', amount: 10, message: 'Дякую за все, Оленко!' },
            { name: 'Марія', amount: 25, message: 'З найкращими побажаннями!' },
            { name: 'Сергій', amount: 5, message: 'Нехай твій день буде чудовим!' },
          ],
          nftEnabled: true,
          nftThreshold: 10,
        };
        setCampaign(mockCampaign);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error || !campaign) {
    return <div>Помилка завантаження збору.</div>;
  }

  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>

      <div>
        <strong>Ціль:</strong> {campaign.goal} USDC
      </div>
      <div>
        <strong>Зібрано:</strong> {campaign.raised} USDC ({progress.toFixed(0)}%)
      </div>
      <div>
        <strong>Залишилось:</strong> {campaign.goal - campaign.raised} USDC
      </div>
      <div
        style={{
          backgroundColor: '#eee',
          borderRadius: '5px',
          height: '20px',
          width: '100%',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            backgroundColor: 'green',
            height: '100%',
            width: `${progress}%`,
            borderRadius: '5px',
          }}
        />
      </div>

      <button onClick={() => alert('Функціонал підтримки USDC через Solana буде додано.')}>
        Підтримати (USDC через Solana)
      </button>

      <h2>Стрічка пожертвувань</h2>
      {campaign.donations.length > 0 ? (
        <ul>
          {campaign.donations.map((donation, index) => (
            <li key={index}>
              {donation.name} ({donation.amount} USDC) - {donation.message || 'Без повідомлення'}
            </li>
          ))}
        </ul>
      ) : (
        <p>Ще немає пожертв. Будьте першим!</p>
      )}

      <div>
        <strong>Організатор:</strong> {campaign.organizer}
      </div>
      {campaign.endDate && <div><strong>Дата завершення:</strong> {campaign.endDate}</div>}
      {campaign.nftEnabled && (
        <div>
          <strong>NFT "Я допоміг":</strong> Кожен, хто підтримає збір на суму від{' '}
          {campaign.nftThreshold} USDC, отримає унікальний NFT.
        </div>
      )}

      
      <div>
        <strong>Поділитись:</strong> (Іконки соціальних мереж тут)
      </div>
    </div>
  );
};

export default CampaignPage;