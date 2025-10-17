import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import api from '../services/api';
import { saveToken } from '../storage';

const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSenhaVisivel, setSenhaVisivel] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !senha) {
        Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
        return;
    }
    setLoading(true);

    try {
        const response = await api.post('/api/auth/login', { email, senha });
        const token = response.data.token; 
        if (token) {
            await saveToken(token); 
            router.replace('/(tabs)/lista'); 
        } else {
            throw new Error("Token não recebido do servidor");
        }
    } catch (error) {
        console.error("--- ERRO NO LOGIN ---", error);
        Alert.alert('Erro no Login', 'E-mail ou senha inválidos.');
    } finally {
        setLoading(false);
    }
  };

 return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text variant="displayMedium" style={styles.title}>MEU-TODO-APP</Text>
            <Text variant="headlineSmall" style={styles.subtitle}>Bem-vindo de volta!</Text>
            <TextInput label="E-mail" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" keyboardType="email-address" autoCapitalize="none" left={<TextInput.Icon icon="email-outline" />} />
            <TextInput label="Senha" value={senha} onChangeText={setSenha} style={styles.input} mode="outlined" secureTextEntry={!isSenhaVisivel} left={<TextInput.Icon icon="lock-outline" />} right={<TextInput.Icon icon={isSenhaVisivel ? 'eye-off' : 'eye'} onPress={() => setSenhaVisivel(!isSenhaVisivel)} />} />
            <Button mode="contained" onPress={handleLogin} style={styles.button} labelStyle={styles.buttonLabel} icon="login" loading={loading} disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
            <Button mode="text" onPress={() => router.push('/registrar')} textColor={theme.colors.primary} disabled={loading}>Criar uma conta</Button>
        </ScrollView>
    </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    title: { textAlign: 'center', fontWeight: 'bold' },
    subtitle: { textAlign: 'center', marginBottom: 32 },
    input: { marginBottom: 16 },
    button: { marginTop: 8, paddingVertical: 4 },
    buttonLabel: { fontSize: 16 },
});

export default TelaLogin;