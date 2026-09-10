import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CardProps = {
  text: string;
};

export function Card({ text }: CardProps) {
  const [selected, setSelected] = useState(false);

  return (
    <Pressable onPress={() => setSelected((prev) => !prev)}>
      <View style={[styles.card, selected && styles.cardSelected]}>
        <Text style={[styles.text, selected && styles.textSelected]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: '#4f46e5',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  textSelected: {
    color: '#ffffff',
  },
});
