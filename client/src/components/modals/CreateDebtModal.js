import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Context } from "../..";

const CreateDebtModal = ({show, onHide, debtorId}) => {
    const [name, setName] = useState('')
    const [count, setCount] = useState(0)
    const {debts} = useContext(Context)

    const createDebt = async () => {
        try {
            await debts.addDebt(name, count, debtorId)
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
                        placeholder={"Введите ..."}
                        value = {name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-2"
                        placeholder={"Введите сумму"}
                        value={count}
                        onChange={e => setCount(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="outline-success" onClick={createDebt}>
                    Сохранить
                </Button>
            </Modal.Footer>
      </Modal>
      );
}

export default CreateDebtModal;