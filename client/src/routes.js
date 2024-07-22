import { DEBTORS_ROUTE, DEBTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import Debtors from "./pages/Debtors"
import Debts from "./components/Debts"
import Auth from "./pages/Auth"

export const authRoutes = [
    {
        path: DEBTORS_ROUTE,
        Component: Debtors
    },
    {
        path: DEBTS_ROUTE,
        Component: Debts
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]