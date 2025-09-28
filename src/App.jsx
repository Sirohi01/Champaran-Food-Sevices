import AllRoutes from './routes/AllRoutes';
import { AuthProvider } from './services/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
        <AllRoutes />
    </AuthProvider>
  );
}

export default App;