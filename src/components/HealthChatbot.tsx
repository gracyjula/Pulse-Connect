import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Bot, User as UserIcon, Settings, Sparkles, Apple, Salad, Heart, Lightbulb, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { UserProfile, Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HealthChatbotProps {
  onBack: () => void;
  onOpenSettings: () => void;
  userProfile: UserProfile | null;
  language: Language;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  foodRecommendations?: FoodRecommendation[];
}

interface FoodRecommendation {
  name: string;
  benefit: string;
  icon: string;
}

const translations = {
  en: {
    title: 'Health Advisor',
    subtitle: 'Get personalized health guidance',
    placeholder: 'Ask a health question...',
    send: 'Send',
    greeting: "Hello! 👋 I'm your personal health advisor. How can I help you today?",
    quickQuestions: ['Check symptoms', 'Food advice', 'Healthy habits', 'Emergency help'],
    foodRecommended: 'Recommended Foods',
    typing: 'Advisor is typing'
  },
  es: {
    title: 'Asesor de Salud',
    subtitle: 'Obtén orientación de salud personalizada',
    placeholder: 'Haz una pregunta de salud...',
    send: 'Enviar',
    greeting: '¡Hola! 👋 Soy tu asesor de salud personal. ¿Cómo puedo ayudarte hoy?',
    quickQuestions: ['Revisar síntomas', 'Consejo de comida', 'Hábitos saludables', 'Ayuda de emergencia'],
    foodRecommended: 'Alimentos Recomendados',
    typing: 'Asesor está escribiendo'
  },
  fr: {
    title: 'Conseiller Santé',
    subtitle: 'Obtenez des conseils santé personnalisés',
    placeholder: 'Posez une question santé...',
    send: 'Envoyer',
    greeting: 'Bonjour! 👋 Je suis votre conseiller santé personnel. Comment puis-je vous aider aujourd\'hui?',
    quickQuestions: ['Vérifier symptômes', 'Conseil alimentaire', 'Habitudes saines', 'Aide d\'urgence'],
    foodRecommended: 'Aliments Recommandés',
    typing: 'Conseiller écrit'
  },
  hi: {
    title: 'स्वास्थ्य सलाहकार',
    subtitle: 'व्यक्तिगत स्वास्थ्य मार्गदर्शन प्राप्त करें',
    placeholder: 'स्वास्थ्य प्रश्न पूछें...',
    send: 'भेजें',
    greeting: 'नमस्ते! 👋 मैं आपका व्यक्तिगत स्वास्थ्य सलाहकार हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    quickQuestions: ['लक्षण जांचें', 'भोजन सलाह', 'स्वस्थ आदतें', 'आपातकालीन मदद'],
    foodRecommended: 'अनुशंसित खाद्य पदार्थ',
    typing: 'सलाहकार लिख रहे हैं'
  }
};

export function HealthChatbot({ onBack, onOpenSettings, userProfile, language }: HealthChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: '1',
        text: t.greeting,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getFoodRecommendations = (condition: string): FoodRecommendation[] => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('blood pressure') || lowerCondition.includes('hypertension')) {
      return [
        { name: 'Bananas', benefit: 'Rich in potassium, helps regulate blood pressure', icon: '🍌' },
        { name: 'Leafy Greens', benefit: 'High in nitrates, relaxes blood vessels', icon: '🥬' },
        { name: 'Berries', benefit: 'Antioxidants reduce blood pressure', icon: '🫐' },
        { name: 'Oatmeal', benefit: 'Fiber helps lower blood pressure', icon: '🥣' }
      ];
    }
    
    if (lowerCondition.includes('headache') || lowerCondition.includes('head pain')) {
      return [
        { name: 'Water', benefit: 'Hydration prevents headaches', icon: '💧' },
        { name: 'Almonds', benefit: 'Magnesium relaxes blood vessels', icon: '🌰' },
        { name: 'Ginger Tea', benefit: 'Anti-inflammatory properties', icon: '🫖' },
        { name: 'Spinach', benefit: 'Rich in B vitamins', icon: '🥬' }
      ];
    }
    
    if (lowerCondition.includes('fever') || lowerCondition.includes('temperature')) {
      return [
        { name: 'Citrus Fruits', benefit: 'Vitamin C boosts immunity', icon: '🍊' },
        { name: 'Chicken Soup', benefit: 'Hydration and nutrients', icon: '🍲' },
        { name: 'Coconut Water', benefit: 'Electrolyte balance', icon: '🥥' },
        { name: 'Honey', benefit: 'Antibacterial properties', icon: '🍯' }
      ];
    }
    
    if (lowerCondition.includes('diet') || lowerCondition.includes('nutrition') || lowerCondition.includes('food')) {
      return [
        { name: 'Salmon', benefit: 'Omega-3 for heart health', icon: '🐟' },
        { name: 'Broccoli', benefit: 'Vitamins and fiber', icon: '🥦' },
        { name: 'Quinoa', benefit: 'Complete protein source', icon: '🌾' },
        { name: 'Avocado', benefit: 'Healthy fats', icon: '🥑' }
      ];
    }
    
    if (lowerCondition.includes('stress') || lowerCondition.includes('anxiety')) {
      return [
        { name: 'Dark Chocolate', benefit: 'Reduces stress hormones', icon: '🍫' },
        { name: 'Green Tea', benefit: 'L-theanine calms mind', icon: '🍵' },
        { name: 'Nuts', benefit: 'Omega-3 reduces anxiety', icon: '🥜' },
        { name: 'Yogurt', benefit: 'Probiotics improve mood', icon: '🥛' }
      ];
    }
    
    if (lowerCondition.includes('energy') || lowerCondition.includes('tired') || lowerCondition.includes('fatigue')) {
      return [
        { name: 'Sweet Potatoes', benefit: 'Complex carbs for energy', icon: '🍠' },
        { name: 'Eggs', benefit: 'Protein and B vitamins', icon: '🥚' },
        { name: 'Brown Rice', benefit: 'Sustained energy release', icon: '🍚' },
        { name: 'Bananas', benefit: 'Natural energy boost', icon: '🍌' }
      ];
    }
    
    return [];
  };

  const generateResponse = (userMessage: string): { text: string; foods?: FoodRecommendation[] } => {
    const lowerMessage = userMessage.toLowerCase();
    const foods = getFoodRecommendations(userMessage);
    
    // Personalized responses based on user profile
    if (userProfile?.medicalConditions?.includes('Hypertension')) {
      if (lowerMessage.includes('blood pressure') || lowerMessage.includes('hypertension')) {
        return {
          text: `⚕️ Since you have hypertension, here's personalized advice:\n\n🔹 Monitor your blood pressure daily (morning & evening)\n🔹 Reduce sodium to less than 2,300mg/day\n🔹 Exercise 30 minutes daily (walking, swimming)\n🔹 Take prescribed medications regularly\n🔹 Manage stress through meditation\n\nBelow are foods that can help manage your blood pressure naturally:`,
          foods
        };
      }
    }

    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      return {
        text: `🤕 For headache relief:\n\n💊 Immediate Steps:\n• Rest in a quiet, dark room\n• Apply cold compress to forehead\n• Stay hydrated - drink water\n• Gentle neck stretches\n\n⚠️ Seek medical care if:\n• Sudden severe headache\n• Vision changes\n• Confusion or fever\n\nThese foods can help prevent and reduce headaches:`,
        foods
      };
    }

    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return {
        text: `🌡️ Fever Management:\n\n✅ What to do:\n• Monitor temperature regularly\n• Stay hydrated with fluids\n• Rest adequately\n• Light, comfortable clothing\n• Take acetaminophen if needed\n\n🚨 Seek medical care if:\n• Fever >103°F (39.4°C)\n• Lasts more than 3 days\n• Accompanied by severe symptoms\n\nRecommended foods to boost immunity:`,
        foods
      };
    }

    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('food')) {
      return {
        text: `🥗 Healthy Diet Guidelines:\n\n🌟 Daily Essentials:\n• 5+ servings of fruits & vegetables\n• Whole grains over refined grains\n• Lean proteins (fish, poultry, beans)\n• Limit processed foods & added sugars\n• 8 glasses of water daily\n\n💡 Meal Planning Tip:\n Fill half your plate with vegetables, quarter with protein, quarter with whole grains.\n\nHere are superfoods to include in your diet:`,
        foods
      };
    }

    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return {
        text: `🏃‍♂️ Exercise Recommendations:\n\n💪 Weekly Goals:\n• 150 min moderate aerobic activity\n• Strength training 2-3x per week\n• Flexibility exercises daily\n• Start slow, increase gradually\n\n📋 Beginner Routine:\n• Monday: 20 min walk\n• Wednesday: Light strength training\n• Friday: 20 min walk\n• Weekend: Stretching or yoga\n\n⚕️ Consult your doctor before starting a new exercise program.`,
        foods: []
      };
    }

    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return {
        text: `😴 Better Sleep Habits:\n\n🌙 Sleep Hygiene:\n• Consistent sleep schedule (even weekends)\n• Bedroom: cool, dark, quiet\n• No screens 1 hour before bed\n• Limit caffeine after 2 PM\n• Relaxing bedtime routine\n\n🧘‍♀️ Relaxation Techniques:\n• Deep breathing exercises\n• Progressive muscle relaxation\n• Meditation or gentle yoga\n\n💡 If sleep problems persist >2 weeks, consult a healthcare provider.`,
        foods: []
      };
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
      return {
        text: `🧠 Stress Management:\n\n✨ Daily Practices:\n• Deep breathing (4-7-8 technique)\n• 10-minute meditation\n• Regular physical activity\n• Maintain social connections\n• Adequate sleep (7-9 hours)\n\n🎯 Quick Stress Relief:\n• Take a short walk\n• Listen to calming music\n• Practice gratitude journaling\n• Talk to a friend\n\n💚 If stress becomes overwhelming, consider professional mental health support.\n\nThese foods can help reduce stress:`,
        foods
      };
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return {
        text: `🚨 MEDICAL EMERGENCIES:\n\n📞 Call 911 Immediately For:\n• Chest pain or pressure\n• Difficulty breathing\n• Severe bleeding\n• Loss of consciousness\n• Stroke symptoms (FAST):\n  - Face drooping\n  - Arm weakness\n  - Speech difficulty\n  - Time to call 911\n• Severe allergic reactions\n\n⚡ DON'T DELAY - Emergencies require immediate medical attention!\n\n💡 Save emergency contacts in your phone now.`,
        foods: []
      };
    }

    // Default response with food suggestions
    return {
      text: `👨‍⚕️ I'm here to help with health guidance!\n\n🎯 I can assist with:\n• Symptom information\n• Diet & nutrition advice\n• Healthy lifestyle tips\n• Exercise recommendations\n• Stress management\n• General wellness\n\n⚕️ Important: This is general guidance, not a substitute for professional medical diagnosis. For specific concerns, please schedule an appointment with your healthcare provider.\n\n💬 What specific health topic would you like to discuss?`,
      foods: []
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        foodRecommendations: response.foods
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBoZWFsdGh8ZW58MXx8fHwxNzYwNTIyMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Wellness"
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
              <Sparkles className="text-yellow-300" />
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
          <p className="text-teal-100 text-center">{t.subtitle}</p>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <UserIcon className="text-white" size={20} />
                  ) : (
                    <Bot className="text-white" size={20} />
                  )}
                </motion.div>
                <div>
                  <Card className={`p-4 shadow-xl ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-0' 
                      : 'bg-white border-2 border-teal-100'
                  }`}>
                    <p className="whitespace-pre-line">{message.text}</p>
                  </Card>
                  
                  {/* Food Recommendations */}
                  {message.foodRecommendations && message.foodRecommendations.length > 0 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border-2 border-orange-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Salad className="text-orange-500" size={20} />
                        <h4 className="text-slate-800">{t.foodRecommended}</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {message.foodRecommendations.map((food, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-xl p-3 flex items-start gap-3 shadow-md hover:shadow-lg transition-all"
                          >
                            <span className="text-3xl">{food.icon}</span>
                            <div>
                              <h5 className="text-slate-800">{food.name}</h5>
                              <p className="text-slate-600 text-sm">{food.benefit}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Bot className="text-white" size={20} />
              </div>
              <Card className="p-4 bg-white border-2 border-teal-100 shadow-xl">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-teal-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-cyan-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm">{t.typing}...</span>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-orange-500" size={18} />
            <p className="text-sm text-slate-700">Quick questions:</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {t.quickQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full h-auto py-3 px-4 border-2 border-teal-300 text-teal-700 hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 hover:text-white hover:border-0 rounded-xl"
                >
                  {question}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t-2 border-teal-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 h-12 border-2 border-teal-300 focus:border-teal-500 rounded-xl"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSend}
              className="h-12 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-lg rounded-xl"
            >
              <Send size={20} />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
