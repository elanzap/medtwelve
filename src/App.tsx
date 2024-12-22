import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { PatientList } from './components/patients/PatientList';
import { PrescriptionForm } from './components/prescription/PrescriptionForm';
import { PrescriptionList } from './components/prescription/PrescriptionList';
import { DiagnosisManager } from './components/diagnosis/DiagnosisManager';
import { DoctorList } from './components/doctors/DoctorList';
import { Settings } from './components/settings/Settings';
import { DiagnosticTestList } from './components/diagnostic-tests/DiagnosticTestList';
import type { Patient, Prescription } from './types';
import { loadPatients, savePatients, loadPrescriptions, savePrescriptions } from './utils/storage';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('patients');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedPatients = loadPatients();
    const savedPrescriptions = loadPrescriptions();
    setPatients(savedPatients);
    setPrescriptions(savedPrescriptions);
  }, []);

  // Save patients whenever they change
  useEffect(() => {
    if (patients.length > 0) {
      savePatients(patients);
    }
  }, [patients]);

  // Save prescriptions whenever they change
  useEffect(() => {
    if (prescriptions.length > 0) {
      savePrescriptions(prescriptions);
    }
  }, [prescriptions]);

  const handleAddPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Math.random().toString(36).substr(2, 9),
      visits: []
    };
    setPatients(prevPatients => [...prevPatients, newPatient]);
  };

  const handlePrescriptionSubmit = (prescriptionData: Partial<Prescription>) => {
    setPrescriptions(prevPrescriptions => [...prevPrescriptions, prescriptionData as Prescription]);
    setSelectedPatient(null);
    setActiveSection('prescriptions');
  };

  const handleUpdatePrescription = (index: number, updatedPrescription: Partial<Prescription>) => {
    setPrescriptions(prevPrescriptions => {
      const newPrescriptions = [...prevPrescriptions];
      newPrescriptions[index] = {
        ...newPrescriptions[index],
        ...updatedPrescription,
      };
      return newPrescriptions;
    });
  };

  const renderContent = () => {
    if (selectedPatient) {
      return (
        <>
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                New Prescription for {selectedPatient.name}
              </h2>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Patients
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <PrescriptionForm
              patientId={selectedPatient.id}
              onSubmit={handlePrescriptionSubmit}
            />
          </div>
        </>
      );
    }

    switch (activeSection) {
      case 'patients':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Patients
            </h2>
            <PatientList
              patients={patients}
              prescriptions={prescriptions}
              onSelectPatient={setSelectedPatient}
              onAddPatient={handleAddPatient}
            />
          </div>
        );
      
      case 'prescriptions':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Prescriptions
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <PrescriptionList 
                prescriptions={prescriptions}
                onUpdatePrescription={handleUpdatePrescription}
                patients={patients}
              />
            </div>
          </div>
        );

      case 'doctors':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Doctors
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <DoctorList />
            </div>
          </div>
        );

      case 'diagnoses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Diagnosis Management
            </h2>
            <DiagnosisManager />
          </div>
        );

      case 'diagnostic-tests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Diagnostic Tests
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <DiagnosticTestList />
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Settings
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <Settings />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection}>
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
