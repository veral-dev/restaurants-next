import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import Alert from '../../components/Alert';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import styled from 'styled-components';
import AppLayout from '../../components/AppLayout';

const UserForm = styled.div`
    background-color: var(--gray);
    height: 100vh;
    min-height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled.div`
    padding: 5rem 3rem;
    max-width: 500px;
    width: 95%;
    background-color: var(--white);
    border-radius: 1rem;
`;

const FieldForm = styled.div`
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
    :last-of-type {
        margin: 0;
    }
    label {
        flex: 0 0 100px;
        font-family: var(--textFont);
    }
    input[type='password'],
    input[type='text'],
    input[type='username'] {
        border: 1px solid #e1e1e1;
        padding: 1rem;
        flex: 1;
        width: 100%;
    }
`;
const Login = () => {
    //Extraer los valores del context alert
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, auth, LogIn, token } = authContext;

    //En caso de que el password o usuario no exista
    useEffect(() => {
        if (auth && token) {
            Router.back();
        }
        if (message) {
            showAlert(message.msg, message.category);
        }
    }, [message, auth, token]);

    //State para inicio de sesión
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    //Extraer usuario

    const { username, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //Validar campos
        if (username.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'error');
        }
        //Pasarlo a action
        LogIn({ username, password });
    };

    return (
        <AppLayout>
            <UserForm>
                {alert ? (
                    <Alert type={`${alert.category}`}>{alert.msg}</Alert>
                ) : null}
                <FormContainer className="shadow">
                    <h1>Iniciar Sesión</h1>

                    <form onSubmit={onSubmit}>
                        <FieldForm>
                            <label htmlFor="username">Nombre de usuario</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
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
                            <input
                                type="submit"
                                className="btn btn-primary btn-block"
                                value="Iniciar Sesión"
                            />
                        </FieldForm>
                    </form>
                    <Link href="/signup" className="linkto">
                        ¿No tienes cuenta? Registrate
                    </Link>
                    <p>Prueba la app usando admin@admin.com | 123456</p>
                </FormContainer>
            </UserForm>
        </AppLayout>
    );
};

export default Login;
