import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Producto = {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen: ImageSourcePropType;
};

const productos: Producto[] = [
  {
    id: '1',
    titulo: 'Vinilo Californication',
    precio: 45999,
    descripcion: 'El disco estrella de la banda Red Hot Chili Peppers.',
    imagen: require('../../assets/productos/ViniloCalifornication.jpg'),
  },
  {
    id: '2',
    titulo: 'Pelota Jabulani',
    precio: 89999,
    descripcion: 'La pelota usada en el mundial Sudafrica 2010.',
    imagen: require('../../assets/productos/PelotaJabulani.jpg'),
  },
  {
    id: '3',
    titulo: 'Macbook Air 2020',
    precio: 34999,
    descripcion: 'Notebook Macbook Air de la marca Apple.',
    imagen: { uri: 'https://picsum.photos/id/48/600/600' },
  },
  {
    id: '4',
    titulo: 'Zapatillas Converse',
    precio: 62999,
    descripcion: 'Las Converse, las zapatillas de toda la vida.',
    imagen: { uri: 'https://picsum.photos/id/103/600/600' },
  },
  {
    id: '5',
    titulo: 'Jarra para té',
    precio: 12999,
    descripcion: 'Mantiene la temperatura del té hasta por 12 horas.',
    imagen: { uri: 'https://picsum.photos/id/225/600/600' },
  },
];

const resizeModes: ImageResizeMode[] = ['cover', 'contain', 'stretch'];

export default function Galeria() {
  const [filtro, setFiltro] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);
  const [resizeMode, setResizeMode] = useState<ImageResizeMode>('cover');

  const productosFiltrados = useMemo(() => {
    const texto = filtro.trim().toLowerCase();
    if (!texto) return productos;
    return productos.filter((producto) => producto.titulo.toLowerCase().includes(texto));
  }, [filtro]);

  function abrirDetalle(producto: Producto) {
    setResizeMode('cover');
    setSeleccionado(producto);
  }

  function toggleFavorito(id: string) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería</Text>

      <TextInput
        style={styles.buscador}
        value={filtro}
        onChangeText={setFiltro}
        placeholder="Buscar por título..."
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const esFavorito = favoritos.includes(item.id);
          return (
            <Pressable
              style={[styles.item, esFavorito && styles.itemFavorito]}
              onPress={() => abrirDetalle(item)}
              onLongPress={() => toggleFavorito(item.id)}
            >
              <Image source={item.imagen} style={styles.itemImagen} resizeMode="cover" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitulo}>{item.titulo}</Text>
                <Text style={styles.itemPrecio}>${item.precio.toLocaleString('es-AR')}</Text>
              </View>
              {esFavorito && <Text style={styles.favoritoIcono}>★</Text>}
            </Pressable>
          );
        }}
        ListEmptyComponent={<Text style={styles.vacio}>No se encontraron productos.</Text>}
      />

      <Modal
        visible={seleccionado !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSeleccionado(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {seleccionado && (
              <>
                <Image
                  source={seleccionado.imagen}
                  style={styles.modalImagen}
                  resizeMode={resizeMode}
                />
                <Text style={styles.modalTitulo}>{seleccionado.titulo}</Text>
                <Text style={styles.modalDescripcion}>{seleccionado.descripcion}</Text>

                <View style={styles.resizeBotones}>
                  {resizeModes.map((modo) => (
                    <Pressable
                      key={modo}
                      style={[styles.resizeBoton, resizeMode === modo && styles.resizeBotonActivo]}
                      onPress={() => setResizeMode(modo)}
                    >
                      <Text
                        style={[
                          styles.resizeBotonTexto,
                          resizeMode === modo && styles.resizeBotonTextoActivo,
                        ]}
                      >
                        {modo}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable style={styles.cerrarBoton} onPress={() => setSeleccionado(null)}>
                  <Text style={styles.cerrarBotonTexto}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 16, marginBottom: 8 },
  buscador: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  lista: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  itemFavorito: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: '#f0c419',
  },
  itemImagen: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  itemInfo: { flex: 1, gap: 4 },
  itemTitulo: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  itemPrecio: { fontSize: 14, color: '#4f46e5', fontWeight: '600' },
  favoritoIcono: { fontSize: 20, color: '#f0c419' },
  vacio: { textAlign: 'center', color: '#888888', marginTop: 24 },
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
    gap: 12,
  },
  modalImagen: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  modalDescripcion: { fontSize: 14, color: '#555555' },
  resizeBotones: { flexDirection: 'row', gap: 8 },
  resizeBoton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4f46e5',
    alignItems: 'center',
  },
  resizeBotonActivo: { backgroundColor: '#4f46e5' },
  resizeBotonTexto: { color: '#4f46e5', fontWeight: '600', fontSize: 13 },
  resizeBotonTextoActivo: { color: '#ffffff' },
  cerrarBoton: {
    marginTop: 4,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  cerrarBotonTexto: { color: '#ffffff', fontWeight: '600' },
});
