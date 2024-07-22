import $api from "../http/index.js"

export default class debtService {
    static async add(title, debt, debtorId) {
        return $api.post('/debts', {title, debt, debtorId})
    }

    static async remove(id) {
        console.log(id)
        return $api.delete('/debts', {data:{id:id}})
    }
}