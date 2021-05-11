import React from "react";
import { useSelector } from "react-redux";
import { selectStatus, selectQuote, selectTrade } from "./rfqSlice";
import RFQForm from "./rfqForm";
import Quote from "./quote";
import Trade from "./trade";
import statuses from "../../constants/ajaxStatus";
import styles from "./rfq.module.css";

const RFQ = () => {
  const status = useSelector(selectStatus);
  const quote = useSelector(selectQuote);
  const trade = useSelector(selectTrade);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Request for quote</h3>
      {status === statuses.LOADING ? (
        <p>Loading...</p>
      ) : status === statuses.ERROR ? (
        <p className={styles.error}>Error: couldn't load data!</p>
      ) : trade ? (
        <Trade />
      ) : quote ? (
        <Quote />
      ) : (
        <RFQForm />
      )}
    </div>
  );
};

export default RFQ;
