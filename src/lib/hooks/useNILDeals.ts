'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface NILDeal {
  id: string;
  brand: string;
  sport: string;
  amount: number;
  type: string;
  status: 'pending' | 'active' | 'completed' | 'declined';
  signedAt: string | null;
  createdAt: string;
}

export function useNILDeals() {
  const [deals, setDeals] = useState<NILDeal[]>([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDeals() {
      const supabase = createClient();

      // Get current user's athlete record first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: athlete } = await supabase
        .from('athletes')
        .select('id')
        .eq('profile_id', user.id)
        .single();

      if (!athlete || cancelled) { setLoading(false); return; }

      const { data } = await supabase
        .from('nil_deals')
        .select('*')
        .eq('athlete_id', athlete.id)
        .order('created_at', { ascending: false });

      if (cancelled) return;

      const mapped: NILDeal[] = (data ?? []).map((d: any) => ({
        id: d.id,
        brand: d.brand,
        sport: d.sport,
        amount: Number(d.amount),
        type: d.type,
        status: d.status,
        signedAt: d.signed_at,
        createdAt: d.created_at,
      }));

      const earned = mapped
        .filter(d => d.status !== 'declined')
        .reduce((sum, d) => sum + d.amount, 0);

      setDeals(mapped);
      setTotalEarned(earned);
      setLoading(false);
    }

    fetchDeals();
    return () => { cancelled = true; };
  }, []);

  return { deals, totalEarned, loading };
}
