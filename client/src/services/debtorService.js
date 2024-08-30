import $api from "../http/index.js"

export default class debtorService {
    static async add(name, userId) {
        return $api.post('/debtors', {name, userId})
    }

    static async remove(id) {
        //console.log(id)
        return $api.delete('/debtors', {data:{id:id}})
    }

    static async change(id, name) {
        //console.log(id)
        return $api.put('/debtors', {
                id: id,
                name: name,
        })
    }
}