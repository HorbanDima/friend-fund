use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::result::Result;

declare_id!(""); 

#[program]
pub mod friends_fund {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String) -> Result<()> {
        ctx.accounts.fundraiser.name = name;
        ctx.accounts.fundraiser.creator = *ctx.accounts.payer.key;
        ctx.accounts.fundraiser.total_donations = 0;
        ctx.accounts.fundraiser.usdc_mint = ctx.accounts.usdc_mint.key();
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.donor_usdc_account.to_account_info(),
                    to: ctx.accounts.fundraiser_usdc_account.to_account_info(),
                    authority: ctx.accounts.donor.to_account_info(),
                },
            ),
            amount,
        )?;

        // Мінтинг NFT "Я допоміг" для донора треба реалызувати окремо 
        msg!("Зроблено пожертву {} USDC від {}", amount, ctx.accounts.donor.key());
        
        ctx.accounts.fundraiser.total_donations += amount;

        Ok(())
    }

 
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {
    #[account(init, payer = payer, space = 8 + 32 + 32 + 8 + 32, seeds = [b"fundraiser", name.as_bytes()], bump)]
    pub fundraiser: Account<'info, Fundraiser>,
    pub usdc_mint: Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub fundraiser: Account<'info, Fundraiser>,
    #[account(mut)]
    pub donor_usdc_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub fundraiser_usdc_account: Account<'info, TokenAccount>,
    #[account(signer)]
    pub donor: Signer<'info>,
    pub usdc_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,   
    // pub nft_mint: Account<'info, Mint>,
    // #[account(mut)]
    // pub donor_nft_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    // pub metadata_program: Program<'info, Metadata>, 
    // pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct ProposeHelp<'info> {
    #[account(mut)]
    pub fundraiser: Account<'info, Fundraiser>,
    #[account(signer)]
    pub proposer: Signer<'info>,  

#[account]
pub struct Fundraiser {
    pub name: String,
    pub creator: Pubkey,
    pub total_donations: u64,
    pub usdc_mint: Pubkey,
}
