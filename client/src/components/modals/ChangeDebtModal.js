import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Context } from "../..";

const ChangeDebtModal = ({show, onHide, debtId}) => {
    const [title, setTitle] = useState('')
    const [count, setCount] = useState(0)
    const {debts} = useContext(Context)

    const changeDebt = async () => {
        try {
            await debts.changeDebt(debtId, title, count)
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
                        placeholder={"Введите ..."}
                        value = {title}
                        onChange={e => setTitle(e.target.value)}
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
                <Button variant="outline-success" onClick={changeDebt}>
                    Сохранить
                </Button>
            </Modal.Footer>
      </Modal>
      );
}

export default ChangeDebtModal;