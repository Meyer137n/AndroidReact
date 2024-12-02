import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    axios
      .post('http://192.168.0.104:5000/login', { username, password })
      .then(response => {
        const { token } = response.data; // Получаем токен из ответа
        Alert.alert('Авторизация прошла успешно', 'Добро пожаловать');
        navigation.navigate('Note', { token }); // Передаём токен в NoteScreen
      })
      .catch(error => {
        Alert.alert('Ошибка', error.response?.data?.message || 'Неправильные учетные данные');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Войти" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Создать аккаунт" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default LoginScreen;
