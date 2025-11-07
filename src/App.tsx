import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { Dashboard } from './components/Dashboard';
import { MedicineReminder } from './components/MedicineReminder';
import { NearbyHospitals } from './components/NearbyHospitals';
import { Appointments } from './components/Appointments';
import { HealthChatbot } from './components/HealthChatbot';
import { Settings } from './components/Settings';
import { Toaster } from './components/ui/sonner';

export type Screen = 'welcome' | 'login' | 'register' | 'dashboard' | 'medicine' | 'hospitals' | 'appointments' | 'chatbot';

export type Language = 'en' | 'es' | 'fr' | 'hi';

export interface UserProfile {
  name: string;
  email: string;
  age?: number;
  medicalConditions?: string[];
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Auto-hide welcome screen after 3 seconds
    if (currentScreen === 'welcome') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUserProfile({
      name: email.split('@')[0],
      email: email,
      age: 32,
      medicalConditions: ['Hypertension']
    });
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration
    setUserProfile({
      name: name,
      email: email,
    });
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onComplete={() => setCurrentScreen('login')} />
        )}
        
        {currentScreen === 'login' && (
          <LoginScreen 
            onLogin={handleLogin}
            onRegister={() => setCurrentScreen('register')}
            language={language}
          />
        )}
        
        {currentScreen === 'register' && (
          <RegisterScreen 
            onRegister={handleRegister}
            onBackToLogin={() => setCurrentScreen('login')}
            language={language}
          />
        )}
        
        {currentScreen === 'dashboard' && (
          <Dashboard 
            onNavigate={setCurrentScreen}
            onOpenSettings={() => setShowSettings(true)}
            userProfile={userProfile}
            language={language}
          />
        )}
        
        {currentScreen === 'medicine' && (
          <MedicineReminder 
            onBack={() => setCurrentScreen('dashboard')}
            onOpenSettings={() => setShowSettings(true)}
            language={language}
          />
        )}
        
        {currentScreen === 'hospitals' && (
          <NearbyHospitals 
            onBack={() => setCurrentScreen('dashboard')}
            onOpenSettings={() => setShowSettings(true)}
            language={language}
          />
        )}
        
        {currentScreen === 'appointments' && (
          <Appointments 
            onBack={() => setCurrentScreen('dashboard')}
            onOpenSettings={() => setShowSettings(true)}
            language={language}
          />
        )}
        
        {currentScreen === 'chatbot' && (
          <HealthChatbot 
            onBack={() => setCurrentScreen('dashboard')}
            onOpenSettings={() => setShowSettings(true)}
            userProfile={userProfile}
            language={language}
          />
        )}

        <Settings 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          language={language}
          onLanguageChange={setLanguage}
          onLogout={handleLogout}
        />
        
        <Toaster />
      </div>
    </div>
  );
}

export default App;
