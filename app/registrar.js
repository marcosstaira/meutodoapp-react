import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import api from '../services/api';

const TelaRegistro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false); 
    const router = useRouter();
    const theme = useTheme();

    const handleRegistro = async () => {
        if (!email || !senha || !confirmarSenha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        setLoading(true);
        try {
            await api.post('/api/usuarios/registrar', { email, senha });
            Alert.alert('Sucesso!', 'Usuário registrado com sucesso. Faça o login para continuar.');
            router.back();
        } catch (error) {
            console.error("Erro no registro:", error.response?.data || error.message);
            Alert.alert('Erro no Registro', 'Não foi possível registrar o usuário. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text variant="displaySmall" style={styles.title}>Criar Conta</Text>
                <Text variant="bodyLarge" style={styles.subtitle}>Comece a organizar suas tarefas.</Text>
                <TextInput label="E-mail" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" keyboardType="email-address" autoCapitalize="none" left={<TextInput.Icon icon="email-outline" />} />
                <TextInput label="Senha" value={senha} onChangeText={setSenha} style={styles.input} mode="outlined" secureTextEntry left={<TextInput.Icon icon="lock-outline" />} />
                <TextInput label="Confirmar Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} style={styles.input} mode="outlined" secureTextEntry left={<TextInput.Icon icon="lock-check-outline" />} />
                <Button mode="contained" onPress={handleRegistro} style={styles.button} labelStyle={styles.buttonLabel} disabled={loading} loading={loading}>Registrar</Button>
                <Button mode="text" onPress={() => router.back()} textColor={theme.colors.primary} disabled={loading}>Já tenho uma conta (Voltar)</Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    title: { textAlign: 'center', fontWeight: 'bold' },
    subtitle: { textAlign: 'center', marginBottom: 32, color: 'gray' },
    input: { marginBottom: 16 },
    button: { marginTop: 8, paddingVertical: 4 },
    buttonLabel: { fontSize: 16 },
});

export default TelaRegistro;