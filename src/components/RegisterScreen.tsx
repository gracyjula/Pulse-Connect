import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, UserPlus, ArrowLeft, Sparkles, Shield, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logo from 'figma:asset/478e7018fa9a3fd3be3a7b822176c2900777b0a7.png';
import { Language } from '../App';

interface RegisterScreenProps {
  onRegister: (name: string, email: string, password: string) => void;
  onBackToLogin: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Create Account',
    subtitle: 'Join PulseConnect today',
    name: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    register: 'Create Account',
    haveAccount: 'Already have an account?',
    login: 'Login',
    passwordMismatch: 'Passwords do not match'
  },
  es: {
    title: 'Crear Cuenta',
    subtitle: 'Únete a PulseConnect hoy',
    name: 'Nombre Completo',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    register: 'Crear Cuenta',
    haveAccount: '¿Ya tienes una cuenta?',
    login: 'Iniciar Sesión',
    passwordMismatch: 'Las contraseñas no coinciden'
  },
  fr: {
    title: 'Créer un Compte',
    subtitle: "Rejoignez PulseConnect aujourd'hui",
    name: 'Nom Complet',
    email: 'Adresse E-mail',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    register: 'Créer un Compte',
    haveAccount: 'Vous avez déjà un compte?',
    login: 'Connexion',
    passwordMismatch: 'Les mots de passe ne correspondent pas'
  },
  hi: {
    title: 'खाता बनाएं',
    subtitle: 'आज PulseConnect में शामिल हों',
    name: 'पूरा नाम',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    register: 'खाता बनाएं',
    haveAccount: 'पहले से खाता है?',
    login: 'लॉगिन',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते'
  }
};

export function RegisterScreen({ onRegister, onBackToLogin, language }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }
    onRegister(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-cyan-100 to-purple-200 p-6 flex flex-col relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-0 w-64 h-64 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-0 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        <motion.button
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBackToLogin}
          className="flex items-center text-slate-700 mb-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t.login}
        </motion.button>

        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full blur-2xl opacity-40" />
            <img src={logo} alt="PulseConnect" className="w-32 h-32 object-contain relative z-10 drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="text-center mb-6">
            <motion.h1 
              className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-purple-600 mb-2 flex items-center justify-center gap-2"
            >
              <Sparkles className="text-teal-500" size={28} />
              {t.title}
            </motion.h1>
            <p className="text-slate-700 flex items-center justify-center gap-2">
              <Shield className="text-purple-500" size={18} />
              {t.subtitle}
            </p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Label htmlFor="name" className="text-slate-700">
                {t.name}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 border-2 border-teal-300 focus:border-teal-500 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm"
                required
              />
            </motion.div>

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
                className="h-14 border-2 border-teal-300 focus:border-teal-500 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm"
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
                  className="h-14 border-2 border-teal-300 focus:border-teal-500 rounded-2xl pr-14 shadow-lg bg-white/80 backdrop-blur-sm"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Label htmlFor="confirmPassword" className="text-slate-700">
                {t.confirmPassword}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  className="h-14 border-2 border-teal-300 focus:border-teal-500 rounded-2xl pr-14 shadow-lg bg-white/80 backdrop-blur-sm"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </motion.button>
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600 hover:from-emerald-700 hover:via-teal-700 hover:to-purple-700 text-white text-lg shadow-2xl shadow-teal-500/50 rounded-2xl"
              >
                <CheckCircle className="mr-2" size={22} />
                {t.register}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-slate-600">
              {t.haveAccount}{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBackToLogin}
                className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600"
              >
                {t.login}
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
