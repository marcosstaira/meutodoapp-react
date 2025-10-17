import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Salva o token de autenticação.
 * Usa o localStorage na web e o SecureStore no mobile.
 * @param {string} token - O token JWT a ser salvo.
 */
export async function saveToken(token) {
    // 1. Verifica se a plataforma é 'web'.
    if (Platform.OS === 'web') {
        try {
            // 2. No navegador, usa o localStorage, que é o padrão para armazenamento web.
            localStorage.setItem('userToken', token);
        } catch (e) {
            console.error("Falha ao salvar token no localStorage", e);
        }
    } else {
        // 3. Em qualquer outra plataforma (iOS/Android), usa o SecureStore para salvar de forma criptografada.
        await SecureStore.setItemAsync('userToken', token);
    }
}

/**
 * Busca o token de autenticação salvo.
 * @returns {Promise<string|null>} O token salvo, ou null se não for encontrado.
 */
export async function getToken() {
    // 4. Segue a mesma lógica: verifica a plataforma para saber de onde ler o token.
    if (Platform.OS === 'web') {
        try {
            return localStorage.getItem('userToken');
        } catch (e) {
            console.error("Falha ao buscar token do localStorage", e);
            return null;
        }
    } else {
        return await SecureStore.getItemAsync('userToken');
    }
}