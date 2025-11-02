import { Link,useNavigate } from 'react-router-dom';
import { Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl text-slate-900">Event Finder</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/create"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Create Event
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
