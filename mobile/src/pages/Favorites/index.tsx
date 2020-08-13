import React, { useState } from 'react';
import { View , ScrollView, AsyncStorage } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favsTeachers = JSON.parse(response);

                setFavorites(favsTeachers);
            } 

        });
    }

    useFocusEffect(() => {
        loadFavorites();
    }, []);

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
            {favorites.map((teacher: Teacher) => <TeacherItem teacher={teacher} key={teacher.id} favorited={true} />)}
            </ScrollView>
        </View>
    )
}

export default Favorites;