import { useState, useEffect, useContext } from 'react';
import AppLayout from '../../components/AppLayout';
import Spinner from '../../components/Spinner';

import { useRouter } from 'next/router';
import clientAxios from '../../config/axios';
import Alert from '../../components/Alert';
import AlertContext from '../../context/alert/alertContext';

export default function RestaurantDetails() {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const router = useRouter();
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getRestaurant() {
        setLoading(true);
        try {
            const resp = await clientAxios.get(
                `/api/restaurants/${router.query.id}`
            );
            setRestaurant(resp.data);
        } catch (error) {
            showAlert(error, 'error');
            router.push('/login');
        } finally {
            setLoading(false);
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
                    {loading && <Spinner />}
                    {restaurant && (
                        <>
                            <h1>{restaurant.name}</h1>
                        </>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
