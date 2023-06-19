interface ICurrencyData {
    [key: string]: {
        id: number;
        last: string;
        lowestAsk: string;
        highestBid: string;
        percentChange: string;
        baseVolume: string;
        quoteVolume: string;
        isFrozen: string;
        postOnly: string;
        high24hr: string;
        low24hr: string;
    };
}

interface IData {
    id: number;
    last: string;
    lowestAsk: string;
    highestBid: string;
    percentChange: string;
    baseVolume: string;
    quoteVolume: string;
    isFrozen: string;
    postOnly: string;
    high24hr: string;
    low24hr: string;
}

export const converterData = (data: ICurrencyData): IData[] => {
    return Object.keys(data).map((key) => ({
        key,
        ...data[key]
    }));
}
