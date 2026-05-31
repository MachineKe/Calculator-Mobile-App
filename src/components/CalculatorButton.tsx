import * as Haptics from 'expo-haptics';
import { Pressable, Text } from 'react-native';

interface Props {
    label: string;
    onPress: () => void;
    variant?: 'number' | 'operator' | 'action';
    doubleWidth?: boolean;
}

export default function CalculatorButton({
    label,
    onPress,
    variant = 'number',
    doubleWidth = false,
}: Props) {
    // Mapped styles for background and text colors
    const variantStyles = {
        number: 'bg-zinc-800 text-white',
        operator: 'bg-orange-500 text-white',
        action: 'bg-zinc-400 text-black',
    };

    const handlePress = () => {
        // Provides a subtle physical tap sensation
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            className={`h-20 items-center justify-center rounded-full active:opacity-70 ${doubleWidth ? 'w-44 items-start pl-8' : 'w-20'
                } ${variantStyles[variant].split(' ')[0]}`}
        >
            <Text className={`font-semibold ${label.length > 2 ? 'text-2xl' : 'text-3xl'} ${variantStyles[variant].split(' ')[1]}`}>
                {label}
            </Text>
        </Pressable>
    );
}