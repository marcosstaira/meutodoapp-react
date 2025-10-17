import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const TelaPerfil = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Informações do Usuário</Text>
      <Text style={styles.text}>Aqui você poderá editar seus dados.</Text>
      <Button mode="contained" onPress={() => router.replace('/')} style={styles.button}>Sair (Logout)</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  text: { marginVertical: 16 },
  button: { marginTop: 24 }
});

export default TelaPerfil;