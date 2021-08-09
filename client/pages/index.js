import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Alert from '../components/Alert';
import AppLayout from '../components/AppLayout';
import Spinner from '../components/Spinner';
import Favorite from '../components/Favorite';

import clientAxios from '../config/axios';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import Link from 'next/link';
import styled from 'styled-components';

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 20px 0px;
    background-color: var(--white);
    padding: 2rem;

    img {
        margin-bottom: 1rem;
        border-radius: 2rem;
        object-fit: cover;
        cursor: pointer;
    }

    :hover {
        -webkit-box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
        -moz-box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
        box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
    }
    p {
        font-size: 2rem;
        cursor: pointer;
        min-height: 100px;
        margin-bottom: 0;
    }
`;

const CardDiv = styled.div`
    padding: 2rem 2rem;

    width: 100%;
    position: relative;

    @media screen and (min-width: 1200px) {
        flex: 0 0 25%;
        max-width: 25%;
    }
    @media screen and (min-width: 900px) and (max-width: 1200px) {
        flex: 0 0 33%;
        max-width: 33%;
    }
    @media screen and (min-width: 600px) and (max-width: 900px) {
        flex: 0 0 50%;
        max-width: 50%;
    }
`;

const Cards = styled.div`
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0px 24px;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;

    margin: 0px auto;
`;

export default function Home() {
    const authContext = useContext(AuthContext);
    const { token, user, auth } = authContext;
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getRestaurants() {
        setLoading(true);
        try {
            const resp = await clientAxios.get('/api/restaurants');
            setRestaurants(resp.data);
        } catch (error) {
            console.log(error, 'error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRestaurants();
    }, []);
    useEffect(() => {
        if (!token) {
            setRestaurants([]);
        }
    }, [token]);
    return (
        <div>
            <AppLayout>
                {alert ? (
                    <Alert type={`${alert.category}`}>{alert.msg}</Alert>
                ) : null}
                <div className="container">
                    <h1>Bienvenido a nuestra lista de restaurantes</h1>
                    {loading && <Spinner />}

                    <Cards>
                        {restaurants.length === 0 ? (
                            <p>No hay restaurantes</p>
                        ) : (
                            restaurants.map((restaurant) => (
                                <CardDiv key={restaurant._id}>
                                    <CardContainer>
                                        <Favorite
                                            fav={
                                                user &&
                                                user.favourites.includes(
                                                    restaurant._id
                                                )
                                                    ? true
                                                    : false
                                            }
                                            id={restaurant._id}
                                        />
                                        <Link
                                            href={`restaurant/${restaurant._id}`} passHref
                                        >
                                            <a>
                                                <Image
                                                    src={restaurant.image}
                                                    alt={restaurant.name}
                                                    width={500}
                                                    height={500}
                                                />

                                                <p>{restaurant.name}</p>
                                            </a>
                                        </Link>
                                    </CardContainer>
                                </CardDiv>
                            ))
                        )}
                    </Cards>
                    {auth && (
                        <Link href={`new-restaurant`} passHref>
                            <button
                                className="btn btn-primary"
                                style={{ marginLeft: '4rem ' }}
                            >
                                Nuevo restaurante
                            </button>
                        </Link>
                    )}
                </div>
            </AppLayout>
        </div>
    );
}
