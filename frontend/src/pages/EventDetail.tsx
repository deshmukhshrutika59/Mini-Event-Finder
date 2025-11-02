// src/pages/EventDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, Loader2 } from 'lucide-react';
import { getEvent, registerForEvent } from '../api/eventApi';
// import { useAuth } from '../context/AuthContext';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  // const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      // ---- Minimal change: fetch from backend API instead of supabase ----
      const data = await getEvent(id!);
      if (!data) {
        setError('Event not found');
      } else {
        setEvent(data);
      }
      // -------------------------------------------------------------------
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!event || !id) return;

    if (event.current_participants >= event.max_participants) {
      alert('This event is already full');
      return;
    }

    try {
      setRegistering(true);

      // ---- Minimal change: call backend register endpoint instead of supabase update ----
      const updated = await registerForEvent(id!);
      setEvent(updated);
      // -------------------------------------------------------------------------------

      alert('Successfully registered for the event!');
    } catch (err: any) {
      alert(err instanceof Error ? err.message : 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error || 'Event not found'}</p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const isFull = event.current_participants >= event.max_participants;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{event.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Date & Time</p>
                  <p className="text-sm font-medium">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Location</p>
                  <p className="text-sm font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center text-slate-600">
                <Users className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Participants</p>
                  <p className="text-sm font-medium">
                    {event.current_participants} / {event.max_participants}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">About This Event</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              {isFull ? (
                <button
                  disabled
                  className="bg-slate-400 text-white px-8 py-3 rounded-lg font-medium cursor-not-allowed"
                >
                  Event Full
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
                >
                  {registering ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register for Event'
                  )}
                </button>
              )}

              {isFull && (
                <p className="text-slate-600">
                  Spots remaining: <span className="font-bold">0</span>
                </p>
              )}
              {!isFull && (
                <p className="text-slate-600">
                  Spots remaining:{' '}
                  <span className="font-bold">
                    {event.max_participants - event.current_participants}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
