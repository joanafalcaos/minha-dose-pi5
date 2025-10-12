import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RegisterVaccin() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastro de Vacinas</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Em breve você poderá cadastrar novas vacinas no sistema.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#002F6C",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  content: { padding: 20 },
  paragraph: { fontSize: 14, marginBottom: 10, textAlign: "justify", color: "#333" },
});
