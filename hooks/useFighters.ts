'use client';

import { useState, useEffect, useCallback } from 'react';
import { Fighter } from '@/types';

export interface FighterFilters {
  weightClass?: string;
  search?: string;
  sortBy?: 'salary' | 'projectedPoints' | 'ownership';
  order?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}

interface UseFightersResult {
  fighters: Fighter[];
  loading: boolean;
  error: string | null;
  filters: FighterFilters;
  setFilters: (filters: Partial<FighterFilters>) => void;
  totalCount: number;
  totalPages: number;
  refetch: () => void;
}

const DEFAULT_FILTERS: FighterFilters = {
  sortBy: 'projectedPoints',
  order: 'desc',
  limit: 50,
  page: 1,
};

export function useFighters(initialFilters: FighterFilters = {}): UseFightersResult {
  const [filters, setFiltersState] = useState<FighterFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFighters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.weightClass) params.set('weightClass', filters.weightClass);
      if (filters.search) params.set('search', filters.search);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      if (filters.order) params.set('order', filters.order);
      if (filters.limit) params.set('limit', String(filters.limit));
      if (filters.page) params.set('page', String(filters.page));

      const response = await fetch(`/api/fighters?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch fighters');

      const data = await response.json() as {
        fighters: Fighter[];
        totalCount: number;
        totalPages: number;
      };

      setFighters(data.fighters);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFighters();
  }, [fetchFighters]);

  const setFilters = useCallback((updates: Partial<FighterFilters>) => {
    setFiltersState((prev) => ({
      ...prev,
      ...updates,
      // Reset page when filter changes (but not when page itself changes)
      page: updates.page ?? (updates.weightClass !== undefined || updates.search !== undefined ? 1 : prev.page),
    }));
  }, []);

  return {
    fighters,
    loading,
    error,
    filters,
    setFilters,
    totalCount,
    totalPages,
    refetch: fetchFighters,
  };
}
