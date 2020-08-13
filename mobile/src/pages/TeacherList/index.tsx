import React, { useState } from 'react';
import { View , Text, AsyncStorage } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [isFiltersVisable, setIsFiltersVisable] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favsTeachers = JSON.parse(response);
                const favsIds = favsTeachers.map((teacher: Teacher) => teacher.id);

                setFavorites(favsIds);
            } 

        });
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })

        setIsFiltersVisable(false);
        setTeachers(response.data);
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisable(!isFiltersVisable);
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={<BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#fff" />
                </BorderlessButton>}
            >

               { isFiltersVisable && <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc "
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                style={styles.input}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc "
                            />
                        </View>
                        
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                value={time}
                                onChangeText={text => setTime(text)}
                                style={styles.input}
                                placeholder="Qual horário?"
                                placeholderTextColor="#c1bccc "
                            />
                        </View>
                    </View>


                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}> Filtrar</Text>
                    </RectButton>
                </View> }    
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >

                {teachers.map((teacher: Teacher) => <TeacherItem favorited={favorites.includes(teacher.id)} teacher={teacher} key={teacher.id}/>)}
            </ScrollView>
        </View>
    )
}

export default TeacherList;