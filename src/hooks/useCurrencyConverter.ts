import { useEffect, useState } from 'react';

// Fallback exchange rates in case the API fetch fails or is offline
const FALLBACK_RATES: Record<string, number> = {
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

export function useCurrencyConverter() {
    const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
    const [currencies, setCurrencies] = useState<string[]>(Object.keys(FALLBACK_RATES));
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KES');
    const [amount, setAmount] = useState('0');
    const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch live exchange rates. Open Exchange Rates API provides daily updates for free without a key.
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => {
                if (data && data.rates) {
                    setRates(data.rates);
                    setCurrencies(Object.keys(data.rates));
                }
            })
            .catch(err => console.warn('Failed to fetch live rates, using offline fallback.', err))
            .finally(() => setIsLoading(false));
    }, []);

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
    let fromDisplay = '0';
    let toDisplay = '0';

    if (!isNaN(computedValue) && rates[fromCurrency] && rates[toCurrency]) {
        if (activeInput === 'from') {
            fromDisplay = amount;
            const inUSD = computedValue / rates[fromCurrency];
            const out = inUSD * rates[toCurrency];
            toDisplay = out.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        } else {
            toDisplay = amount;
            const inUSD = computedValue / rates[toCurrency];
            const out = inUSD * rates[fromCurrency];
            fromDisplay = out.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
    } else {
        fromDisplay = activeInput === 'from' ? amount : '0';
        toDisplay = activeInput === 'to' ? amount : '0';
    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const setFocus = (section: 'from' | 'to') => {
        if (activeInput !== section) {
            setActiveInput(section);
            setAmount(section === 'from' ? fromDisplay.replace(/,/g, '') : toDisplay.replace(/,/g, ''));
        }
    };

    return {
        currencies,
        fromCurrency,
        toCurrency,
        setFromCurrency,
        setToCurrency,
        fromDisplay,
        toDisplay,
        activeInput,
        setFocus,
        swapCurrencies,
        addNumber,
        deleteNumber,
        clear,
        isLoading
    };
}