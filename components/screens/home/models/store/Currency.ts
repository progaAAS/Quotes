import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {converterData} from "../../../../../shared/lib/converterData";
import axios from "axios";
import {ICurrencyData, IData} from "../types/Quotes";

class Currency {
    @observable count: number = 0;
    @observable currency: ICurrencyData = {};
    @observable isLoading: boolean = true;
    @observable error: string = '';
    @observable isOnlyInterval: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    increment() {
        this.count = this.count + 1
    }

    @action
    setIsOnlyInterval() {
        this.isOnlyInterval = true
    }
    @action
    setError(error: string) {
        this.error = error
    }
    @action
    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading
    }

    async fetchCurrency() {
        await axios.get<ICurrencyData>('https://poloniex.com/public?command=returnTicker').then(response =>{

            if(response.data.error) {
                this.setError('Error');
                console.log(response.data);
            }

            runInAction(() => {
                this.currency = response.data;
            })

        }).catch(err => {
            this.setError(err);
            console.log(err);
        })
        .finally(() => {
            this.setIsLoading(false);
        })
    }
}

export default new Currency;
