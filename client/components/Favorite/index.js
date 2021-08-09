import Image from 'next/image';
import Router from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';
import clientAxios from '../../config/axios';
import AuthContext from '../../context/auth/authContext';

const FavImg = styled.div`
    position: absolute;
    right: 5rem;
    top: 5rem;
    cursor: pointer;
    z-index: 999;
`;
export default function Home({ fav, id }) {
    const authContext = useContext(AuthContext);
    const { userAuth, auth } = authContext;

    async function updateUser(id) {
        if (auth) {
            const resp = await clientAxios.put('/api/users/add-favorite', {
                id,
            });
            userAuth();
        } else Router.push('/login');
    }

    return (
        <FavImg>
            <Image
                src={fav ? '/favorite.svg' : '/favorite_border.svg'}
                width={35}
                height={35}
                onClick={() => updateUser(id)}
            />
        </FavImg>
    );
}
