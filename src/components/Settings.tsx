import { Globe, LogOut, User, Bell } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Language } from '../App';
import { useState } from 'react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

const languageNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी'
};

export function Settings({ isOpen, onClose, language, onLanguageChange, onLogout }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center text-teal-900">
            <User className="mr-2" size={24} />
            Settings
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Language Selection */}
          <div className="space-y-3">
            <Label className="flex items-center text-slate-700">
              <Globe className="mr-2" size={18} />
              Language / Idioma / Langue / भाषा
            </Label>
            <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-slate-700">
              <Bell className="mr-2" size={18} />
              Push Notifications
            </Label>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <Separator />

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <Label className="text-slate-700">
              Dark Mode (Coming Soon)
            </Label>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled />
          </div>

          <Separator />

          {/* App Info */}
          <div className="bg-teal-50 p-4 rounded-xl">
            <h3 className="text-teal-900 mb-2">About PulseConnect</h3>
            <p className="text-sm text-slate-600 mb-1">Version 1.0.0</p>
            <p className="text-sm text-slate-600">
              Connecting Your Health Needs in One Tap
            </p>
          </div>

          {/* Logout Button */}
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
