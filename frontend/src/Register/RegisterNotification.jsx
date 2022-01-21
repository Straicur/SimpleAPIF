import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from 'react-i18next';


export const RegisterNotification= ({setModalState,state}) =>{
    const {t} = useTranslation ();
    const handleClose = () => {
        setModalState({modalShow:!state.modalShow,redirect:true, redirectTo:'/login'});
    }
    return (
        <>
            <Modal
                show={state.modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <h3>Poszło git</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
//----------------------------------------------------------------------------------------------------------------------

