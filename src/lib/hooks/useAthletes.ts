'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { type SportId } from '@/lib/sports';

export interface Athlete {
  id: string;
  name: string;
  sport: SportId;
  school: string;
  position: string;
  nilScore: number;
  modulesCompleted: number;
  totalModules: number;
  nilDeals: number;
  totalEarned: string;
  initials: string;
  status: 'verified' | 'active' | 'pending';
}

export function useAthletes(sportFilter: SportId | 'all' = 'all') {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAthletes() {
      setLoading(true);
      const supabase = createClient();

      let query = supabase
        .from('athletes')
        .select(`
          id,
          sport,
          school,
          position,
          nil_score,
          modules_completed,
          total_modules,
          nil_deals_count,
          total_earned,
          status,
          profiles!inner(full_name)
        `);

      if (sportFilter !== 'all') {
        query = query.eq('sport', sportFilter);
      }

      const { data, error: fetchError } = await query.order('nil_score', { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      const mapped: Athlete[] = (data ?? []).map((row: any) => {
        const name: string = row.profiles?.full_name ?? 'Unknown Athlete';
        const parts = name.trim().split(' ');
        const initials = parts.length >= 2
          ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
          : name.slice(0, 2).toUpperCase();

        return {
          id: row.id,
          name,
          sport: row.sport as SportId,
          school: row.school,
          position: row.position ?? '',
          nilScore: row.nil_score,
          modulesCompleted: row.modules_completed,
          totalModules: row.total_modules,
          nilDeals: row.nil_deals_count,
          totalEarned: `$${Number(row.total_earned).toLocaleString()}`,
          initials,
          status: row.status as 'verified' | 'active' | 'pending',
        };
      });

      setAthletes(mapped);
      setLoading(false);
    }

    fetchAthletes();
    return () => { cancelled = true; };
  }, [sportFilter]);

  return { athletes, loading, error };
}
