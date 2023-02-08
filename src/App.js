import React, { useState } from "react";

const App = () => {
    const [returnData, setReturnData] = useState({});
    const [amount, setAmount] = useState(100);

    const historicCalc = async (evt) => {
        evt.preventDefault();
        const start = Math.floor(new Date('2022-01-01').getTime() / 1000);
        const end = Math.floor(new Date().getTime() / 1000);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${start}&to=${end}`);
        const data = await response.json();

        const startPrice = data.prices[0][1];
        const endPrice = data.prices[data.prices.length - 1][1];
        const cryptoAmount = amount / startPrice;
        const endAmount = cryptoAmount * endPrice;
        const percentage = (endAmount / amount * 100) - 100;


        return {
            startPrice: startPrice,
            endPrice: endPrice,
            cryptoAmount: cryptoAmount,
            endAmount: endAmount,
            percentage: percentage
        }
    }

    const handleClick = async (evt) => {
        await setReturnData(historicCalc(evt))
        console.log(returnData)
    }

    return (
        <div>
            <input name='amount' type='number' value={amount} onChange={(evt) => setAmount(evt.target.value)}></input>
            <button onClick={(evt) => handleClick(evt)}>calculate</button>
            <h1>Crypto amount: {returnData.cryptoAmount}</h1>
        </div>
    )
}


export default App;