import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const id = params.get('id');

    if (token && id) {
      // Save the JWT token (optional: use cookies instead if preferred)
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);

      // Redirect to user dashboard
      navigate(`/user/${id}`);
    } else {
      // If token/id is missing, go back to login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-xl font-semibold">
      Logging you in with Google...
    </div>
  );
};

export default GoogleRedirect;