import { makeAutoObservable } from "mobx"
import debtService from "../services/debtService"


export default class DebtsStore {
    constructor() {
        this._debts = [
            
        ]
        makeAutoObservable(this)
    }

    setDebts(debts) {
        this._debts = debts
    }

    get debts() {
        return this._debts
    }

    async addDebt(title, debt, debtorId) {
        try {
            const response = await debtService.add(title, debt, debtorId)
            //console.log(response.data)
            this._debts.push(response.data.debt)
        } catch (e) {
            console.log(e)
        }
    }

    async delDebt(id) {
        try {
            const response = await debtService.remove(id)
            const debts = this._debts.filter(debt => debt.id !== id)
            this.setDebts(debts)
            //console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}