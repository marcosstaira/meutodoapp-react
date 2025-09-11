import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';

import { StyleSheet, View } from 'react-native';

const TelaPerfil = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Informações do Usuário</Text>
      <Text style={styles.text}>Aqui você poderá editar seus dados.</Text>
      
      {/* Botão de Logout que leva de volta para a tela de login */}
      <Button
        mode="contained"
        onPress={() => router.replace('/')} // 'replace' impede de voltar para o app
        style={styles.button}
      >
        Sair (Logout)
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginVertical: 16,
  },
  button: {
    marginTop: 24,
  }
});

export default TelaPerfil;