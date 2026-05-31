import { useState } from 'react';

// Mock exchange rates with USD as the base currency
const RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    KES: 131.5,
    ZAR: 18.9,
    NGN: 1140.5,
    JPY: 150.2,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
};

const CURRENCIES = Object.keys(RATES);

export function useCurrencyConverter() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KES');
    const [amount, setAmount] = useState('0');

    const cycleFromCurrency = () => {
        const idx = CURRENCIES.indexOf(fromCurrency);
        setFromCurrency(CURRENCIES[(idx + 1) % CURRENCIES.length]);
    };

    const cycleToCurrency = () => {
        const idx = CURRENCIES.indexOf(toCurrency);
        setToCurrency(CURRENCIES[(idx + 1) % CURRENCIES.length]);
    };

    const addNumber = (num: string) => {
        setAmount((prev) => {
            if (prev === '0' && num !== '.') return num === '00' || num === '000' ? '0' : num;
            if (num === '.' && prev.includes('.')) return prev;
            if (prev.length > 12) return prev; // Limit input length
            return prev + num;
        });
    };

    const deleteNumber = () => {
        setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    };

    const clear = () => setAmount('0');

    const computedValue = parseFloat(amount);
    let convertedAmount = '0';

    if (!isNaN(computedValue)) {
        const inUSD = computedValue / RATES[fromCurrency];
        const out = inUSD * RATES[toCurrency];

        // Format mathematically to 2 decimal places with comma separation
        convertedAmount = out.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return { fromCurrency, toCurrency, amount, convertedAmount, cycleFromCurrency, cycleToCurrency, addNumber, deleteNumber, clear };
}