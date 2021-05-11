import React from "react";
import { useSelector } from "react-redux";
import { selectRecentTrades, selectStatus } from "./ledgerSlice";
import { removeDecimal } from "../../utils";
import statuses from "../../constants/ajaxStatus";
import styles from "./ledger.module.css";

const Ledger = () => {
  const status = useSelector(selectStatus);
  const recentTrades = useSelector(selectRecentTrades);

  return (
    <div className={styles.ledgerContainer}>
      <h4>Recent trades</h4>
      {status === statuses.LOADING ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.ledgerTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Side</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((trade) => {
              const baseCurrency = trade.instrument.substring(0, 3);
              const counterCurrency = trade.instrument.substring(3, 6);

              return (
                <tr key={trade.trade_id}>
                  <td>{trade.createdDate}</td>
                  <td>{trade.createdTime}</td>
                  <td
                    className={trade.side === "buy" ? styles.buy : styles.sell}
                  >
                    {trade.side.toUpperCase()}
                  </td>
                  <td>
                    {removeDecimal(trade.quantity)} {baseCurrency}
                  </td>
                  <td>
                    {removeDecimal(trade.price)} {counterCurrency}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ledger;
