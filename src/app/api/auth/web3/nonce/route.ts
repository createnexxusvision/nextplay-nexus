// NextPlay Nexus — SIWE Nonce Generator
// POST /api/auth/web3/nonce
// Returns a one-time nonce for SIWE message construction

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase service client not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST() {
  try {
    const nonce = crypto.randomUUID().replace(/-/g, '');
    const supabase = getServiceClient();

    const { error } = await supabase
      .from('web3_nonces')
      .insert({ nonce });

    if (error) throw error;

    return NextResponse.json({ nonce }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to generate nonce' }, { status: 500 });
  }
}
