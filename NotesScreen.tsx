import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Определение типов параметров для маршрутов
type RootStackParamList = {
  Notes: { token: string }; // Параметры для экрана Notes
  Login: undefined; // Экран Login не требует параметров
  Register: undefined; // Экран Register не требует параметров
};

// Типизация свойств NotesScreen
type NotesScreenProps = StackScreenProps<RootStackParamList, 'Notes'>;

const NotesScreen: React.FC<NotesScreenProps> = ({ route }) => {
  const { token } = route.params; // Получаем токен из параметров маршрута
  const [note, setNote] = useState('');

  // Fetch note on component mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get('http://localhost:5000/note', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNote(response.data.note || '');
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch note');
      }
    };

    fetchNote();
  }, [token]);

  // Save note
  const saveNote = async () => {
    try {
      await axios.put(
        'http://localhost:5000/note',
        { note },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert('Success', 'Note saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Note</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your note here"
        multiline
        value={note}
        onChangeText={setNote}
      />
      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});

export default NotesScreen;
