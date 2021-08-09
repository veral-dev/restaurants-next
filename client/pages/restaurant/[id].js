import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Image from 'next/image';

import AppLayout from '../../components/AppLayout';
import Spinner from '../../components/Spinner';
import Favorite from '../../components/Favorite';

import clientAxios from '../../config/axios';
import Alert from '../../components/Alert';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const RestDiv = styled.div`
    padding: 2rem 2rem;

    width: 100%;
    position: relative;
    @media screen and (min-width: 600px) {
        display: flex;
    }
`;

const RestCol = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;

    width: 100%;

    img {
        margin-bottom: 1rem;
        border-radius: 2rem;
        object-fit: cover;
        cursor: pointer;
    }
`;

export default function RestaurantDetails() {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { auth, user } = authContext;

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getRestaurant() {
        setLoading(true);

        try {
            if (Router.query.id) {
                const resp = await clientAxios.get(
                    `/api/restaurants/${Router.query.id}`
                );
                setRestaurant(resp.data);
            } else Router.push('/');
        } catch (error) {
            showAlert(error, 'error');
        } finally {
            setLoading(false);
        }
    }

    async function deleteRestaurant() {
        try {
            await clientAxios.delete(`/api/restaurants/${Router.query.id}`);
            Router.push('/');
        } catch (error) {
            showAlert(error, 'error');
        }
    }

    useEffect(() => {
        getRestaurant();
    }, []);

    return (
        <>
            <AppLayout>
                {alert ? (
                    <Alert type={`${alert.category}`}>{alert.msg}</Alert>
                ) : null}
                <div className="container">
                    <button
                        onClick={() => Router.back()}
                        style={{ float: 'right', marginRight: '2rem' }}
                        className="btn btn-secundary"
                    >
                        Atrás
                    </button>
                    {loading && <Spinner />}
                    {restaurant && (
                        <RestDiv>
                            <RestCol>
                                <Favorite
                                    fav={
                                        user &&
                                        user.favourites.includes(restaurant._id)
                                            ? true
                                            : false
                                    }
                                    id={restaurant._id}
                                />
                                <Image
                                    src={restaurant.image || ''}
                                    alt={restaurant.name}
                                    width={500}
                                    height={500}
                                />
                            </RestCol>
                            <RestCol>
                                <h1>{restaurant.name}</h1>
                                {restaurant.address && (
                                    <span>
                                        <strong>Dirección: </strong>
                                        {restaurant.address}
                                    </span>
                                )}
                                {restaurant.neighborhood && (
                                    <span>
                                        <strong>Barrio: </strong>
                                        {restaurant.neighborhood}
                                    </span>
                                )}
                                {restaurant.cuisine_type && (
                                    <span>
                                        <strong>Tipo de cocina: </strong>
                                        {restaurant.cuisine_type}
                                    </span>
                                )}
                                {restaurant.operating_hours && (
                                    <>
                                        <strong>Horarios: </strong>
                                        <ul>
                                            <li>
                                                Lunes:
                                                {
                                                    restaurant.operating_hours
                                                        .Monday
                                                }
                                            </li>
                                            <li>
                                                Martes:
                                                {
                                                    restaurant.operating_hours
                                                        .Tuesday
                                                }
                                            </li>
                                            <li>
                                                Miércoles:
                                                {
                                                    restaurant.operating_hours
                                                        .Wednesday
                                                }
                                            </li>
                                            <li>
                                                Jueves:
                                                {
                                                    restaurant.operating_hours
                                                        .Thursday
                                                }
                                            </li>
                                            <li>
                                                Viernes:
                                                {
                                                    restaurant.operating_hours
                                                        .Friday
                                                }
                                            </li>
                                            <li>
                                                Sábado:
                                                {
                                                    restaurant.operating_hours
                                                        .Saturday
                                                }
                                            </li>
                                            <li>
                                                Domingo:
                                                {
                                                    restaurant.operating_hours
                                                        .Sunday
                                                }
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </RestCol>
                        </RestDiv>
                    )}
                    {auth && (
                        <button
                            className="btn btn-secundary"
                            style={{ marginLeft: '4rem ' }}
                            onClick={() => deleteRestaurant()}
                        >
                            Borrar restaurante
                        </button>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
