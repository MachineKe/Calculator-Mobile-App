import CalculatorButton from '@/components/CalculatorButton';
import Display from '@/components/Display';
import { useCalculator } from '@/hooks/useCalculator';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScientificScreen() {
    const insets = useSafeAreaInsets();
    const calc = useCalculator();

    return (
        <View
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
            className="flex-1 bg-black"
        >
            {/* Header Section */}
            <View className="flex-row justify-between items-center px-6 py-2">
                <Link href="/" asChild>
                    <Pressable className="bg-zinc-800 px-4 py-2 rounded-full active:opacity-70">
                        <Text className="text-white font-medium">← Standard</Text>
                    </Pressable>
                </Link>
                <Text className="text-white text-xl font-medium">Scientific</Text>
            </View>

            {/* Display Section */}
            <Display expression={calc.expression} result={calc.currentValue} />

            {/* Keypad Section (Scrollable to fit all functions) */}
            <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-2">
                <View className="gap-4">
                    {/* Scientific Rows */}
                    <View className="flex-row justify-between">
                        <CalculatorButton label="sin" variant="action" onPress={() => calc.applyUnaryOperation('sin')} />
                        <CalculatorButton label="cos" variant="action" onPress={() => calc.applyUnaryOperation('cos')} />
                        <CalculatorButton label="tan" variant="action" onPress={() => calc.applyUnaryOperation('tan')} />
                        <CalculatorButton label="x²" variant="action" onPress={() => calc.applyUnaryOperation('square')} />
                    </View>

                    <View className="flex-row justify-between">
                        <CalculatorButton label="ln" variant="action" onPress={() => calc.applyUnaryOperation('ln')} />
                        <CalculatorButton label="log" variant="action" onPress={() => calc.applyUnaryOperation('log')} />
                        <CalculatorButton label="√" variant="action" onPress={() => calc.applyUnaryOperation('sqrt')} />
                        <CalculatorButton label="^" variant="operator" onPress={() => calc.chooseOperator('^')} />
                    </View>

                    {/* Standard Rows */}
                    <View className="flex-row justify-between">
                        <CalculatorButton label="AC" variant="action" onPress={calc.clear} />
                        <CalculatorButton label="+/-" variant="action" onPress={calc.toggleSign} />
                        <CalculatorButton label="%" variant="action" onPress={calc.percentage} />
                        <CalculatorButton label="÷" variant="operator" onPress={() => calc.chooseOperator('÷')} />
                    </View>

                    <View className="flex-row justify-between">
                        <CalculatorButton label="7" onPress={() => calc.addNumber('7')} />
                        <CalculatorButton label="8" onPress={() => calc.addNumber('8')} />
                        <CalculatorButton label="9" onPress={() => calc.addNumber('9')} />
                        <CalculatorButton label="×" variant="operator" onPress={() => calc.chooseOperator('×')} />
                    </View>

                    <View className="flex-row justify-between">
                        <CalculatorButton label="4" onPress={() => calc.addNumber('4')} />
                        <CalculatorButton label="5" onPress={() => calc.addNumber('5')} />
                        <CalculatorButton label="6" onPress={() => calc.addNumber('6')} />
                        <CalculatorButton label="-" variant="operator" onPress={() => calc.chooseOperator('-')} />
                    </View>

                    <View className="flex-row justify-between">
                        <CalculatorButton label="1" onPress={() => calc.addNumber('1')} />
                        <CalculatorButton label="2" onPress={() => calc.addNumber('2')} />
                        <CalculatorButton label="3" onPress={() => calc.addNumber('3')} />
                        <CalculatorButton label="+" variant="operator" onPress={() => calc.chooseOperator('+')} />
                    </View>

                    <View className="flex-row justify-between">
                        <CalculatorButton label="0" doubleWidth onPress={() => calc.addNumber('0')} />
                        <CalculatorButton label="." onPress={() => calc.addNumber('.')} />
                        <CalculatorButton label="=" variant="operator" onPress={calc.calculate} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}