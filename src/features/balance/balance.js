import React from "react";
import { useSelector } from "react-redux";
import { selectBalance, selectStatus } from "./balanceSlice";
import statuses from "../../constants/ajaxStatus";
import styles from "./balance.module.css";

const Balance = () => {
  const balances = useSelector(selectBalance);
  const status = useSelector(selectStatus);

  return (
    <div className={styles.balanceContainer}>
      <h4 style={{ paddingTop: "4px" }}>Balances</h4>
      {status === statuses.LOADING ? (
        <p>Loading...</p>
      ) : (
        <div className='row'>
          <div className='one-half column'>
            <h5>Crypto</h5>
            <table className={styles.balanceTable}>
              <tbody>
                {balances.crypto.map((bal) => {
                  const [[key, value]] = Object.entries(bal);
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td
                        className={
                          value.includes("-")
                            ? styles.balValueNeg
                            : styles.balValue
                        }
                      >
                        {value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='one-half column'>
            <h5>Fiat</h5>
            <table className={styles.balanceTable}>
              <tbody>
                {balances.fiat.map((bal) => {
                  const [[key, value]] = Object.entries(bal);
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td
                        className={
                          value.includes("-")
                            ? styles.balValueNeg
                            : styles.balValue
                        }
                      >
                        {value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Balance;
