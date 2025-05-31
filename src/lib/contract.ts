import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { IDL } from './friends_fund'; 
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK!;
const preflightCommitment = 'processed';
const programId = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);


const getProvider = () => {
  const connection = new web3.Connection(network, preflightCommitment);
  const wallet = (window as any).solana; 
  
  if (!wallet) {
    throw new Error('Wallet not connected');
  }
  
  return new AnchorProvider(connection, wallet, { preflightCommitment });
};


const getProgram = () => {
  const provider = getProvider();
  return new Program(IDL, programId, provider);
};


export const createFundraiser = async (
  name: string,
  description: string,
  goalAmount: number,
  usdcMint: PublicKey
) => {
  const program = getProgram();
  const [fundraiserPDA] = await PublicKey.findProgramAddress(
    [Buffer.from('fundraiser'), Buffer.from(name)],
    program.programId
  );
  
  await program.methods.initialize(name, description, goalAmount)
    .accounts({
      fundraiser: fundraiserPDA,
      usdcMint,
      payer: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();
    
  return fundraiserPDA;
};

export const donateToFundraiser = async (
  fundraiserPDA: PublicKey,
  amount: number,
  donorUsdcAccount: PublicKey,
  fundraiserUsdcAccount: PublicKey,
  usdcMint: PublicKey
) => {
  const program = getProgram();
  
  await program.methods.donate(amount)
    .accounts({
      fundraiser: fundraiserPDA,
      donorUsdcAccount,
      fundraiserUsdcAccount,
      donor: provider.wallet.publicKey,
      usdcMint,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();
};

