import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup } from 'react-bootstrap';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchDebtors } from '../http/debtorsAPI';
import DebtorModal from '../components/modals/DebtorModal';
import Skeleton from '../components/Skeleton/Skeleton';


const Debtors = observer(() => {
    const {debtors} = useContext(Context)
    const {user} = useContext(Context)
    const [modalVisible, setModalVisible] = useState('')
    const [modalDebtorId, setModalDebtorId] = useState(0)
    const [isLoading,  setIsLoading] = useState(false)
    
    const remDebt = async (id) => {
        try {
            //console.log(id)
            await debtors.delDebtor(id)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetchDebtors(user.user.id).then(data => debtors.setDebtors(data))
        setIsLoading(false)
    }, [debtors.debtors.length])

    return(
        <>
            {!isLoading ?
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
                :
                <Skeleton/>
            }
        </>      
    )
})

export default Debtors;