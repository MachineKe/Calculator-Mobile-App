import CalculatorButton from '@/components/CalculatorButton';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CurrencyScreen() {
    const insets = useSafeAreaInsets();
    const calc = useCurrencyConverter();

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
                <View className="items-end gap-2">
                    <Pressable
                        onPress={calc.cycleFromCurrency}
                        className="bg-zinc-800 px-4 py-1 rounded-full active:opacity-70"
                    >
                        <Text className="text-zinc-400 text-xl font-bold">
                            {calc.fromCurrency} ⟳
                        </Text>
                    </Pressable>
                    <Text
                        className="text-right text-6xl font-light text-white"
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {calc.amount}
                    </Text>
                </View>

                <View className="h-px bg-zinc-800 w-full" />

                <View className="items-end gap-2">
                    <Pressable
                        onPress={calc.cycleToCurrency}
                        className="bg-zinc-800 px-4 py-1 rounded-full active:opacity-70"
                    >
                        <Text className="text-orange-500 text-xl font-bold">
                            {calc.toCurrency} ⟳
                        </Text>
                    </Pressable>
                    <Text
                        className="text-right text-6xl font-light text-orange-500"
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {calc.convertedAmount}
                    </Text>
                </View>
            </View>

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