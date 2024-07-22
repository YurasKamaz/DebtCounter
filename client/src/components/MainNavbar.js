import {observer} from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import { Context } from '..';
import CreateDebtorBtn from './buttons/CreateDebtorBtn';

const MainNavbar = observer(() => {
    const {user} = useContext(Context)
    return(
      <Navbar bg="dark" variant="dark">
          <Container className='d-flex justify-content-between'>
            <Navbar.Brand className='align-items-center'>DebtCounter</Navbar.Brand>
            {user.isAuth &&
              <Nav className="align-items-right">
                <CreateDebtorBtn/>
                <Button variant={'danger'} onClick={() => user.setIsAuth(false)}>Выйти</Button>
              </Nav>
            }
          </Container>
            
      </Navbar>
    )
})

export default MainNavbar;