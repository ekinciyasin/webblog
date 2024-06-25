import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
            <MDBContainer className='p-4 pb-0'>
                <section className=''>
                    <p className='d-flex justify-content-center align-items-center'>
                        <span className='me-3'>Kostenlos registrieren</span>
                        <MDBBtn type='button' outline color="light" rounded>
                            Konto erstellen
                        </MDBBtn>
                    </p>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024
                <a className='text-white' href='https://mdbootstrap.com/'>
                    Evgeniia, Ganna, Yasin und Mats
                </a>
            </div>
        </MDBFooter>
    );
}