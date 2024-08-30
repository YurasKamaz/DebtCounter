import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup } from 'react-bootstrap';
import { Context } from '..';
import { fetchDebt } from '../http/debtsAPI';
import { observer } from 'mobx-react-lite';
import ChangeDebtBtn from './buttons/ChangeDebtBtn';

const Debts = observer(({debtorId}) => {
    const {debts, debtors} = useContext(Context)
    const [sum, setSum] = useState(0)
    const [flag, setFlag] = useState(false)

    const remDebt = async (id) => {
        try {
            //console.log(id)
            await debts.delDebt(id)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        //console.log(debtors.debtors.id)
        fetchDebt().then(data => debts.setDebts(data))
    }, [debts.debts.length])

    //console.log(debts)
    return(
        <Container className='d-flex justify-content-between mt-3 '>
            <Col>
                <ListGroup>
                    <Card>
                        {debts.debts.filter(d => d.debtorId == debtorId).map(debt =>
                            <ListGroup.Item key = {debt.id}>
                                <Container className='d-flex justify-content-between'>
                                    <p>{debt.title}</p>
                                    <p>{debt.debt} руб.</p>
                                </Container>
                                <Container className='d-flex justify-content-between mt-2'>
                                    <ChangeDebtBtn debtId={debt.id}/>
                                    <Button variant='danger' onClick={() => remDebt(debt.id)}>✖</Button>
                                </Container>                      
                            </ListGroup.Item>                           
                        )}                         
                    </Card>
                </ListGroup>               
            </Col>           
        </Container>        
    )
})

export default Debts;