import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Context } from "../..";

const ChangeDebtorModal = ({show, onHide, debtorId, refetch}) => {
    const [name, setName] = useState('')
    const {debtors} = useContext(Context)

    const changeDebtor = async () => {
        try {
            await debtors.changeDebtor(debtorId, name)
            await refetch()
            //console.log(debts.debts)
            onHide()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Изменить долг</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        placeholder={"Введите имя"}
                        value = {name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="outline-success" onClick={changeDebtor}>
                    Сохранить
                </Button>
            </Modal.Footer>
      </Modal>
      );
}

export default ChangeDebtorModal;