import React, { useState, useContext, useEffect } from 'react';

import Link from 'next/link';
import Router from 'next/router';

import Alert from '../../components/Alert';
import AppLayout from '../../components/AppLayout';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { UserForm, FormContainer, FieldForm } from '../../components/styles';

export default function SignUp(props) {
    //Extraer los valores del context alert
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, auth, userRegister } = authContext;

    //En caso de que el usuario se haya logueado o registrado anteriormente
    useEffect(() => {
        if (auth) {
            Router.push('/');
        }
        if (message) {
            showAlert(message.msg, message.category);
        }
        //eslint-disable-next-line
    }, [message, auth, props.history]);

    //State para inicio de sesión
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    //Extraer usuario

    const { name, username, password, confirmPassword } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //Validar campos vacios
        if (
            username.trim() === '' ||
            password.trim() === '' ||
            confirmPassword.trim() === ''
        ) {
            showAlert('Todos los campos son obligatorios', 'error');
            return;
        }
        //Contraseña con mínimo 6 caracteres
        if (password.length < 6) {
            showAlert(
                'La contraseña debe tener al menos 6 caracteres',
                'error'
            );
            return;
        }
        //Contraseñas iguales en confirmar
        if (password !== confirmPassword) {
            showAlert('Las contraseñas no coinciden', 'error');
            return;
        }
        //Pasarlo a action
        userRegister({ username, password });
    };

    return (
        <AppLayout>
            <UserForm>
                {alert ? (
                    <Alert type={`${alert.category}`}>{alert.msg}</Alert>
                ) : null}
                <FormContainer className="shadow">
                    <h1>Crear nueva cuenta</h1>

                    <form onSubmit={onSubmit}>
                        <FieldForm>
                            <label htmlFor="username">Nombre de usuario</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <label htmlFor="password">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Tu contraseña"
                                value={confirmPassword}
                                onChange={onChange}
                            />
                        </FieldForm>
                        <FieldForm>
                            <input
                                type="submit"
                                className="btn btn-primary btn-block"
                                value="Registrarse"
                            />
                        </FieldForm>
                    </form>
                    <Link href="/" className="enlace-cuenta">
                        Volver al inicio de sesión
                    </Link>
                </FormContainer>
            </UserForm>
        </AppLayout>
    );
}
