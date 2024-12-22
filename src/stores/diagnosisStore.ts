import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DIAGNOSES } from '../constants/diagnoses';

interface DiagnosisMedication {
  name: string;
  dosage: string;
  interval: string;
  duration: string;
  instructions: string;
}

interface DiagnosisTemplate {
  id: string;
  name: string;
  medications: DiagnosisMedication[];
  labTests: string[];
}

interface DiagnosisStore {
  diagnosisTemplates: DiagnosisTemplate[];
  diagnoses: string[];
  addDiagnosisTemplate: (template: Omit<DiagnosisTemplate, 'id'>) => void;
  updateDiagnosisTemplate: (id: string, template: Partial<DiagnosisTemplate>) => void;
  deleteDiagnosisTemplate: (id: string) => void;
  addDiagnosis: (diagnosis: string) => void;
  removeDiagnosis: (diagnosis: string) => void;
  initializeDiagnoses: () => void;
}

export const useDiagnosisStore = create<DiagnosisStore>()(
  persist(
    (set, get) => ({
      diagnosisTemplates: [],
      diagnoses: [...DIAGNOSES], // Initialize with default diagnoses
      addDiagnosisTemplate: (template) => set((state) => ({
        diagnosisTemplates: [...state.diagnosisTemplates, {
          ...template,
          id: Math.random().toString(36).substr(2, 9)
        }]
      })),
      updateDiagnosisTemplate: (id, template) => set((state) => ({
        diagnosisTemplates: state.diagnosisTemplates.map((t) =>
          t.id === id ? { ...t, ...template } : t
        )
      })),
      deleteDiagnosisTemplate: (id) => set((state) => ({
        diagnosisTemplates: state.diagnosisTemplates.filter((t) => t.id !== id)
      })),
      addDiagnosis: (diagnosis) => set((state) => ({
        diagnoses: [...state.diagnoses, diagnosis]
      })),
      removeDiagnosis: (diagnosis) => set((state) => ({
        diagnoses: state.diagnoses.filter(d => d !== diagnosis)
      })),
      initializeDiagnoses: () => {
        const { diagnoses } = get();
        if (diagnoses.length === 0) {
          set({ diagnoses: [...DIAGNOSES] });
        }
      },
    }),
    {
      name: 'diagnosis-store'
    }
  )
);
