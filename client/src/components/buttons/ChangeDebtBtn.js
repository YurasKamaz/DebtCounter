import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ChangeDebtModal from "../modals/ChangeDebtModal";

const ChangeDebtBtn = ({debtId}) => {
    const [modalVisible, setModalVisible] = useState(false)

    return(
        <>
            <Button variant='warning' onClick={() => setModalVisible(true)}>✎</Button>
            <ChangeDebtModal show={modalVisible} onHide={() => setModalVisible(false)} debtId={debtId}/>
        </>
    )
}

export default ChangeDebtBtn