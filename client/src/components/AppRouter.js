import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { DEBTORS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'


const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return(
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!user.isAuth && publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth ?
                <Route path='*' element={<Navigate to={DEBTORS_ROUTE}/>} />
                :
                <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />
            }            
        </Routes>        
    )
})

export default AppRouter;