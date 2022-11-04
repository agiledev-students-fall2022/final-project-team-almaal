import { STOCK_API } from '../utils/stockAPI';
import { TOKEN } from '../utils/stockAPI';
import DATABASE from '../utils/database';
//Function which fetches the current prices and updates our state with current prices and profit/loss
const stockFetcher = (stocks, setStocks, profitLossCalculator) => {
    stocks.forEach(async (s) => {
        try {
            const stockName = s.ticker.replace('', '');
            const response = await fetch("https://my.api.mockaroo.com/stockDATA.json?key=8052c770"  
            );
            const data = await response.json();

            const profitLoss = profitLossCalculator(
                s.Price,
                data.c,
                s.Position,
                s.Quantity
            );

            const stockWithPrice = {
                ...s,
                currentPrice: data.c.toFixed(2),
                profitLoss,
            };

            const indexOfStock = stocks.indexOf(s);
            setStocks((stocks) => [
                ...stocks.slice(0, indexOfStock),
                stockWithPrice,
                ...stocks.slice(indexOfStock + 1),
            ]);
        } catch (error) {
            /*The option how to handle the error is totally up to you. 
                Ideally, you can send notification to the user */
            console.log(error);
        }
    });
};

export default stockFetcher;