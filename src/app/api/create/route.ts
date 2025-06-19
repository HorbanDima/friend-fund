import { NextResponse } from 'next/server';
import { createFundraiser } from '@/lib/contract';
import { PublicKey } from '@solana/web3.js';

export async function POST(request: Request) {
  try {
    const { name, description, goalAmount, usdcMint } = await request.json();
    
    const fundraiserPDA = await createFundraiser(
      name,
      description,
      goalAmount,
      new PublicKey(usdcMint)
    );
    
    return NextResponse.json({ success: true, fundraiserPDA: fundraiserPDA.toString() });
  } catch (error) {
    console.error('Error creating fundraiser:', error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}