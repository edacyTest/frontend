import { useState } from "react";
import { useAddUserMutation } from "../slice/security.slice";



export default function AddUser() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [addUser] = useAddUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await addUser({ name, age })
            console.log('xxxxxxxxxxxx', response)
            if (response) {
                alert('success')
            }
        } catch (err: any) {
            setError(err.data.message || 'Something went wrong!'); // Gestion des erreurs
            alert(error)
        } finally {
            setName('')
            setAge(0)
            setLoading(false); // Fin de l'opération
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Ajouter Utilisateur</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            required
                            type="text"
                            id="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Âge</label>
                        <input
                            required
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    // disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Ajouter'}
                    </button>
                </form>
            </div>
        </div>
    )
}

