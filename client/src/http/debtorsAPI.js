import $api from './index'


export const createDebtor = async (debtor) => {
    const {data} = await $api.post('/debtors', debtor)
    return data
}

export const fetchDebtors = async (userId) => {
    const {data} = await $api.get(`/debtors?userId=${userId}`)
    return data
}