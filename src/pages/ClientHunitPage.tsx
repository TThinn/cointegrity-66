import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import ClientLogin from '@/components/client/ClientLogin';
import Footer from '@/components/Footer';
import '@/styles/client/client-theme.css';

const ClientHunitPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="client-page">
        <div className="client-container">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-client-secondary">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <ClientLogin />;
  }

  return (
    <div className="client-page">
      <div className="client-container">
        {/* Header */}
        <header className="client-header">
          <div className="flex justify-between items-center">
            <h1 className="client-heading-lg">Hunit Client Portal</h1>
            <button 
              onClick={handleLogout}
              className="client-button-secondary"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="client-section">
          <div className="client-card">
            <h2 className="client-heading-md mb-6">Welcome to Your Dashboard</h2>
            <p className="client-text mb-8">
              This is your secure client portal where you can access exclusive content and resources.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="client-card">
                <h3 className="client-heading-sm mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="client-button w-full">
                    View Reports
                  </button>
                  <button className="client-button w-full">
                    Download Resources
                  </button>
                  <button className="client-button w-full">
                    Contact Support
                  </button>
                </div>
              </div>
              
              <div className="client-card">
                <h3 className="client-heading-sm mb-4">Recent Activity</h3>
                <p className="client-text-muted">
                  No recent activity to display.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ClientHunitPage;