import React, { useEffect, useState } from 'react';
import { STOCK_API } from '../utils/stockAPI';
import { TOKEN } from '../utils/stockAPI';
import stockFetcher from '../utils/stockFetcher';
import './PortfolioMonitor.css';

export default function PortfolioMonitor({ stocks, setStocks }) {

    useEffect(() => {
        //Fetches prices and updates the state with current prices and profit or loss for the position
        stockFetcher(stocks, setStocks, profitLossCalculator);
    }, []);

    //Calculates the profit or loss for a single position
    const profitLossCalculator = (price, currentPrice, position, quantity) => {
        let profitLoss = 0;

        if (currentPrice) {
            if (position === 'BUY') {
                profitLoss = (currentPrice - price) * quantity;
            } else {
                profitLoss = (price - currentPrice) * quantity;
            }
        }

        return profitLoss.toFixed(2);
    };

    //Calculates the profit or loss for the whole portfolio
    const profitLossTotalCalculator = (stocks) => {
        let profitLossTotal = 0;

        stocks.forEach((s) => {
            if (!isNaN(Number(s.profitLoss))) {
                profitLossTotal += Number(s.profitLoss);
            }
        });

        return profitLossTotal.toFixed(2);
    };

    const fetchPrices = () => {
        //Fetches prices and updates the state with current prices and profit or loss for the position
        stockFetcher(stocks, setStocks, profitLossCalculator);
    };


    return (
        <div className='monitor-page'>
            <div className='monitor-main-row-wrapper'>
                <div className='monitor-main-row'>Ticker</div>
                <div className='monitor-main-row'>Position</div>
                <div className='monitor-main-row'>Quantity</div>
                <div className='monitor-main-row'>Price</div>
                <div className='monitor-main-row'>Current Price</div>
                <div className='monitor-main-row'>Profit/Loss</div>
                {/* <div className='monitor-main-row'>News</div> */}
            </div>
            {/* For each stock in a portfolio prints a row with info */}
            {stocks.map((s) => {
                return (
                    <div key={s.id}>
                        <div className='monitor-row-wrapper'>
                            <div className='monitor-row'>{s.ticker}</div>
                            <div className='monitor-row'>{s.position}</div>
                            <div className='monitor-row'>{s.quantity}</div>
                            <div className='monitor-row'>{s.price}</div>
                            <div className='monitor-row'>
                                {s.currentPrice ? s.currentPrice : null}
                            </div>
                            <div
                                className={`${
                                    s.profitLoss > 0 ? 'profit-row' : 'loss-row'
                                } monitor-row`}
                            >
                                {s.profitLoss ? s.profitLoss : null}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='monitor-summary-row-wrapper'>
                <div className='monitor-summary-row'>Total:</div>
                <div
                    className={`${
                        profitLossTotalCalculator(stocks)
                            ? 'profit-row'
                            : 'loss-row'
                    } monitor-summary-row`}
                >
                    {profitLossTotalCalculator(stocks)}
                </div>
            </div>
            <button className='monitor-fetch-prices' onClick={fetchPrices}>
                <span>Update prices</span>
            </button>
        </div>
    );
}
