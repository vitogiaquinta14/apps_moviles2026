import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';

const cardTexts = [
  'Luca',
  'Vito',
];

export default function Tarjetas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarjetas</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {cardTexts.map((text) => (
          <Card key={text} text={text} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 16, marginBottom: 8 },
  list: { paddingBottom: 24 },
});
