import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const NoteScreen: React.FC = ({ route }: any) => {
  const { token } = route.params; // Извлекаем токен из параметров
  const [noteText, setNoteText] = useState<string>(''); // Состояние для текста заметки
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки

  const handleAxiosError = (error: unknown): string => {
    // Проверяем, является ли ошибка объектом и содержит ли поле response
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || 'Ошибка на сервере';
    }
    if (error instanceof Error) {
      return error.message; // Обрабатываем стандартные ошибки
    }
    return 'Неизвестная ошибка'; // Для всех остальных случаев
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get('http://192.168.0.104:5000/note', {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
        });

        setNoteText(response.data.text || ''); // Устанавливаем текст заметки
      } catch (error: unknown) {
        const errorMessage = handleAxiosError(error);
        Alert.alert('Ошибка', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [token]);

  const handleSave = async () => {
    try {
      await axios.put(
        'http://192.168.0.104:5000/note',
        { text: noteText },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
        }
      );

      Alert.alert('Успех', 'Заметка успешно обновлена');
    } catch (error: unknown) {
      const errorMessage = handleAxiosError(error);
      Alert.alert('Ошибка', errorMessage);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заметки</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Введите текст заметки"
        value={noteText}
        onChangeText={setNoteText}
      />
      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    height: 500,
    fontSize: 16,
  },
});

export default NoteScreen;
