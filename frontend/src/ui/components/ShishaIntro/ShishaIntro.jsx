// components/sections/ShishaIntro.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import shisha1 from '../../../assets/shisha1-head.webp';
import shisha2 from '../../../assets/shisha2-head.webp';
import shisha3 from '../../../assets/shisha3-head.jpg';

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  const offset = 80;
  const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: yPosition, behavior: 'smooth' });
};

const ShishaIntro = () => {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const images = [shisha2, shisha1, shisha3];

  return (
    <div className="PartsIntro bg-primary min-h-96 h-fit flex">
      <div className="m-auto w-full">
        <div className="PartsIntro-content w-full containers m-auto flex flex-wrap">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="left w-full sm:w-3/6 min-h-80 rounded-xl flex flex-col pr-4"
          >
            <h1 className="text-tertiary font-extrabold text-5xl text-center pl-7 pt-7">
              Are you Looking <br /> For Shisha?
            </h1>
            <p className="text-tertiary text-center font-thin pl-7 pt-3 capitalize">
              Bowl, Stem, Base and much more... <br />
              Whatever you're looking for, we've Got You.
            </p>
            <button
              className="bg-secondary text-tertiary w-2/6 rounded-lg h-10 m-auto hover:opacity-90 active:opacity-85"
              onClick={() => scrollToSection('shisha')}
            >
              Explore Shisha
            </button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="right w-full sm:w-3/6 min-h-80 rounded-xl flex flex-col"
          >
            <img
              src={images[index - 1]}
              loading="lazy"
              alt="shisha"
              className="h-72 w-fit object-cover rounded-xl mx-auto"
            />
            <ul className="m-auto flex">
              {[1, 2, 3].map((i) => (
                <li
                  key={i}
                  className={`${
                    index === i ? 'bg-tertiary' : 'bg-transparent'
                  } h-2 w-2 rounded-full mr-1 border cursor-pointer`}
                  onClick={() => setIndex(i)}
                ></li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShishaIntro;
