import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Context } from "../..";

const CreateDebtorModal = ({show, onHide}) => {
    const [name, setName] = useState('')
    const {debtors} = useContext(Context)
    const {user} = useContext(Context)

    const createDebtor = async () => {
        try {
            //console.log(user.user.id)
            await debtors.addDebtor(name, user.user.id)
            onHide()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить долг</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        placeholder={"Введите имя должника"}
                        value = {name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="outline-success" onClick={createDebtor}>
                    Сохранить
                </Button>
            </Modal.Footer>
      </Modal>
      );
}

export default CreateDebtorModal;