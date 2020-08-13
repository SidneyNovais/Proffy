import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
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
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher: { avatar, bio, cost, user_id, name, subject, whatsapp } }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id
        })
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={avatar} alt={name}/>
                <div>
                    <strong>{name}</strong>
                    <span>{subject}</span>
                </div>
            </header>

            <p>
              {bio}
            </p>

            <footer>
                <p>
                    Preço/hora 
                    <strong>
                        R$ {cost}
                    </strong>
                </p>
                <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${whatsapp}`} type="button"> 
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;