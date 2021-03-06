import { useContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import clientAxios from '../../config/axios';
import styled from 'styled-components';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const FavImg = styled.div`
    position: absolute;
    right: 3rem;
    top: 3rem;
    cursor: pointer;
    z-index: 999;
`;
export default function Home({ fav, id }) {
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;
    const authContext = useContext(AuthContext);
    const { userAuth, auth } = authContext;

    async function updateUser(id) {
        if (auth) {
            await clientAxios.put('/api/users/add-favorite', {
                id,
            });
            if (fav) showAlert('Favorito borrado', 'ok');
            else showAlert('Favorito añadido', 'ok');
            userAuth();
        } else Router.push('/login');
    }

    return (
        <FavImg>
            <Image
                src={fav ? '/favorite.svg' : '/favorite_border.svg'}
                width={40}
                height={40}
                onClick={() => updateUser(id)}
                alt="heart"
            />
        </FavImg>
    );
}
