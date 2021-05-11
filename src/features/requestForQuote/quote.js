import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectQuote, resetQuote, postTrade } from "./rfqSlice";
import { calcTimeRemaining, removeDecimal } from "../../utils";
import styles from "./rfq.module.css";

const Quote = () => {
  const dispatch = useDispatch();
  const quote = useSelector(selectQuote);
  const baseCurrency = quote.instrument.substring(0, 3);
  const counterCurrency = quote.instrument.substring(3, 6);
  const [timeLeft, setTimeLeft] = useState(
    calcTimeRemaining(quote.valid_until)
  );
  const tradeQuote = {
    instrument: quote.instrument,
    side: quote.side,
    quantity: quote.quantity,
    price: quote.price,
    rfq_id: quote.rfq_id,
    executing_unit: "risk-adding-strategy",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calcTimeRemaining(quote.valid_until));
    }, 1000);

    if (timeLeft === 0) {
      dispatch(resetQuote());
    }

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.quoteContainer}>
      <p
        className={styles.quoteDescription}
      >{`${quote.side.toUpperCase()} ${removeDecimal(
        quote.quantity
      )} (${baseCurrency}) @ ${removeDecimal(
        quote.price
      )} (${counterCurrency})`}</p>
      <dl className={styles.quoteList}>
        <dt>Instrument:</dt> <dd>{quote.instrument}</dd>
        <dt>Quantity:</dt>
        <dd>{`${removeDecimal(quote.quantity)} (${baseCurrency})`}</dd>
        <dt>Price:</dt>
        <dd>
          {removeDecimal(quote.price)} ({counterCurrency})
        </dd>
        <dt>Valid for:</dt> <dd>{timeLeft} seconds</dd>
        <button
          className={`${styles.primaryButton} ${styles.tradeButton}`}
          onClick={() => dispatch(postTrade(tradeQuote))}
        >
          Trade
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => dispatch(resetQuote())}
        >
          Cancel
        </button>
      </dl>
    </div>
  );
};

export default Quote;
