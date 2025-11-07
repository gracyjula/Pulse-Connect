import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Clock, Pill, Trash2, Settings, Bell, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MedicineReminderProps {
  onBack: () => void;
  onOpenSettings: () => void;
  language: Language;
}

interface Reminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  color: string;
}

const translations = {
  en: {
    title: 'Medicine Reminder',
    subtitle: 'Never miss your medication',
    addNew: 'Add New Reminder',
    noReminders: 'No reminders yet',
    startAdding: 'Start by adding your first medicine reminder',
    medicineName: 'Medicine Name',
    dosage: 'Dosage',
    time: 'Time',
    frequency: 'Frequency',
    save: 'Save Reminder',
    daily: 'Daily',
    twiceDaily: 'Twice Daily',
    weekly: 'Weekly',
    success: '✨ Reminder added successfully!',
    deleted: '🗑️ Reminder deleted',
    activeReminders: 'Active Reminders'
  },
  es: {
    title: 'Recordatorio de Medicina',
    subtitle: 'Nunca olvides tu medicación',
    addNew: 'Agregar Nuevo Recordatorio',
    noReminders: 'Aún no hay recordatorios',
    startAdding: 'Comienza agregando tu primer recordatorio de medicina',
    medicineName: 'Nombre del Medicamento',
    dosage: 'Dosis',
    time: 'Hora',
    frequency: 'Frecuencia',
    save: 'Guardar Recordatorio',
    daily: 'Diario',
    twiceDaily: 'Dos Veces al Día',
    weekly: 'Semanal',
    success: '✨ ¡Recordatorio agregado exitosamente!',
    deleted: '🗑️ Recordatorio eliminado',
    activeReminders: 'Recordatorios Activos'
  },
  fr: {
    title: 'Rappel de Médicament',
    subtitle: 'Ne manquez jamais votre médicament',
    addNew: 'Ajouter un Nouveau Rappel',
    noReminders: 'Pas encore de rappels',
    startAdding: 'Commencez par ajouter votre premier rappel de médicament',
    medicineName: 'Nom du Médicament',
    dosage: 'Dosage',
    time: 'Heure',
    frequency: 'Fréquence',
    save: 'Enregistrer le Rappel',
    daily: 'Quotidien',
    twiceDaily: 'Deux Fois par Jour',
    weekly: 'Hebdomadaire',
    success: '✨ Rappel ajouté avec succès!',
    deleted: '🗑️ Rappel supprimé',
    activeReminders: 'Rappels Actifs'
  },
  hi: {
    title: 'दवा रिमाइंडर',
    subtitle: 'अपनी दवा कभी न भूलें',
    addNew: 'नया रिमाइंडर जोड़ें',
    noReminders: 'अभी तक कोई रिमाइंडर नहीं',
    startAdding: 'अपना पहला दवा रिमाइंडर जोड़कर शुरू करें',
    medicineName: 'दवा का नाम',
    dosage: 'खुराक',
    time: 'समय',
    frequency: 'आवृत्ति',
    save: 'रिमाइंडर सहेजें',
    daily: 'दैनिक',
    twiceDaily: 'दिन में दो बार',
    weekly: 'साप्ताहिक',
    success: '✨ रिमाइंडर सफलतापूर्वक जोड़ा गया!',
    deleted: '🗑️ रिमाइंडर हटाया गया',
    activeReminders: 'सक्रिय रिमाइंडर'
  }
};

const pillColors = [
  'from-pink-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-purple-400 to-violet-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-indigo-400 to-purple-500'
];

export function MedicineReminder({ onBack, onOpenSettings, language }: MedicineReminderProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      name: 'Aspirin',
      dosage: '100mg',
      time: '08:00 AM',
      frequency: 'Daily',
      color: pillColors[0]
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    name: '',
    dosage: '',
    time: '',
    frequency: 'Daily'
  });
  const t = translations[language];

  const handleAddReminder = () => {
    if (newReminder.name && newReminder.dosage && newReminder.time) {
      const randomColor = pillColors[Math.floor(Math.random() * pillColors.length)];
      setReminders([
        ...reminders,
        {
          id: Date.now().toString(),
          ...newReminder,
          color: randomColor
        }
      ]);
      setNewReminder({ name: '', dosage: '', time: '', frequency: 'Daily' });
      setIsDialogOpen(false);
      toast.success(t.success, {
        duration: 3000,
      });
    }
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success(t.deleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100">
      {/* Header with image */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white p-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBpbGxzJTIwbWVkaWNpbmV8ZW58MXx8fHwxNzYwNjE3OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Medicine"
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
              <Pill className="text-pink-200" />
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
          <p className="text-pink-100 text-center">{t.subtitle}</p>
        </div>
      </motion.div>

      <div className="p-6">
        {/* Add Button with animation */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full mb-6 h-14 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 shadow-2xl shadow-pink-500/50 text-lg">
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
          <DialogContent className="bg-gradient-to-br from-white to-pink-50 border-2 border-pink-200 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 flex items-center gap-2">
                <Pill className="text-pink-500" />
                {t.addNew}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Label className="text-slate-700">{t.medicineName}</Label>
                <Input
                  placeholder="e.g., Aspirin"
                  value={newReminder.name}
                  onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
                  className="mt-2 border-pink-300 focus:border-pink-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Label className="text-slate-700">{t.dosage}</Label>
                <Input
                  placeholder="e.g., 100mg"
                  value={newReminder.dosage}
                  onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
                  className="mt-2 border-pink-300 focus:border-pink-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Label className="text-slate-700">{t.time}</Label>
                <Input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="mt-2 border-pink-300 focus:border-pink-500"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Label className="text-slate-700">{t.frequency}</Label>
                <Select value={newReminder.frequency} onValueChange={(val) => setNewReminder({ ...newReminder, frequency: val })}>
                  <SelectTrigger className="mt-2 border-pink-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">{t.daily}</SelectItem>
                    <SelectItem value="Twice Daily">{t.twiceDaily}</SelectItem>
                    <SelectItem value="Weekly">{t.weekly}</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={handleAddReminder} 
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg"
                >
                  <CheckCircle2 className="mr-2" size={20} />
                  {t.save}
                </Button>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-xl"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Pill className="mx-auto text-pink-300 mb-4" size={80} />
            </motion.div>
            <h3 className="text-slate-600 mb-2">{t.noReminders}</h3>
            <p className="text-slate-400">{t.startAdding}</p>
          </motion.div>
        ) : (
          <>
            <h3 className="text-slate-700 mb-4 flex items-center gap-2">
              <Bell className="text-pink-500" />
              {t.activeReminders}
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {reminders.map((reminder, index) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ x: -20, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 100, opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className={`p-5 border-0 bg-gradient-to-br ${reminder.color} shadow-2xl hover:shadow-3xl transition-all`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <motion.div 
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="bg-white/30 backdrop-blur-sm p-2 rounded-xl mr-3"
                            >
                              <Pill className="text-white" size={24} />
                            </motion.div>
                            <h3 className="text-white drop-shadow-lg">{reminder.name}</h3>
                          </div>
                          <p className="text-white/90 mb-3 ml-14">{reminder.dosage}</p>
                          <div className="flex items-center gap-4 ml-14">
                            <div className="flex items-center text-sm text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <Clock className="mr-2" size={16} />
                              {reminder.time}
                            </div>
                            <Badge className="bg-white/30 text-white backdrop-blur-sm border-0">
                              <Bell className="mr-1" size={12} />
                              {reminder.frequency}
                            </Badge>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteReminder(reminder.id)}
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
