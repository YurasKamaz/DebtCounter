import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { DEBTS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { fetchDebtors } from '../http/debtorsAPI';
import DebtorModal from '../components/modals/DebtorModal';


const Debtors = observer(() => {
    const {debtors} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState('')
    const [modalDebtorId, setModalDebtorId] = useState(0)
    
    const remDebt = async (id) => {
        try {
            //console.log(id)
            await debtors.delDebtor(id)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchDebtors(user.user.id).then(data => debtors.setDebtors(data))   
    }, [debtors.debtors.length])

    return(
        <Container className='d-flex justify-content-between mt-3 ' style={{width: window.innerHeight - 100}}>
            <Col>
                <ListGroup>
                    {!!debtors.debtors.length && 
                        <Card>
                            {debtors.debtors.map(debtor =>
                                <ListGroup.Item key = {debtor.id} style={{cursor: 'pointer'}} onClick={() => {setModalVisible(true); setModalDebtorId(debtor.id)}}>
                                    <Container className='d-flex justify-content-between'>
                                        {debtor.name}
                                        <Button variant='danger' onClick={(event) => {
                                            event.stopPropagation();
                                            remDebt(debtor.id)
                                        }}>✖</Button>
                                    </Container>                 
                                </ListGroup.Item>
                            )}                         
                        </Card>
                    } 
                    <DebtorModal show={modalVisible} onHide={() => setModalVisible(false)} debtorId={modalDebtorId}/>
                </ListGroup>               
            </Col>           
        </Container>        
    )
})

export default Debtors;