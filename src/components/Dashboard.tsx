import { motion } from 'motion/react';
import { Pill, MapPin, Calendar, MessageSquare, Settings, Heart, Sparkles, Apple } from 'lucide-react';
import { Card } from './ui/card';
import { Screen, UserProfile, Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  onOpenSettings: () => void;
  userProfile: UserProfile | null;
  language: Language;
}

const translations = {
  en: {
    welcome: 'Welcome',
    subtitle: 'How can we help you today?',
    medicine: 'Medicine Reminder',
    medicineDesc: 'Never miss a dose',
    hospitals: 'Nearby Hospitals',
    hospitalsDesc: 'Find care near you',
    appointments: 'Appointments',
    appointmentsDesc: 'Manage your visits',
    chatbot: 'Health Advisor',
    chatbotDesc: 'Ask health questions',
    quickTip: 'Health Tip of the Day',
    tipMessage: 'Stay hydrated! Drink at least 8 glasses of water daily.',
    yourHealth: 'Your Health Journey'
  },
  es: {
    welcome: 'Bienvenido',
    subtitle: '¿Cómo podemos ayudarte hoy?',
    medicine: 'Recordatorio de Medicina',
    medicineDesc: 'Nunca olvides una dosis',
    hospitals: 'Hospitales Cercanos',
    hospitalsDesc: 'Encuentra atención cerca',
    appointments: 'Citas',
    appointmentsDesc: 'Gestiona tus visitas',
    chatbot: 'Asesor de Salud',
    chatbotDesc: 'Pregunta sobre salud',
    quickTip: 'Consejo de Salud del Día',
    tipMessage: '¡Mantente hidratado! Bebe al menos 8 vasos de agua al día.',
    yourHealth: 'Tu Viaje de Salud'
  },
  fr: {
    welcome: 'Bienvenue',
    subtitle: "Comment pouvons-nous vous aider aujourd'hui?",
    medicine: 'Rappel de Médicament',
    medicineDesc: 'Ne manquez jamais une dose',
    hospitals: 'Hôpitaux à Proximité',
    hospitalsDesc: 'Trouvez des soins près de vous',
    appointments: 'Rendez-vous',
    appointmentsDesc: 'Gérez vos visites',
    chatbot: 'Conseiller Santé',
    chatbotDesc: 'Posez des questions santé',
    quickTip: 'Astuce Santé du Jour',
    tipMessage: 'Restez hydraté! Buvez au moins 8 verres d\'eau par jour.',
    yourHealth: 'Votre Parcours Santé'
  },
  hi: {
    welcome: 'स्वागत है',
    subtitle: 'आज हम आपकी कैसे मदद कर सकते हैं?',
    medicine: 'दवा रिमाइंडर',
    medicineDesc: 'कभी खुराक न भूलें',
    hospitals: 'नज़दीकी अस्पताल',
    hospitalsDesc: 'पास में देखभाल खोजें',
    appointments: 'अपॉइंटमेंट',
    appointmentsDesc: 'अपनी यात्राओं को प्रबंधित करें',
    chatbot: 'स्वास्थ्य सलाहकार',
    chatbotDesc: 'स्वास्थ्य प्रश्न पूछें',
    quickTip: 'आज का स्वास्थ्य सुझाव',
    tipMessage: 'हाइड्रेटेड रहें! रोज़ाना कम से कम 8 गिलास पानी पिएं।',
    yourHealth: 'आपकी स्वास्थ्य यात्रा'
  }
};

export function Dashboard({ onNavigate, onOpenSettings, userProfile, language }: DashboardProps) {
  const t = translations[language];

  const features = [
    {
      id: 'medicine' as Screen,
      icon: Pill,
      title: t.medicine,
      desc: t.medicineDesc,
      gradient: 'from-pink-400 via-rose-400 to-red-500',
      shadowColor: 'shadow-pink-500/50',
      iconBg: 'from-pink-500 to-rose-600',
      delay: 0.1
    },
    {
      id: 'hospitals' as Screen,
      icon: MapPin,
      title: t.hospitals,
      desc: t.hospitalsDesc,
      gradient: 'from-blue-400 via-cyan-400 to-teal-500',
      shadowColor: 'shadow-blue-500/50',
      iconBg: 'from-blue-500 to-cyan-600',
      delay: 0.2
    },
    {
      id: 'appointments' as Screen,
      icon: Calendar,
      title: t.appointments,
      desc: t.appointmentsDesc,
      gradient: 'from-purple-400 via-violet-400 to-indigo-500',
      shadowColor: 'shadow-purple-500/50',
      iconBg: 'from-purple-500 to-violet-600',
      delay: 0.3
    },
    {
      id: 'chatbot' as Screen,
      icon: MessageSquare,
      title: t.chatbot,
      desc: t.chatbotDesc,
      gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
      shadowColor: 'shadow-emerald-500/50',
      iconBg: 'from-emerald-500 to-teal-600',
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-cyan-100">
      {/* Header with animated gradient */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white p-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden"
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-white mb-1 flex items-center gap-2"
              >
                <Sparkles className="text-yellow-300" size={28} />
                {t.welcome}, {userProfile?.name || 'User'}!
              </motion.h1>
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-violet-100"
              >
                {t.subtitle}
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onOpenSettings}
              className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl transition-all shadow-lg"
            >
              <Settings size={24} />
            </motion.button>
          </div>
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-4 mt-4 border border-white/30 shadow-xl"
          >
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl mr-4 shadow-lg">
                <Apple className="text-white" size={28} />
              </div>
              <div>
                <p className="text-sm text-violet-100 flex items-center gap-1">
                  <Sparkles size={14} className="text-yellow-300" />
                  {t.quickTip}
                </p>
                <p className="text-white mt-1">{t.tipMessage}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature Cards with 3D effect */}
      <div className="p-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-700 mb-4 flex items-center gap-2"
        >
          <Heart className="text-pink-500" />
          {t.yourHealth}
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: feature.delay, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                onClick={() => onNavigate(feature.id)}
                className={`p-6 cursor-pointer bg-gradient-to-br ${feature.gradient} border-0 shadow-2xl ${feature.shadowColor} hover:shadow-3xl transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-4 shadow-2xl group-hover:shadow-3xl`}
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-white mb-1 drop-shadow-lg">{feature.title}</h3>
                  <p className="text-white/90 text-sm drop-shadow">{feature.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
