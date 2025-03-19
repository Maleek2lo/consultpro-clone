import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import PaymentModal from './PaymentModal';

const Products = () => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string } | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleStartTrial = (title: string, price: string) => {
    setSelectedPlan({ title, price });
  };

  return (
    <>
      <section id="products" className="py-32" aria-labelledby="products-title">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 id="products-title" className="text-4xl font-bold mb-4 gradient-text">
              {t.products.title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {Object.entries(t.products.plans).map(([key, plan]) => (
              <motion.div
                key={key}
                className="gradient-border rounded-2xl p-[1px]"
                variants={fadeIn}
              >
                <div className="bg-[#0f0f0f] p-8 rounded-2xl h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-[#64ffda]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold mb-6 gradient-text">{plan.price}</p>
                    <motion.button
                      className="gradient-border rounded-full w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStartTrial(plan.title, plan.price)}
                    >
                      <div className="px-6 py-3 rounded-full">
                        <span>{t.products.cta}</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-20 text-center"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="gradient-border rounded-2xl p-[1px] max-w-3xl mx-auto">
              <div className="bg-[#0f0f0f] p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">{t.products.enterprise.title}</h3>
                <p className="text-gray-400 mb-8">{t.products.enterprise.description}</p>
                <motion.button
                  className="gradient-border rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="px-8 py-3 rounded-full">
                    <span>{t.products.enterprise.cta}</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PaymentModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        planTitle={selectedPlan?.title || ''}
        planPrice={selectedPlan?.price || ''}
      />
    </>
  );
};

export default Products; 