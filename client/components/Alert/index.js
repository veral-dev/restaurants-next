import styled from 'styled-components';

const AlertCard = styled.div`
    position: fixed;
    bottom: 20px;
    left: 0;
    padding: 2rem 3rem;
    font-family: var(--headingFont);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 2.2rem;
    text-align: center;
    width: 100%;
    p{
      padding: 1rem;
    }
    >div {
      border-radius: .5rem
    }
    @media (min-width:768px) {
      width: auto;
      bottom: 30px;
      right: 10px;
      left: auto;
  }

.alert-ok {
  background-color: #6dd36d;
  color: #026702;
}
.alert-error {
  background-color: tomato;
  color: var(--white)
}

}
`;
export default function Alert({ children, type }) {
    return (
        <AlertCard>
            <div className={type !== 'error' ? 'alert-ok' : 'alert-error'}>
                <p>{children}</p>
            </div>
        </AlertCard>
    );
}
