import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function App({userRole}) {
    return (
        <MDBFooter className='footer--pin text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
                {userRole !== 'ADMIN' && (
                    <div className='d-flex justify-content-center align-items-center'>
                        <li className="nav-item footer-first-div">
                            <a className="nav-link  a-categorien a-footer" href="/login">Einloggen</a>
                        </li>
                        <li className="nav-item footer-first-div">
                            <a className="nav-link btn a-categorien a-footer" href="/signup">Registrieren </a>
                        </li>
                    </div>
                )}
            </MDBContainer>

            <div className="text-center p-3">
                © 2024 Eva, Ganna, Yasin und Mats
            </div>
        </MDBFooter>
    );
}