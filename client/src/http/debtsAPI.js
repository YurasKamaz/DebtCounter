import $api from ".";

export const createDebt = async (debt) => {
    const {data} = await $api.post(`/debts`, debt)
    return data
}

export const fetchDebt = async (debtorId) => {
    const {data} = await $api.get(`/debts?debtorId=${debtorId}`)
    //console.log(data)
    return data
}