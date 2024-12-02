import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    axios
      .post('http://192.168.0.104:5000/register', { username, password })
      .then(() => {
        Alert.alert('Успех', 'Регистрация завершена');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Ошибка', error.response?.data?.message || 'Не удалось зарегистрироваться');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
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
      <Button title="Register" onPress={handleRegister} />
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
});

export default RegisterScreen;
