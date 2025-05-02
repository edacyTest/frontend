
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../slice/security.slice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Vérifier la connexion Internet
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      // Appel à la mutation pour effectuer la connexion
      const response = await loginUser({ username, password }).unwrap();
      if (response) {
        navigate('/home'); // Redirection en cas de succès
      }
    } catch (err: any) {
      setError(err.data.message || 'Something went wrong!'); // Gestion des erreurs
    } finally {
      setLoading(false); // Fin de l'opération
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //       console.log(" userrrrrrrrrrrr:", username)
  //       console.log(" passsssssssword:", password)
  //     const response = await axios.post(
  //       'http://localhost:3000/auth/login',
  //       { uaName: username, uaPassword: password }
  //     );

  //     console.log(" the response ", response)

  //     if (response.status === 200) {
  //       navigate('/home');
  //       console.log(" the response after ", response)
  //     }
  //   } catch (err: any) {
  //       console.log(" the error ", err)
  //     setError(err.response?.data?.message || 'Something went wrong!');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
