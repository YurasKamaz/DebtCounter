import React from "react";
import { Button, Container, Form, ModalFooter } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import CreateDebtBtn from "../buttons/CreateDebtBtn";
import ChangeDebtorBtn from "../buttons/ChangeDebtorBtn";
import DeleteDebtorBtn from "../buttons/DeleteDebtorBtn";
import Debts from "../Debts.js";
import CreateDebtModal from "./CreateDebtModal";
import { useState, useCallback } from "react";

const DebtorModal = ({show, onHide, debtorId}) => {
    const [modalVisible, setModalVisible] = useState('')

    return ( 
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Выберите опцию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Debts debtorId={debtorId}/>
                </Modal.Body>
                <Modal.Footer>
                    <Container className="d-flex justify-content-center p-0 m-0">
                        <Button className='me-2' variant='success' onClick={() => {setModalVisible(true)}}>Добавить</Button>
                        {/* <Button className='me-2' variant='success' onClick={() => {onHide(); setModalVisible(true)}}>Добавить</Button> */}
                    </Container>
                </Modal.Footer>
            </Modal>
            <CreateDebtModal show={modalVisible} onHide={() => setModalVisible(false)} debtorId={debtorId}/>
        </>
      );
}

export default DebtorModal;