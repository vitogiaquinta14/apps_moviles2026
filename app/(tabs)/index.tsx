import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Contador() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Button title="Incrementar" onPress={() => setCount((prev) => prev + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  count: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});
