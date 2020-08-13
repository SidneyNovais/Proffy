import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
    user_id: number;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}  

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher ,teacher: { avatar, bio, cost, user_id, name, subject, whatsapp }, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);
    
    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id
        });
        Linking.openURL(`whatsapp://send?phone=${whatsapp}`)
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if (favorites) {
            const favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            // remover dos favoritos
            const favoriteIndex:number = favoritesArray.findIndex((teacherItem: Teacher) => teacherItem.id === teacher.id);
            
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {
            //adicionar aos favoritos


            if (favorites) {
                const favoritesArray = JSON.parse(favorites);
            }

            favoritesArray.push(teacher);

            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{name} </Text>
                    <Text style={styles.subject}>{subject} </Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {`  `}
                    <Text style={styles.priceValue}>R$ {cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {},
                        ]}>
                        { isFavorited
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} /> 
                        }
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;