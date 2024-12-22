import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import type { Medication } from '../../types';

interface MedicationListProps {
  medications: Medication[];
  onUpdate: (medications: Medication[]) => void;
}

export const MedicationList: React.FC<MedicationListProps> = ({ medications, onUpdate }) => {
  const [editingMedication, setEditingMedication] = useState<{ index: number; medication: Medication } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState<Medication>({
    name: '',
    dosage: '',
    interval: '',
    duration: '',
    instructions: ''
  });

  const handleDelete = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    onUpdate(updatedMedications);
  };

  const handleEdit = (index: number) => {
    setEditingMedication({ index, medication: { ...medications[index] } });
  };

  const handleUpdate = () => {
    if (editingMedication) {
      const updatedMedications = [...medications];
      updatedMedications[editingMedication.index] = editingMedication.medication;
      onUpdate(updatedMedications);
      setEditingMedication(null);
    }
  };

  const handleAdd = () => {
    onUpdate([...medications, newMedication]);
    setNewMedication({
      name: '',
      dosage: '',
      interval: '',
      duration: '',
      instructions: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Medications</h3>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Medication
        </button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Dosage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Interval</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Instructions</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {medications.map((medication, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.dosage}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.interval}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.duration}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.instructions}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Medication Modal */}
      {editingMedication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Medication</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingMedication.medication.name}
                    onChange={(e) => setEditingMedication(prev => ({
                      ...prev!,
                      medication: { ...prev!.medication, name: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dosage</label>
                  <input
                    type="text"
                    value={editingMedication.medication.dosage}
                    onChange={(e) => setEditingMedication(prev => ({
                      ...prev!,
                      medication: { ...prev!.medication, dosage: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Interval</label>
                  <input
                    type="text"
                    value={editingMedication.medication.interval}
                    onChange={(e) => setEditingMedication(prev => ({
                      ...prev!,
                      medication: { ...prev!.medication, interval: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={editingMedication.medication.duration}
                    onChange={(e) => setEditingMedication(prev => ({
                      ...prev!,
                      medication: { ...prev!.medication, duration: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Instructions</label>
                  <input
                    type="text"
                    value={editingMedication.medication.instructions}
                    onChange={(e) => setEditingMedication(prev => ({
                      ...prev!,
                      medication: { ...prev!.medication, instructions: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingMedication(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Medication</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dosage</label>
                  <input
                    type="text"
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Interval</label>
                  <input
                    type="text"
                    value={newMedication.interval}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, interval: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={newMedication.duration}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, duration: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Instructions</label>
                  <input
                    type="text"
                    value={newMedication.instructions}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, instructions: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Medication
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
