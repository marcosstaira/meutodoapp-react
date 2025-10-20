import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export async function saveToken(token) {
    if (Platform.OS === 'web') {
        try {
          
            localStorage.setItem('userToken', token);
        } catch (e) {
            console.error("Falha ao salvar token no localStorage", e);
        }
    } else {
        
        await SecureStore.setItemAsync('userToken', token);
    }
}

export async function getToken() {
    
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