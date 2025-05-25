use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::result::Result;

declare_id!(""); 

#[program]
pub mod friends_fund {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        name: String,
        description: String,
        goal_amount: u64,
    ) -> Result<()> {
        ctx.accounts.fundraiser.name = name;
        ctx.accounts.fundraiser.description = description;
        ctx.accounts.fundraiser.creator = *ctx.accounts.payer.key;
        ctx.accounts.fundraiser.total_donations = 0;
        ctx.accounts.fundraiser.goal_amount = goal_amount;
        ctx.accounts.fundraiser.usdc_mint = ctx.accounts.usdc_mint.key();
        ctx.accounts.fundraiser.is_active = true;
        ctx.accounts.fundraiser.bump = *ctx.bumps.get("fundraiser").unwrap();
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        require!(ctx.accounts.fundraiser.is_active, FundraiserError::InactiveFundraiser);
        require!(amount > 0, FundraiserError::InvalidAmount);
        
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
        
        msg!("Donated {} USDC from {}", amount, ctx.accounts.donor.key());
        
        ctx.accounts.fundraiser.total_donations += amount;
        ctx.accounts.fundraiser.donors.push(*ctx.accounts.donor.key);
        
        if amount >= 100_000_000 { 
            Self::mint_reward_nft(ctx)?;
        }

        Ok(())
    }

    pub fn propose_help(ctx: Context<ProposeHelp>, proposal: String) -> Result<()> {
        require!(ctx.accounts.fundraiser.is_active, FundraiserError::InactiveFundraiser);
        
        let help_proposal = HelpProposal {
            proposer: *ctx.accounts.proposer.key,
            proposal,
            votes: 0,
        };
        
        ctx.accounts.fundraiser.help_proposals.push(help_proposal);
        Ok(())
    }

    pub fn vote_for_proposal(ctx: Context<VoteForProposal>, proposal_index: u8) -> Result<()> {
        require!(ctx.accounts.fundraiser.is_active, FundraiserError::InactiveFundraiser);
        require!(
            proposal_index < ctx.accounts.fundraiser.help_proposals.len() as u8,
            FundraiserError::InvalidProposalIndex
        );
        
        ctx.accounts.fundraiser.help_proposals[proposal_index as usize].votes += 1;
        Ok(())
    }

    pub fn close_fundraiser(ctx: Context<CloseFundraiser>) -> Result<()> {
        require!(
            ctx.accounts.creator.key() == &ctx.accounts.fundraiser.creator,
            FundraiserError::Unauthorized
        );
        
        ctx.accounts.fundraiser.is_active = false;
        Ok(())
    }

    fn mint_reward_nft(ctx: Context<Donate>) -> Result<()> {        
        msg!("Awarded NFT for Great Donat {}", ctx.accounts.donor.key());
        Ok(())
    }
}

#[error_code]
pub enum FundraiserError {
    #[msg("Fanderer is not active")]
    InactiveFundraiser,
    #[msg("Non correct Amount")]
    InvalidAmount,
    #[msg("Suppress Supply Index")]
    InvalidProposalIndex,
    #[msg("Unauthorized access")]
    Unauthorized,
}

#[derive(Accounts)]
#[instruction(name: String, description: String, goal_amount: u64)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + 40 + 200 + 32 + 8 + 8 + 32 + 1 + 1 + 100 + 100,
        seeds = [b"fundraiser", name.as_bytes()],
        bump
    )]
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
    #[account(
        mut,
        constraint = donor_usdc_account.mint == usdc_mint.key(),
        constraint = fundraiser_usdc_account.mint == usdc_mint.key()
    )]
    pub donor_usdc_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub fundraiser_usdc_account: Account<'info, TokenAccount>,
    #[account(signer)]
    pub donor: Signer<'info>,
    pub usdc_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ProposeHelp<'info> {
    #[account(mut)]
    pub fundraiser: Account<'info, Fundraiser>,
    #[account(signer)]
    pub proposer: Signer<'info>,
}

#[derive(Accounts)]
pub struct VoteForProposal<'info> {
    #[account(mut)]
    pub fundraiser: Account<'info, Fundraiser>,
    #[account(signer)]
    pub voter: Signer<'info>,
}

#[derive(Accounts)]
pub struct CloseFundraiser<'info> {
    #[account(mut)]
    pub fundraiser: Account<'info, Fundraiser>,
    #[account(signer)]
    pub creator: Signer<'info>,
}

#[account]
pub struct Fundraiser {
    pub name: String,
    pub description: String,
    pub creator: Pubkey,
    pub total_donations: u64,
    pub goal_amount: u64,
    pub usdc_mint: Pubkey,
    pub is_active: bool,
    pub bump: u8,
    pub donors: Vec<Pubkey>,
    pub help_proposals: Vec<HelpProposal>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct HelpProposal {
    pub proposer: Pubkey,
    pub proposal: String,
    pub votes: u32,
}