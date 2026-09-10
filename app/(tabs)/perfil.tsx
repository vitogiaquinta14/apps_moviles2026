import { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Perfil() {
  const [nombre, setNombre] = useState('Vito Giaquinta');
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState('');

  function abrirModal() {
    setDraft(nombre);
    setModalVisible(true);
  }

  function guardar() {
    setNombre(draft);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Button title="Cambiar nombre" onPress={abrirModal} />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Cambiar nombre</Text>
            <TextInput
              style={styles.input}
              value={draft}
              onChangeText={setDraft}
              placeholder="Nombre y apellido"
              autoFocus
            />
            <Button title="Guardar" onPress={guardar} />
          </View>
        </View>
      </Modal>
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
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
