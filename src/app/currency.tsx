import CalculatorButton from '@/components/CalculatorButton';
import { getCurrencyInfo } from '@/hooks/currencyData';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CurrencyScreen() {
    const insets = useSafeAreaInsets();
    const calc = useCurrencyConverter();

    // State for the currency selection bottom sheet
    const [isSelecting, setIsSelecting] = useState<'from' | 'to' | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCurrencies = calc.currencies.filter((code) => {
        const info = getCurrencyInfo(code);
        const query = searchQuery.toLowerCase();

        return code.toLowerCase().includes(query) || info.name.toLowerCase().includes(query) || info.country.toLowerCase().includes(query);
    });

    return (
        <View
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
            className="flex-1 bg-black"
        >
            {/* Header Section */}
            <View className="flex-row justify-between items-center px-6 py-2">
                <Link href="/" asChild>
                    <Pressable className="bg-zinc-800 px-4 py-2 rounded-full active:opacity-70">
                        <Text className="text-white font-medium">← Calculator</Text>
                    </Pressable>
                </Link>
                <Text className="text-white text-xl font-medium">Currency</Text>
            </View>

            {/* Display Section */}
            <View className="flex-1 justify-end p-6 pb-8 gap-6">
                <Pressable onPress={() => calc.setFocus('from')} className={`items-end gap-2 ${calc.activeInput === 'from' ? 'opacity-100' : 'opacity-50'}`}>
                    <Pressable
                        onPress={() => setIsSelecting('from')}
                        className="bg-zinc-800 px-4 py-1 rounded-full active:opacity-70"
                    >
                        <Text className="text-zinc-400 text-xl font-bold">
                            {calc.fromCurrency} ▼
                        </Text>
                    </Pressable>
                    <Text
                        className="text-right text-6xl font-light text-white"
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {calc.fromDisplay}
                    </Text>
                </Pressable>

                <View className="flex-row items-center justify-between w-full">
                    <View className="h-px bg-zinc-800 flex-1" />
                    <Pressable
                        onPress={calc.swapCurrencies}
                        className="bg-zinc-800 p-3 rounded-full mx-4 active:opacity-70"
                    >
                        <Text className="text-white text-xl">⇅</Text>
                    </Pressable>
                    <View className="h-px bg-zinc-800 flex-1" />
                </View>

                <Pressable onPress={() => calc.setFocus('to')} className={`items-end gap-2 ${calc.activeInput === 'to' ? 'opacity-100' : 'opacity-50'}`}>
                    <Pressable
                        onPress={() => setIsSelecting('to')}
                        className="bg-zinc-800 px-4 py-1 rounded-full active:opacity-70"
                    >
                        <Text className="text-orange-500 text-xl font-bold">
                            {calc.toCurrency} ▼
                        </Text>
                    </Pressable>
                    <Text
                        className="text-right text-6xl font-light text-orange-500"
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {calc.toDisplay}
                    </Text>
                </Pressable>
            </View>

            {/* Currency Selector Bottom Sheet Modal */}
            <Modal
                visible={!!isSelecting}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsSelecting(null)}
            >
                <View className="flex-1 bg-black/80 justify-end">
                    <View className="bg-zinc-900 h-[85%] rounded-t-3xl p-6 pb-0">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-white text-2xl font-bold">Select Currency</Text>
                            <Pressable onPress={() => setIsSelecting(null)}>
                                <Text className="text-orange-500 text-lg font-medium">Close</Text>
                            </Pressable>
                        </View>
                        <TextInput
                            className="bg-zinc-800 text-white px-4 py-3 rounded-xl mb-4 text-lg"
                            placeholder="Search by country or currency..."
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FlatList
                            data={filteredCurrencies}
                            keyExtractor={(item) => item}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => {
                                const info = getCurrencyInfo(item);
                                return (
                                    <Pressable
                                        className="py-4 border-b border-zinc-800 flex-row justify-between items-center"
                                        onPress={() => {
                                            if (isSelecting === 'from') calc.setFromCurrency(item);
                                            if (isSelecting === 'to') calc.setToCurrency(item);
                                            setIsSelecting(null);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <View className="flex-row items-center gap-4">
                                            <Text className="text-4xl">{info.flag}</Text>
                                            <View>
                                                <Text className="text-white text-lg font-bold">{item} • {info.name}</Text>
                                                <Text className="text-zinc-400">{info.country}</Text>
                                            </View>
                                        </View>
                                        {(isSelecting === 'from' ? calc.fromCurrency : calc.toCurrency) === item && (
                                            <Text className="text-orange-500 text-2xl">✓</Text>
                                        )}
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </View>
            </Modal>

            {/* Specific Currency Keypad Section */}
            <View className="px-4 pb-8 gap-4">
                <View className="flex-row justify-between">
                    <CalculatorButton label="7" onPress={() => calc.addNumber('7')} />
                    <CalculatorButton label="8" onPress={() => calc.addNumber('8')} />
                    <CalculatorButton label="9" onPress={() => calc.addNumber('9')} />
                    <CalculatorButton label="AC" variant="action" onPress={calc.clear} />
                </View>
                <View className="flex-row justify-between">
                    <CalculatorButton label="4" onPress={() => calc.addNumber('4')} />
                    <CalculatorButton label="5" onPress={() => calc.addNumber('5')} />
                    <CalculatorButton label="6" onPress={() => calc.addNumber('6')} />
                    <CalculatorButton label="⌫" variant="action" onPress={calc.deleteNumber} />
                </View>
                <View className="flex-row justify-between">
                    <CalculatorButton label="1" onPress={() => calc.addNumber('1')} />
                    <CalculatorButton label="2" onPress={() => calc.addNumber('2')} />
                    <CalculatorButton label="3" onPress={() => calc.addNumber('3')} />
                    <CalculatorButton label="00" variant="number" onPress={() => calc.addNumber('00')} />
                </View>
                <View className="flex-row justify-between">
                    <CalculatorButton label="0" doubleWidth onPress={() => calc.addNumber('0')} />
                    <CalculatorButton label="." onPress={() => calc.addNumber('.')} />
                    <CalculatorButton label="000" variant="number" onPress={() => calc.addNumber('000')} />
                </View>
            </View>
        </View>
    );
}