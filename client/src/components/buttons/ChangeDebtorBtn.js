import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ChangeDebtorModal from "../modals/ChangeDebtorModal";

const ChangeDebtorBtn = ({debtorId, refetch}) => {
    const [modalVisible, setModalVisible] = useState(false)
    
    return(
        <div>
            <Button className='me-2' variant='warning' onClick={(event) => {
                event.stopPropagation()
                setModalVisible(true)
            }}>✎</Button>
            <ChangeDebtorModal show={modalVisible} onHide={() => setModalVisible(false)} refetch={refetch} debtorId={debtorId}/>
        </div>
    )
}

export default ChangeDebtorBtn;