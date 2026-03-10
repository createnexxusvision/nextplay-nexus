'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface DashboardStats {
  totalAthletes: number;
  totalSports: number;
  totalDeals: number;
  avgNilScore: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAthletes: 0,
    totalSports: 6,
    totalDeals: 0,
    avgNilScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      const supabase = createClient();

      const [athletesRes, dealsRes, avgRes] = await Promise.all([
        supabase.from('athletes').select('id', { count: 'exact', head: true }),
        supabase.from('nil_deals').select('id', { count: 'exact', head: true }),
        supabase.from('athletes').select('nil_score'),
      ]);

      if (cancelled) return;

      const totalAthletes = athletesRes.count ?? 0;
      const totalDeals = dealsRes.count ?? 0;

      const scores = (avgRes.data ?? []).map((r: { nil_score: number }) => r.nil_score);
      const avgNilScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

      setStats({ totalAthletes, totalSports: 6, totalDeals, avgNilScore });
      setLoading(false);
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading };
}
