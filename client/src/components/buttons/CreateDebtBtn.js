import React, { useState } from "react";
import { Button } from "react-bootstrap";

const CreateDebtBtn = () => {
    const [modalVisible, setModalVisible] = useState('')

    return (
        <div>
            <Button className='me-2' variant='success'>Добавить</Button>
        </div>
    )
}

export default CreateDebtBtn;