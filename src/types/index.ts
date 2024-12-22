// Add DiagnosticTest type
export interface DiagnosticTest {
  id: string;
  name: string;
  price: number;
}

// Add Doctor type
export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  qualification: string;
  registrationNumber: string;
  consultationFee: number;
}

// Add DiagnosisTemplate type
export interface DiagnosisTemplate {
  id: string;
  name: string;
  medications: Medication[];
  labTests: string[];
}

// Rest of the types remain the same...
