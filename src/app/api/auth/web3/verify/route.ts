// NextPlay Nexus — SIWE Signature Verifier
// POST /api/auth/web3/verify
// Verifies SIWE signature, finds/creates user, returns OTP token for session

import { NextRequest, NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase service client not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
    }

    const body = await request.json() as { message?: string; signature?: string; address?: string };
    const { message, signature, address } = body;

    if (!message || !signature || !address) {
      return NextResponse.json({ error: 'message, signature, and address are required' }, { status: 400 });
    }

    // Parse and verify SIWE message
    const siweMessage = new SiweMessage(message);
    const { success, data } = await siweMessage.verify({ signature });

    if (!success || data.address.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const supabase = getServiceClient();

    // Check nonce is valid and not expired
    const { data: nonceRow, error: nonceError } = await supabase
      .from('web3_nonces')
      .select('id, expires_at')
      .eq('nonce', data.nonce)
      .single();

    if (nonceError || !nonceRow) {
      return NextResponse.json({ error: 'Invalid or expired nonce' }, { status: 401 });
    }

    if (new Date(nonceRow.expires_at) < new Date()) {
      await supabase.from('web3_nonces').delete().eq('id', nonceRow.id);
      return NextResponse.json({ error: 'Nonce expired' }, { status: 401 });
    }

    // Delete nonce (single-use)
    await supabase.from('web3_nonces').delete().eq('id', nonceRow.id);

    // Find or create user by wallet address (email = address@web3.nextplaynexus.com)
    const walletEmail = `${address.toLowerCase()}@web3.nextplaynexus.com`;

    let userId: string;

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users.find(u => u.email === walletEmail);

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: walletEmail,
        email_confirm: true,
        user_metadata: {
          role: 'athlete',
          full_name: `${address.slice(0, 6)}...${address.slice(-4)}`,
          wallet_address: address.toLowerCase(),
        },
      });

      if (createError || !newUser?.user) {
        throw createError ?? new Error('Failed to create user');
      }

      userId = newUser.user.id;
    }

    // Generate magic link OTP for the user
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: walletEmail,
    });

    if (linkError || !linkData?.properties?.hashed_token) {
      throw linkError ?? new Error('Failed to generate session token');
    }

    return NextResponse.json({
      token: linkData.properties.hashed_token,
      email: walletEmail,
      userId,
    }, { status: 200 });

  } catch (err) {
    console.error('Web3 verify error:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
