import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CreateDebtorModal from "../modals/CreateDebtorModal";

const CreateDebtorBtn = () => {
    const [modalVisible, setModalVisible] = useState('')

    return (
        <div>
            <Button className='me-2' variant='success' onClick={() => setModalVisible(true)}>Добавить должника</Button>
            <CreateDebtorModal show={modalVisible} onHide={() => setModalVisible(false)}/>
        </div>
    )
}

export default CreateDebtorBtn;