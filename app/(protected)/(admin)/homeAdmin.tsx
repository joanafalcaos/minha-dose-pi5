import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useUserStore } from '../../store/useUserStore';

const { width } = Dimensions.get('window');

const images = [
  require("../../../assets/images/splash-icon.png"),
  require("../../../assets/images/splash-icon.png"),
  require("../../../assets/images/splash-icon.png"),
];

export default function HomeAdmin() {
  const user = useUserStore((state) => state.user);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchName = async () => {
      try {
        const response = await axios.get(
          `https://minha-dose-back-s6ae.onrender.com/api/v1/users/${user.id}`
        );
        setName(response.data.name);
      } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
      }
    };

    fetchName();
  }, [user?.id]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Olá, {name || 'Admin'}!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Painel Administrativo</Text>

        <Text style={styles.paragraph}>
          Bem-vindo ao painel de administração. Aqui você pode gerenciar vacinas, cadastros e muito mais.
        </Text>
        <Text style={styles.paragraph}>
          Use o menu abaixo para navegar entre as diferentes funcionalidades do sistema.
        </Text>

        <Carousel
          loop
          width={width}
          height={200}
          autoPlay
          data={images}
          scrollAnimationDuration={1000}
          renderItem={({ item, index }) => (
            <Image key={index} source={item} style={styles.image} resizeMode="contain" />
          )}
        />
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
  welcomeText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  content: { padding: 20 },
  title: { fontSize: 16, fontWeight: "bold", color: "#002F6C", marginBottom: 10 },
  paragraph: { fontSize: 14, marginBottom: 10, textAlign: "justify", color: "#333" },
  image: {
    width: width - 40,
    height: 180,
    alignSelf: "center",
    borderRadius: 8,
  },
});
