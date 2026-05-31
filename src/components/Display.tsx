import { Text, View } from 'react-native';

interface Props {
    expression: string;
    result: string;
}

export default function Display({ expression, result }: Props) {
    return (
        <View className="flex-1 justify-end p-6 pb-8 gap-2">
            <Text
                className="text-right text-3xl text-zinc-400"
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {expression}
            </Text>
            <Text
                className="text-right text-7xl font-light text-white"
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {result}
            </Text>
        </View>
    );
}