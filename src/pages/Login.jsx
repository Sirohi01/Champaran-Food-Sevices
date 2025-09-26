import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('auth', 'true');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl border">
        <h1 className="text-xl font-semibold mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-6">Temporary demo login for protected pages.</p>
        <button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;


