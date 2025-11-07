import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Calendar as CalendarIcon, Clock, User, Settings, Trash2, CheckCircle, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AppointmentsProps {
  onBack: () => void;
  onOpenSettings: () => void;
  language: Language;
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
  color: string;
}

const translations = {
  en: {
    title: 'Appointments',
    subtitle: 'Manage your medical visits',
    addNew: 'Book New Appointment',
    noAppointments: 'No appointments scheduled',
    startBooking: 'Book your first appointment with a healthcare provider',
    doctorName: 'Doctor Name',
    specialty: 'Specialty',
    date: 'Date',
    time: 'Time',
    location: 'Location',
    save: 'Book Appointment',
    upcoming: 'Upcoming',
    completed: 'Completed',
    success: '✨ Appointment booked successfully!',
    deleted: '🗑️ Appointment cancelled',
    yourAppointments: 'Your Appointments'
  },
  es: {
    title: 'Citas',
    subtitle: 'Gestiona tus visitas médicas',
    addNew: 'Reservar Nueva Cita',
    noAppointments: 'No hay citas programadas',
    startBooking: 'Reserva tu primera cita con un proveedor de salud',
    doctorName: 'Nombre del Doctor',
    specialty: 'Especialidad',
    date: 'Fecha',
    time: 'Hora',
    location: 'Ubicación',
    save: 'Reservar Cita',
    upcoming: 'Próxima',
    completed: 'Completada',
    success: '✨ ¡Cita reservada exitosamente!',
    deleted: '🗑️ Cita cancelada',
    yourAppointments: 'Tus Citas'
  },
  fr: {
    title: 'Rendez-vous',
    subtitle: 'Gérez vos visites médicales',
    addNew: 'Prendre un Nouveau Rendez-vous',
    noAppointments: 'Aucun rendez-vous prévu',
    startBooking: 'Prenez votre premier rendez-vous avec un professionnel de santé',
    doctorName: 'Nom du Médecin',
    specialty: 'Spécialité',
    date: 'Date',
    time: 'Heure',
    location: 'Emplacement',
    save: 'Réserver le Rendez-vous',
    upcoming: 'À venir',
    completed: 'Terminé',
    success: '✨ Rendez-vous réservé avec succès!',
    deleted: '🗑️ Rendez-vous annulé',
    yourAppointments: 'Vos Rendez-vous'
  },
  hi: {
    title: 'अपॉइंटमेंट',
    subtitle: 'अपनी चिकित्सा यात्राओं को प्रबंधित करें',
    addNew: 'नया अपॉइंटमेंट बुक करें',
    noAppointments: 'कोई अपॉइंटमेंट निर्धारित नहीं',
    startBooking: 'स्वास्थ्य सेवा प्रदाता के साथ अपना पहला अपॉइंटमेंट बुक करें',
    doctorName: 'डॉक्टर का नाम',
    specialty: 'विशेषज्ञता',
    date: 'तारीख',
    time: 'समय',
    location: 'स्थान',
    save: 'अपॉइंटमेंट बुक करें',
    upcoming: 'आगामी',
    completed: 'पूर्ण',
    success: '✨ अपॉइंटमेंट सफलतापूर्वक बुक किया गया!',
    deleted: '🗑️ अपॉइंटमेंट रद्द किया गया',
    yourAppointments: 'आपके अपॉइंटमेंट'
  }
};

const appointmentColors = [
  'from-purple-400 to-violet-500',
  'from-blue-400 to-indigo-500',
  'from-pink-400 to-rose-500',
  'from-emerald-400 to-teal-500'
];

export function Appointments({ onBack, onOpenSettings, language }: AppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-10-20',
      time: '10:00 AM',
      location: 'City General Hospital',
      status: 'upcoming',
      color: appointmentColors[0]
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    location: ''
  });
  const t = translations[language];

  const handleAddAppointment = () => {
    if (newAppointment.doctor && newAppointment.date && newAppointment.time) {
      const randomColor = appointmentColors[Math.floor(Math.random() * appointmentColors.length)];
      setAppointments([
        ...appointments,
        {
          id: Date.now().toString(),
          ...newAppointment,
          status: 'upcoming' as const,
          color: randomColor
        }
      ]);
      setNewAppointment({ doctor: '', specialty: '', date: '', time: '', location: '' });
      setIsDialogOpen(false);
      toast.success(t.success);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
    toast.success(t.deleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-white p-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYXBwb2ludG1lbnQlMjBjYWxlbmRhcnxlbnwxfHx8fDE3NjA1OTQwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Appointment"
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
              <CalendarIcon className="text-violet-200" />
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
          <p className="text-purple-100 text-center">{t.subtitle}</p>
        </div>
      </motion.div>

      <div className="p-6">
        {/* Add Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full mb-6 h-14 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 shadow-2xl shadow-purple-500/50 text-lg">
                <motion.div
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Plus className="mr-2" size={24} />
                </motion.div>
                {t.addNew}
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600 flex items-center gap-2">
                <Stethoscope className="text-purple-500" />
                {t.addNew}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="text-slate-700">{t.doctorName}</Label>
                <Input
                  placeholder="e.g., Dr. Smith"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  className="mt-2 border-purple-300 focus:border-purple-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Label className="text-slate-700">{t.specialty}</Label>
                <Input
                  placeholder="e.g., Cardiologist"
                  value={newAppointment.specialty}
                  onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                  className="mt-2 border-purple-300 focus:border-purple-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Label className="text-slate-700">{t.date}</Label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="mt-2 border-purple-300 focus:border-purple-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Label className="text-slate-700">{t.time}</Label>
                <Input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="mt-2 border-purple-300 focus:border-purple-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Label className="text-slate-700">{t.location}</Label>
                <Input
                  placeholder="e.g., City Hospital"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  className="mt-2 border-purple-300 focus:border-purple-500"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={handleAddAppointment} 
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg"
                >
                  <CheckCircle className="mr-2" size={20} />
                  {t.save}
                </Button>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-2xl"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CalendarIcon className="mx-auto text-purple-300 mb-4" size={80} />
            </motion.div>
            <h3 className="text-slate-600 mb-2">{t.noAppointments}</h3>
            <p className="text-slate-400">{t.startBooking}</p>
          </motion.div>
        ) : (
          <>
            <h3 className="text-slate-700 mb-4 flex items-center gap-2">
              <CalendarIcon className="text-purple-500" />
              {t.yourAppointments}
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ x: -20, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 100, opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className={`p-5 bg-gradient-to-br ${appointment.color} border-0 shadow-2xl hover:shadow-3xl transition-all`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="bg-white/30 backdrop-blur-sm p-2 rounded-xl"
                            >
                              <User className="text-white" size={24} />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-white drop-shadow-lg">{appointment.doctor}</h3>
                              <Badge className="bg-white/30 text-white backdrop-blur-sm border-0 mt-1">
                                {appointment.status === 'upcoming' ? t.upcoming : t.completed}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-white/90 mb-3 ml-14">{appointment.specialty}</p>
                          <div className="space-y-2 ml-14">
                            <div className="flex items-center text-sm text-white/90 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl w-fit">
                              <CalendarIcon className="mr-2" size={16} />
                              {appointment.date}
                            </div>
                            <div className="flex items-center text-sm text-white/90 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl w-fit">
                              <Clock className="mr-2" size={16} />
                              {appointment.time}
                            </div>
                            {appointment.location && (
                              <div className="flex items-center text-sm text-white/90 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl w-fit">
                                <Stethoscope className="mr-2" size={16} />
                                {appointment.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-white/70 hover:text-white bg-white/20 backdrop-blur-sm p-3 rounded-xl"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
