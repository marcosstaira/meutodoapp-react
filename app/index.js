import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

const TelaLogin = () => {
  // Estados para armazenar os valores dos inputs
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isSenhaVisivel, setSenhaVisivel] = useState(false);

  // Hook do Expo Router para gerenciar a navegação
  const router = useRouter();
  const theme = useTheme(); // Acessa o tema do React Native Paper

  // Função chamada ao pressionar o botão de login
  const handleLogin = () => {
  

  
    console.log('Tentativa de login com:', { email, senha });


    router.replace('/(tabs)/lista');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="displayMedium" style={styles.title}>
          MEU-TODO-APP
        </Text>
        <Text variant="headlineSmall" style={styles.subtitle}>
          Bem-vindo de volta!
        </Text>

        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" />}
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          mode="outlined"
          secureTextEntry={!isSenhaVisivel} // Esconde a senha
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={isSenhaVisivel ? 'eye-off' : 'eye'}
              onPress={() => setSenhaVisivel(!isSenhaVisivel)}
            />
          }
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          icon="login"
        >
          Entrar
        </Button>

        <Button
          mode="text"
          onPress={() => {}}
          textColor={theme.colors.primary}
        >
          Criar uma conta
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Estilos para os componentes da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default TelaLogin;
