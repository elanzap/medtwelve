import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiagnosticTest } from '../types';

interface DiagnosticTestStore {
  tests: DiagnosticTest[];
  addTest: (test: Omit<DiagnosticTest, 'id'>) => void;
  updateTest: (id: string, test: Partial<DiagnosticTest>) => void;
  deleteTest: (id: string) => void;
}

export const useDiagnosticTestStore = create<DiagnosticTestStore>()(
  persist(
    (set) => ({
      tests: [],
      addTest: (test) => set((state) => ({
        tests: [...state.tests, {
          ...test,
          id: Math.random().toString(36).substr(2, 9)
        }]
      })),
      updateTest: (id, test) => set((state) => ({
        tests: state.tests.map((t) =>
          t.id === id ? { ...t, ...test } : t
        )
      })),
      deleteTest: (id) => set((state) => ({
        tests: state.tests.filter((t) => t.id !== id)
      })),
    }),
    {
      name: 'diagnostic-test-store'
    }
  )
);
