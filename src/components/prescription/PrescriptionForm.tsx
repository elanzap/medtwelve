import React, { useState, useEffect } from 'react';
import { VitalSignsForm } from './VitalSignsForm';
import { DiagnosisForm } from './DiagnosisForm';
import { MedicationList } from './MedicationList';
import { LabTestList } from './LabTestList';
import { PrescriptionActions } from './PrescriptionActions';
import { usePrescription } from '../../hooks/usePrescription';
import { generateVisitId, generatePrescriptionId } from '../../utils/idGenerator';
import type { DiagnosisTemplate } from '../../types';

interface PrescriptionFormProps {
  patientId: string;
  onSubmit: (prescriptionData: any) => void;
  initialData?: any;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  patientId, 
  onSubmit,
  initialData 
}) => {
  const [ids] = useState(() => ({
    visitId: initialData?.visitId || generateVisitId(),
    prescriptionId: initialData?.prescriptionId || generatePrescriptionId()
  }));
  
  const { 
    prescription, 
    updateVitalSigns, 
    updateSymptoms, 
    updateDiagnoses,
    updateMedications,
    updateLabTests
  } = usePrescription(
    patientId,
    {
      ...initialData,
      visitId: ids.visitId,
      prescriptionId: ids.prescriptionId,
    }
  );

  const handleTemplateSelect = (template: DiagnosisTemplate) => {
    // Add template medications to existing medications
    const currentMedications = prescription.medications || [];
    const newMedications = [...currentMedications, ...template.medications];
    updateMedications(newMedications);

    // Add template lab tests to existing lab tests
    const currentLabTests = prescription.labTests || [];
    const newLabTests = Array.from(new Set([...currentLabTests, ...template.labTests]));
    updateLabTests(newLabTests);
  };

  const handleSubmit = (data: any) => {
    onSubmit({
      ...data,
      visitId: ids.visitId,
      prescriptionId: ids.prescriptionId,
    });
  };

  return (
    <form className="space-y-8">
      <div className="bg-gray-50 px-4 py-2 rounded-md">
        <p className="text-sm text-gray-600">Visit ID: {ids.visitId}</p>
        <p className="text-sm text-gray-600">Prescription ID: {ids.prescriptionId}</p>
      </div>

      <VitalSignsForm
        value={prescription.vitalSigns || {}}
        onChange={updateVitalSigns}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Symptoms</label>
        <textarea
          value={prescription.symptoms || ''}
          onChange={(e) => updateSymptoms(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <DiagnosisForm
        value={prescription.diagnoses || []}
        onChange={updateDiagnoses}
        onTemplateSelect={handleTemplateSelect}
      />

      {prescription.medications && (
        <MedicationList 
          medications={prescription.medications} 
          onUpdate={updateMedications}
        />
      )}

      {prescription.labTests && prescription.labTests.length > 0 && (
        <LabTestList labTests={prescription.labTests} />
      )}

      <PrescriptionActions
        prescription={prescription}
        onSave={handleSubmit}
      />
    </form>
  );
};
