import styled from 'styled-components';

export const UserForm = styled.div`
    background-color: var(--gray);
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 600px) {
        min-height: 800px;
    }
`;

export const FormContainer = styled.div`
    padding: 5rem 3rem;
    max-width: 500px;
    width: 95%;
    background-color: var(--white);
    border-radius: 1rem;
`;

export const FieldForm = styled.div`
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
