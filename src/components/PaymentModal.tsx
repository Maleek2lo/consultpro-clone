import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  planPrice: string;
}

const PaymentForm = ({ planPrice, onClose }: { planPrice: string; onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const amount = parseFloat(planPrice.replace(/[^0-9.]/g, ''));
      const response = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: { name, email },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        alert(language === 'en' ? 'Payment successful!' : 'Paiement réussi !');
        onClose();
      }
    } catch (err) {
      setError(language === 'en' ? 'Payment failed' : 'Échec du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="gradient-border rounded-2xl">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'en' ? 'Full Name' : 'Nom Complet'}
            className="w-full px-4 py-3 rounded-2xl"
            required
          />
        </div>
        <div className="gradient-border rounded-2xl">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'en' ? 'Email Address' : 'Adresse Email'}
            className="w-full px-4 py-3 rounded-2xl"
            required
          />
        </div>
        <div className="gradient-border rounded-2xl p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <Lock className="h-4 w-4" />
        <span>{language === 'en' ? 'Secure payment processing' : 'Paiement sécurisé'}</span>
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || loading}
        className="gradient-border rounded-full w-full disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="px-6 py-3 rounded-full">
          <span>
            {loading
              ? (language === 'en' ? 'Processing...' : 'Traitement...')
              : (language === 'en' ? 'Start Trial' : 'Commencer l\'essai')}
          </span>
        </div>
      </motion.button>
    </form>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planTitle,
  planPrice,
}) => {
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

              <Elements stripe={stripePromise}>
                <PaymentForm planPrice={planPrice} onClose={onClose} />
              </Elements>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal; 