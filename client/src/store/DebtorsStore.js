import { makeAutoObservable } from "mobx"
import debtorService from "../services/debtorService"


export default class DebtorsStore {
    constructor() {
        this._debtors = [
            
        ]
        makeAutoObservable(this)
    }

    setDebtors(debtors) {
        this._debtors = debtors
    }

    get debtors() {
        return this._debtors
    }

    async addDebtor(name, userId) {
        try {
            const response = await debtorService.add(name, userId)
            //console.log(response.data.debtor)
            this._debtors.push(response.data.name)
        } catch (e) {
            console.log(e)
        }
    }

    async delDebtor(id) {
        try {
            const response = await debtorService.remove(id)
            const debtors = this._debtors.filter(debtor => debtor.id !== id)
            this.setDebtors(debtors)
            //console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}