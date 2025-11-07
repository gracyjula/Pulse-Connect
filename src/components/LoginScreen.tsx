import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Heart, Sparkles, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logo from 'figma:asset/478e7018fa9a3fd3be3a7b822176c2900777b0a7.png';
import { Language } from '../App';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  language: Language;
}

const translations = {
  en: {
    welcome: 'Welcome Back',
    subtitle: 'Login to access your health companion',
    email: 'Email Address',
    password: 'Password',
    login: 'Login',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    demo: 'Demo: Use any email and password'
  },
  es: {
    welcome: 'Bienvenido de Nuevo',
    subtitle: 'Inicia sesión para acceder a tu compañero de salud',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    login: 'Iniciar Sesión',
    noAccount: '¿No tienes una cuenta?',
    signUp: 'Registrarse',
    demo: 'Demo: Usa cualquier correo y contraseña'
  },
  fr: {
    welcome: 'Bon Retour',
    subtitle: 'Connectez-vous pour accéder à votre compagnon santé',
    email: 'Adresse E-mail',
    password: 'Mot de Passe',
    login: 'Connexion',
    noAccount: "Vous n'avez pas de compte?",
    signUp: "S'inscrire",
    demo: 'Démo: Utilisez n\'importe quel e-mail et mot de passe'
  },
  hi: {
    welcome: 'वापसी पर स्वागत है',
    subtitle: 'अपने स्वास्थ्य साथी तक पहुंचने के लिए लॉगिन करें',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    login: 'लॉगिन',
    noAccount: 'खाता नहीं है?',
    signUp: 'साइन अप करें',
    demo: 'डेमो: कोई भी ईमेल और पासवर्ड उपयोग करें'
  }
};

export function LoginScreen({ onLogin, onRegister, language }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-pink-100 to-orange-100 p-6 flex flex-col relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8 mt-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl opacity-40" />
            <img src={logo} alt="PulseConnect" className="w-36 h-36 object-contain relative z-10 drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-2 flex items-center justify-center gap-2"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity
              }}
            >
              <Sparkles className="text-purple-500" size={28} />
              {t.welcome}
            </motion.h1>
            <p className="text-slate-700 flex items-center justify-center gap-2">
              <Shield className="text-teal-500" size={18} />
              {t.subtitle}
            </p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Label htmlFor="email" className="text-slate-700">
                {t.email}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 border-2 border-purple-300 focus:border-purple-500 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm"
                required
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Label htmlFor="password" className="text-slate-700">
                {t.password}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 border-2 border-purple-300 focus:border-purple-500 rounded-2xl pr-14 shadow-lg bg-white/80 backdrop-blur-sm"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white text-lg shadow-2xl shadow-purple-500/50 rounded-2xl"
              >
                <Heart className="mr-2" size={22} />
                {t.login}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-slate-600 mb-2">
              {t.noAccount}{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRegister}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {t.signUp}
              </motion.button>
            </p>
            <motion.p 
              className="text-xs text-slate-400 mt-4 bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full inline-block"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              {t.demo}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
