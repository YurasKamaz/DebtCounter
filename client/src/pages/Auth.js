import React, { useContext, useState } from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, DEBTORS_ROUTE } from "../utils/consts"
import {observer} from 'mobx-react-lite'

const Auth = observer(() => {
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            if(isLogin){
                await user.login(username, password)
            } else {
                await user.registration(username, password)
            }
            // user.setUser(user)
            // user.setIsAuth(true)
            navigate(DEBTORS_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return(
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 500}} className="p-5">
                <h2 className='margin-left-auto'>
                    {isLogin ?
                    'Авторизация'
                    :
                    'Регистрация'}
                    </h2>
                <Form className='d-flex flex-column' method='post' action='/api/login'>
                    <Form.Control 
                        className="mt-2"
                        placeholder='Введите логин'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-2"
                        placeholder='Введите пароль'
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form className='d-flex justify-content-between mt-2 pl-3 pr-3'>
                        {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться!</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти!</NavLink>
                        </div>}
                        <Button variant={'outline-success'} onClick={signIn}>
                            {isLogin ?
                            "Войти"
                            :
                            "Зарегистрироваться"
                            }
                        </Button>
                    </Form>   
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;