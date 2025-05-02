import { User } from "../model/User";

type Props = {
    user: User
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
  };

export default function Card({ user, onEdit, onDelete }: Props) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">Âge: {user.age}</p>
        <div className="flex space-x-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            onClick={() => onEdit(user.id)}
          >
            Modifier
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => onDelete(user.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    );
  }