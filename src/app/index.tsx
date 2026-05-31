import CalculatorButton from '@/components/CalculatorButton';
import Display from '@/components/Display';
import { useCalculator } from '@/hooks/useCalculator';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const calc = useCalculator();

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-black"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center px-6 py-2">
        <Text className="text-white text-xl font-medium">Standard</Text>
        <View className="flex-row gap-2">
          <Link href="/scientific" asChild>
            <Pressable className="bg-zinc-800 px-4 py-2 rounded-full active:opacity-70">
              <Text className="text-white font-medium">Sci</Text>
            </Pressable>
          </Link>
          <Link href="/currency" asChild>
            <Pressable className="bg-zinc-800 px-4 py-2 rounded-full active:opacity-70">
              <Text className="text-white font-medium">Cur</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Display Section */}
      <Display expression={calc.expression} result={calc.currentValue} />

      {/* Keypad Section */}
      <View className="px-4 pb-8 gap-4">
        {/* Row 1 */}
        <View className="flex-row justify-between">
          <CalculatorButton label="AC" variant="action" onPress={calc.clear} />
          <CalculatorButton label="+/-" variant="action" onPress={calc.toggleSign} />
          <CalculatorButton label="%" variant="action" onPress={calc.percentage} />
          <CalculatorButton label="÷" variant="operator" onPress={() => calc.chooseOperator('÷')} />
        </View>

        {/* Row 2 */}
        <View className="flex-row justify-between">
          <CalculatorButton label="7" onPress={() => calc.addNumber('7')} />
          <CalculatorButton label="8" onPress={() => calc.addNumber('8')} />
          <CalculatorButton label="9" onPress={() => calc.addNumber('9')} />
          <CalculatorButton label="×" variant="operator" onPress={() => calc.chooseOperator('×')} />
        </View>

        {/* Row 3 */}
        <View className="flex-row justify-between">
          <CalculatorButton label="4" onPress={() => calc.addNumber('4')} />
          <CalculatorButton label="5" onPress={() => calc.addNumber('5')} />
          <CalculatorButton label="6" onPress={() => calc.addNumber('6')} />
          <CalculatorButton label="-" variant="operator" onPress={() => calc.chooseOperator('-')} />
        </View>

        {/* Row 4 */}
        <View className="flex-row justify-between">
          <CalculatorButton label="1" onPress={() => calc.addNumber('1')} />
          <CalculatorButton label="2" onPress={() => calc.addNumber('2')} />
          <CalculatorButton label="3" onPress={() => calc.addNumber('3')} />
          <CalculatorButton label="+" variant="operator" onPress={() => calc.chooseOperator('+')} />
        </View>

        {/* Row 5 */}
        <View className="flex-row justify-between">
          <CalculatorButton label="0" doubleWidth onPress={() => calc.addNumber('0')} />
          <CalculatorButton label="." onPress={() => calc.addNumber('.')} />
          <CalculatorButton label="=" variant="operator" onPress={calc.calculate} />
        </View>
      </View>
    </View>
  );
}