import { motion } from 'motion/react';
import logo from 'figma:asset/478e7018fa9a3fd3be3a7b822176c2900777b0a7.png';
import { Heart, Sparkles, Activity } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 relative overflow-hidden"
    >
      {/* Animated 3D background elements */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 right-10 w-48 h-48 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.35, 0.2],
          x: [-20, 20, -20],
          y: [20, -20, 20]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/30 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`
          }}
        />
      ))}

      <div className="z-10 flex flex-col items-center">
        {/* Logo with 3D effect */}
        <motion.div
          className="relative"
          initial={{ scale: 0.3, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-3xl opacity-50 scale-110" />
            
            <img
              src={logo}
              alt="PulseConnect Logo"
              className="w-80 h-80 object-contain relative z-10 drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
        
        {/* Title and tagline with gradient text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center px-8 mt-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="text-yellow-300" size={32} />
            <h1 className="text-white text-4xl drop-shadow-2xl">Start Your Journey</h1>
            <Sparkles className="text-yellow-300" size={32} />
          </motion.div>
          
          <motion.p 
            className="text-white text-xl drop-shadow-lg flex items-center justify-center gap-2"
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Heart className="text-pink-200" size={24} />
            Connecting Your Health Needs in One Tap
            <Activity className="text-cyan-200" size={24} />
          </motion.p>
        </motion.div>

        {/* Animated loading indicator */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-16"
        >
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: i * 0.2 
                }}
                className="w-4 h-4 bg-white rounded-full shadow-2xl"
              />
            ))}
          </div>
        </motion.div>

        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="w-96 h-96 border-4 border-white rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
