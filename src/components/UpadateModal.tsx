import React, { useEffect, useState } from 'react';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: { name: string; age: number }) => void;
  username: string;
  defaultAge: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  username,
  defaultAge,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');

  useEffect(() => {
    if (isOpen) {
      setName(username);
      setAge(defaultAge);
    }
  }, [isOpen, username, defaultAge]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name && age !== '') {
      onConfirm({ name, age: Number(age) });
      setName('');
      setAge('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Modifier <span className='text-green-500'>{username}</span></h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrer le nom"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Âge</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Entrer l'âge"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
