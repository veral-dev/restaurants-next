import { useState, useContext } from 'react';
import Router from 'next/router';
import Alert from '../../components/Alert';
import AlertContext from '../../context/alert/alertContext';
import AppLayout from '../../components/AppLayout';
import { UserForm, FormContainer, FieldForm } from '../../components/styles';
import styled from 'styled-components';
import clientAxios from '../../config/axios';

const Hours = styled.div`
    padding: 2rem;
    border: 1px black solid;
    margin-top: 1rem;
`;

const NewRestaurantForm = styled.div`
    margin: 2rem auto;
    display: flex;
    justify-content: center;
`;

export default function NewRestaurant() {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const [restaurant, setRestaurant] = useState({
        name: '',
        neighborhood: '',
        address: '',
        image: '',
        cuisine_type: '',
        newHour: '',
        operating_hours: [],
    });

    const {
        name,
        neighborhood,
        address,
        image,
        cuisine_type,
        newHour,
        operating_hours,
    } = restaurant;

    const [days, setDays] = useState({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
    });

    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } =
        days;

    const onChange = (e) => {
        setRestaurant({
            ...restaurant,
            [e.target.name]: e.target.value,
        });
    };
    const onChangeDays = (e) => {
        setDays({
            ...days,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        //Validar campos
        if (restaurant.name.trim() === '') {
            showAlert('El nombre es obligatorio', 'error');
            return;
        }
        restaurant.operating_hours = days;

        try {
            const resp = await clientAxios.post(
                '/api/restaurants/create',
                restaurant
            );
            Router.push(`/restaurant/${resp.data.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppLayout>
            <NewRestaurantForm>
                {alert ? (
                    <Alert type={`${alert.category}`}>{alert.msg}</Alert>
                ) : null}
                <FormContainer className="shadow">
                    <h1>Crear nueva cuenta</h1>

                    <form>
                        <FieldForm>
                            <label htmlFor="name">Nombre de usuario</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre del restaurante"
                                value={name}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <label htmlFor="neighborhood">Barrio</label>
                            <input
                                type="text"
                                id="neighborhood"
                                name="neighborhood"
                                placeholder="Barrio"
                                value={neighborhood}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Dirección"
                                value={address}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <label htmlFor="address">Imagen</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Imagen"
                                value={image}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <label htmlFor="address">Tipo de cocina</label>
                            <input
                                type="text"
                                id="cuisine_type"
                                name="cuisine_type"
                                placeholder="Tipo de cocina"
                                value={cuisine_type}
                                onChange={onChange}
                            />
                        </FieldForm>

                        <label htmlFor="address">Horario</label>
                        <Hours>
                            <FieldForm>
                                <label htmlFor="Monday">Lunes</label>
                                <input
                                    type="text"
                                    id="Monday"
                                    name="Monday"
                                    placeholder="Lunes"
                                    value={Monday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                            <FieldForm>
                                <label htmlFor="Tuesday">Martes</label>
                                <input
                                    type="text"
                                    id="Tuesday"
                                    name="Tuesday"
                                    placeholder="Martes"
                                    value={Tuesday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                            <FieldForm>
                                <label htmlFor="Wednesday">Miércoles</label>
                                <input
                                    type="text"
                                    id="Wednesday"
                                    name="Wednesday"
                                    placeholder="Miércoles"
                                    value={Wednesday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                            <FieldForm>
                                <label htmlFor="Thursday">Jueves</label>
                                <input
                                    type="text"
                                    id="Thursday"
                                    name="Thursday"
                                    placeholder="Jueves"
                                    value={Thursday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                            <FieldForm>
                                <label htmlFor="Friday">Viernes</label>
                                <input
                                    type="text"
                                    id="Friday"
                                    name="Friday"
                                    placeholder="Viernes"
                                    value={Friday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                            <FieldForm>
                                <label htmlFor="Saturday">Sábado</label>
                                <input
                                    type="text"
                                    id="Saturday"
                                    name="Saturday"
                                    placeholder="Sábado"
                                    value={Saturday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                            <FieldForm>
                                <label htmlFor="Sunday">Domingo</label>
                                <input
                                    type="text"
                                    id="Sunday"
                                    name="Sunday"
                                    placeholder="Domingo"
                                    value={Sunday}
                                    onChange={onChangeDays}
                                />
                            </FieldForm>
                        </Hours>
                        <ul>
                            {operating_hours.length > 0 &&
                                operating_hours.map((hour) => <li key={hour}>{hour}</li>)}
                        </ul>
                        <FieldForm>
                            <button
                                onClick={onSubmit}
                                className="btn btn-primary btn-block"
                            >
                                Nuevo restaurante
                            </button>
                        </FieldForm>
                    </form>
                </FormContainer>
            </NewRestaurantForm>
        </AppLayout>
    );
}
