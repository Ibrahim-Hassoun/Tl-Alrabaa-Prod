// components/Hero/Hero.jsx
import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 80;
    const y = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const Hero = () => {
  return (
    <div className="hero min-h-screen h-fit flex items-center" id="home">
      <div className="content containers m-auto">
        <motion.h1
          className="text-5xl sm:text-7xl text-tertiary font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Top Quality Polish <br /> Tobacco
        </motion.h1>

        <motion.h4
          className="mt-5 text-tertiary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Made in Erbil
        </motion.h4>

        <motion.hr
          className="w-4/6 m-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.button
          onClick={() => scrollToSection('contact')}
          className="bg-secondary text-tertiary p-2 font-semibold mt-6 w-2/6 rounded-2xl hover:opacity-95 active:opacity-80"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Learn More <br /> About Us
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;