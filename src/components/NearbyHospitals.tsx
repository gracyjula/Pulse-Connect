import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Phone, Navigation, Star, Settings, AlertCircle, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NearbyHospitalsProps {
  onBack: () => void;
  onOpenSettings: () => void;
  language: Language;
}

interface Hospital {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  phone: string;
  emergency: boolean;
  color: string;
}

const translations = {
  en: {
    title: 'Nearby Hospitals',
    subtitle: 'Find care near you',
    enableLocation: 'Enable Location',
    locationPrompt: 'Please enable location services to find nearby hospitals',
    emergency: 'Emergency',
    general: 'General',
    specialist: 'Specialist',
    away: 'away',
    call: 'Call',
    directions: 'Directions',
    hospitalsList: 'Available Hospitals'
  },
  es: {
    title: 'Hospitales Cercanos',
    subtitle: 'Encuentra atención cerca',
    enableLocation: 'Habilitar Ubicación',
    locationPrompt: 'Por favor habilita los servicios de ubicación para encontrar hospitales cercanos',
    emergency: 'Emergencia',
    general: 'General',
    specialist: 'Especialista',
    away: 'de distancia',
    call: 'Llamar',
    directions: 'Direcciones',
    hospitalsList: 'Hospitales Disponibles'
  },
  fr: {
    title: 'Hôpitaux à Proximité',
    subtitle: 'Trouvez des soins près de vous',
    enableLocation: 'Activer la Localisation',
    locationPrompt: 'Veuillez activer les services de localisation pour trouver les hôpitaux à proximité',
    emergency: 'Urgence',
    general: 'Général',
    specialist: 'Spécialiste',
    away: 'à distance',
    call: 'Appeler',
    directions: 'Directions',
    hospitalsList: 'Hôpitaux Disponibles'
  },
  hi: {
    title: 'नज़दीकी अस्पताल',
    subtitle: 'पास में देखभाल खोजें',
    enableLocation: 'स्थान सक्षम करें',
    locationPrompt: 'कृपया नज़दीकी अस्पतालों को खोजने के लिए स्थान सेवाओं को सक्षम करें',
    emergency: 'आपातकालीन',
    general: 'सामान्य',
    specialist: 'विशेषज्ञ',
    away: 'दूर',
    call: 'कॉल करें',
    directions: 'दिशा-निर्देश',
    hospitalsList: 'उपलब्ध अस्पताल'
  }
};

const hospitalColors = [
  'from-red-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-emerald-400 to-teal-500',
  'from-purple-400 to-violet-500'
];

export function NearbyHospitals({ onBack, onOpenSettings, language }: NearbyHospitalsProps) {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const t = translations[language];

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'City General Hospital',
      specialty: 'Emergency & General Care',
      distance: '0.8 km',
      rating: 4.5,
      phone: '+1 234-567-8900',
      emergency: true,
      color: hospitalColors[0]
    },
    {
      id: '2',
      name: 'Memorial Medical Center',
      specialty: 'Cardiology & Surgery',
      distance: '1.2 km',
      rating: 4.7,
      phone: '+1 234-567-8901',
      emergency: false,
      color: hospitalColors[1]
    },
    {
      id: '3',
      name: 'St. Mary\'s Hospital',
      specialty: 'Pediatrics & Maternity',
      distance: '2.5 km',
      rating: 4.3,
      phone: '+1 234-567-8902',
      emergency: true,
      color: hospitalColors[2]
    },
    {
      id: '4',
      name: 'Advanced Care Clinic',
      specialty: 'Orthopedics',
      distance: '3.1 km',
      rating: 4.6,
      phone: '+1 234-567-8903',
      emergency: false,
      color: hospitalColors[3]
    }
  ];

  const handleEnableLocation = () => {
    setLocationEnabled(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white p-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2MDYxNzkyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.button 
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack} 
              className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <h1 className="text-white flex items-center gap-2">
              <Building2 className="text-cyan-200" />
              {t.title}
            </h1>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onOpenSettings} 
              className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl"
            >
              <Settings size={24} />
            </motion.button>
          </div>
          <p className="text-cyan-100 text-center">{t.subtitle}</p>
        </div>
      </motion.div>

      <div className="p-6">
        {!locationEnabled ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-2xl"
          >
            <motion.div 
              className="bg-gradient-to-br from-blue-400 to-cyan-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MapPin className="text-white" size={64} />
            </motion.div>
            <h3 className="text-slate-800 mb-3 px-6">{t.locationPrompt}</h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleEnableLocation}
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 shadow-2xl shadow-blue-500/50 h-12 px-8"
              >
                <Navigation className="mr-2" size={20} />
                {t.enableLocation}
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <h3 className="text-slate-700 mb-4 flex items-center gap-2">
              <MapPin className="text-blue-500" />
              {t.hospitalsList}
            </h3>
            <div className="space-y-4">
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ x: -20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className={`p-5 bg-gradient-to-br ${hospital.color} border-0 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden`}>
                    {/* Animated pulse for emergency hospitals */}
                    {hospital.emergency && (
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="bg-white/30 backdrop-blur-sm p-2 rounded-xl"
                            >
                              <Building2 className="text-white" size={24} />
                            </motion.div>
                            <h3 className="text-white drop-shadow-lg flex-1">{hospital.name}</h3>
                            {hospital.emergency && (
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <Badge className="bg-red-500 text-white border-0 shadow-lg">
                                  <AlertCircle className="mr-1" size={12} />
                                  {t.emergency}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                          <p className="text-white/90 mb-3 ml-14">{hospital.specialty}</p>
                          <div className="flex items-center gap-4 ml-14">
                            <div className="flex items-center text-sm text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <MapPin className="mr-1" size={16} />
                              {hospital.distance} {t.away}
                            </div>
                            <div className="flex items-center text-sm text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <Star className="mr-1 fill-yellow-300 text-yellow-300" size={16} />
                              {hospital.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-14">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Button
                            size="sm"
                            className="w-full bg-white/90 text-blue-600 hover:bg-white border-0 shadow-lg"
                          >
                            <Phone className="mr-2" size={16} />
                            {t.call}
                          </Button>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Button
                            size="sm"
                            className="w-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 border-0 shadow-lg"
                          >
                            <Navigation className="mr-2" size={16} />
                            {t.directions}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
