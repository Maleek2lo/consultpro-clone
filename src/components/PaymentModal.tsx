import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  planPrice: string;
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  email: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, planTitle, planPrice }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Limit to 16 digits + 3 spaces
    }

    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Limit CVV to 3 or 4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your payment processor (Stripe, etc.)
    console.log('Payment submitted:', formData);
    // Show success message and close modal
    alert('Payment processed successfully! Your trial will begin shortly.');
    onClose();
  };

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
            className="gradient-border rounded-2xl p-[1px] max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#0f0f0f] p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold gradient-text">{planTitle}</h3>
                  <p className="text-gray-400">{planPrice}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="gradient-border rounded-2xl">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? 'Full Name' : 'Nom Complet'}
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
                      placeholder={language === 'en' ? 'Email Address' : 'Adresse Email'}
                      className="w-full px-4 py-3 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="gradient-border rounded-2xl">
                    <div className="flex items-center px-4">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'Card Number' : 'Numéro de Carte'}
                        className="w-full px-4 py-3 rounded-2xl"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="gradient-border rounded-2xl">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'MM/YY' : 'MM/AA'}
                        className="w-full px-4 py-3 rounded-2xl"
                        required
                      />
                    </div>
                    <div className="gradient-border rounded-2xl">
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        className="w-full px-4 py-3 rounded-2xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>{language === 'en' ? 'Secure payment processing' : 'Paiement sécurisé'}</span>
                </div>

                <motion.button
                  type="submit"
                  className="gradient-border rounded-full w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="px-6 py-3 rounded-full">
                    <span>
                      {language === 'en' ? 'Start Trial' : 'Commencer l\'essai'}
                    </span>
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal; 