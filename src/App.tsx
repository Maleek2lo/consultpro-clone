import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mail, MessageSquare, ArrowRight, Building2, Code, Globe2, Notebook, Languages, X, Calendar } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type Language = 'en' | 'fr';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: React.ElementType;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, title, description, icon: Icon }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="gradient-border rounded-2xl p-[1px] max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#0f0f0f] p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <Icon className="h-8 w-8 text-[#64ffda]" />
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-400 text-lg">{description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ExpertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  count: string;
  icon: React.ElementType;
  projectsText: string;
}

const ExpertiseModal: React.FC<ExpertiseModalProps> = ({ isOpen, onClose, title, count, icon: Icon, projectsText }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="gradient-border rounded-2xl p-[1px] max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#0f0f0f] p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <Icon className="h-8 w-8 text-[#64ffda]" />
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#64ffda] mb-4">{count}</p>
                <p className="text-gray-400 text-lg">{title} {projectsText}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0f0f0f] p-8 rounded-2xl max-w-md w-full mx-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Schedule a Consultation</h2>
            <div className="space-y-4">
              <p className="text-gray-400">Select a date and time for your consultation:</p>
              <div className="grid grid-cols-7 gap-2">
                {/* Calendar days would go here */}
                {Array.from({ length: 31 }, (_, i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-lg hover:bg-[#1a1a1a] transition-colors"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg gradient-border">
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    icon: React.ElementType;
  } | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<{
    title: string;
    count: string;
    icon: React.ElementType;
  } | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: Building2,
      title: t.services.aec.title,
      description: t.services.aec.description
    },
    {
      icon: Code,
      title: t.services.pm.title,
      description: t.services.pm.description
    },
    {
      icon: Notebook,
      title: t.services.digital.title,
      description: t.services.digital.description
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-sm" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Brain className="h-8 w-8 text-[#4ecdc4]" aria-hidden="true" />
            <span className="text-xl font-bold gradient-text">ConsultPro</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-[#64ffda] transition-colors" aria-label={t.nav.services}>{t.nav.services}</a>
              <a href="#expertise" className="hover:text-[#64ffda] transition-colors" aria-label={t.nav.expertise}>{t.nav.expertise}</a>
              <a href="#contact" className="hover:text-[#64ffda] transition-colors" aria-label={t.nav.contact}>{t.nav.contact}</a>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full gradient-border"
              aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
            >
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20" aria-labelledby="hero-title">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 id="hero-title" className="text-6xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">{t.hero.title}</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <motion.button
              className="gradient-border rounded-full inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}
              aria-label={t.hero.cta}
            >
              <div className="px-8 py-3 rounded-full flex items-center space-x-2">
                <span>{t.hero.cta}</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32" aria-labelledby="services-title">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 id="services-title" className="text-4xl font-bold mb-4">{t.services.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="gradient-border rounded-2xl p-[1px] cursor-pointer"
                variants={fadeIn}
                onClick={() => setSelectedService(service)}
              >
                <div className="bg-[#0f0f0f] p-8 rounded-2xl h-full hover:bg-[#1a1a1a] transition-colors">
                  <service.icon className="h-12 w-12 text-[#64ffda] mb-6" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
        description={selectedService?.description || ''}
        icon={selectedService?.icon || Building2}
      />

      {/* Expertise Section */}
      <section id="expertise" className="py-32" aria-labelledby="expertise-title">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 id="expertise-title" className="text-4xl font-bold mb-4">{t.expertise.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.expertise.subtitle}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Building2, title: t.expertise.architecture, count: '50+' },
              { icon: Code, title: t.expertise.engineering, count: '100+' },
              { icon: Notebook, title: t.expertise.digital, count: '75+' },
              { icon: Globe2, title: t.expertise.global, count: '60+' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="gradient-border rounded-2xl p-[1px] cursor-pointer"
                variants={fadeIn}
                onClick={() => setSelectedExpertise(item)}
              >
                <div className="bg-[#0f0f0f] p-6 rounded-2xl text-center hover:bg-[#1a1a1a] transition-colors">
                  <item.icon className="h-12 w-12 mx-auto text-[#64ffda] mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-[#64ffda] font-bold">{item.count} {t.expertise.projects}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Modal */}
      <ExpertiseModal
        isOpen={!!selectedExpertise}
        onClose={() => setSelectedExpertise(null)}
        title={selectedExpertise?.title || ''}
        count={selectedExpertise?.count || ''}
        icon={selectedExpertise?.icon || Building2}
        projectsText={t.expertise.projects}
      />

      {/* Contact Section */}
      <section id="contact" className="py-32" aria-labelledby="contact-title">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="text-center mb-20">
              <h2 id="contact-title" className="text-4xl font-bold mb-4">{t.contact.title}</h2>
              <p className="text-gray-400">{t.contact.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">{t.contact.info}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-[#64ffda]" aria-hidden="true" />
                    <a href="mailto:contact@consultpro.com" className="hover:text-[#64ffda] transition-colors">
                      contact@consultpro.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-6 w-6 text-[#4ecdc4]" aria-hidden="true" />
                    <span 
                      onClick={() => setIsCalendarOpen(true)}
                      className="hover:text-[#4ecdc4] transition-colors cursor-pointer"
                    >
                      {t.contact.schedule}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="gradient-border rounded-2xl">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.name}
                    className="w-full px-4 py-3 rounded-2xl"
                    required
                  />
                </div>
                <div className="gradient-border rounded-2xl">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.email}
                    className="w-full px-4 py-3 rounded-2xl"
                    required
                  />
                </div>
                <div className="gradient-border rounded-2xl">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.message}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="gradient-border rounded-full inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="px-8 py-3 rounded-full">
                    <span>{t.contact.form.send}</span>
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Brain className="h-8 w-8 text-[#4ecdc4]" />
              <span className="text-xl font-bold gradient-text">ConsultPro</span>
            </div>
            <div className="text-center md:text-right text-gray-400">
              <p>&copy; 2024 ConsultPro. {t.footer.rights}</p>
            </div>
          </div>
        </div>
      </footer>

      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
}

export default App;