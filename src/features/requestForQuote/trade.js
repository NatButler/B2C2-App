import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTrade, resetRFQ } from "./rfqSlice";
import { removeDecimal } from "../../utils";
import styles from "./rfq.module.css";

const Trade = () => {
  const dispatch = useDispatch();
  const trade = useSelector(selectTrade);
  const baseCurrency = trade.instrument.substring(0, 3);
  const counterCurrency = trade.instrument.substring(3, 6);

  return (
    <div className={styles.tradeContainer}>
      <p className={styles.tradeDescription}>Trade succesfull</p>
      <dl className={styles.quoteList}>
        <dt>Instrument:</dt> <dd>{trade.instrument}</dd>
        <dt>Quantity:</dt>
        <dd>{`${removeDecimal(trade.quantity)} (${baseCurrency})`}</dd>
        <dt>Price:</dt>
        <dd>
          {removeDecimal(trade.price)} ({counterCurrency})
        </dd>
      </dl>
      {/* <pre>{JSON.stringify(trade, null, "\t")}</pre> */}
      <button
        className={`${styles.primaryButton} ${styles.newRFQButton}`}
        onClick={() => dispatch(resetRFQ())}
      >
        Create new RFQ
      </button>
    </div>
  );
};

export default Trade;
