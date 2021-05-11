import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstruments,
  selectInstrument,
  setInstrument,
  postRfq,
} from "./rfqSlice";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import styles from "./rfq.module.css";

const RFQForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const instruments = useSelector(selectInstruments);
  const instrument = useSelector(selectInstrument);
  const baseCurrency = instrument.substring(0, 3);

  const onSubmit = (data) => {
    dispatch(
      postRfq({
        ...data,
        client_rfq_id: v4(),
      })
    );
  };

  const handleInstrumentSelect = (e) => {
    dispatch(setInstrument(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <select
        {...register("instrument")}
        value={instrument}
        onChange={handleInstrumentSelect}
      >
        {Object.keys(instruments).map((curr) => (
          <optgroup key={curr} label={curr}>
            {instruments[curr].map((instrument, i) => {
              const base = instrument.underlier.substring(0, 3);
              const counter = instrument.underlier.substring(3, 6);
              return (
                <option key={i + instrument.underlier} value={instrument.name}>
                  {`${base} / ${counter}`}
                </option>
              );
            })}
          </optgroup>
        ))}
      </select>
      <div className={styles.radios}>
        <label forhtml='buy' className={`${styles.radio} ${styles.buyLabel}`}>
          <input
            type='radio'
            {...register("side", {
              required: "Please select to either buy or sell.",
            })}
            id='buy'
            value='buy'
            name='side'
            defaultChecked
          />
          <span className='label-body'>BUY</span>
        </label>
        <label forhtml='sell' className={`${styles.radio} ${styles.sellLabel}`}>
          <input
            type='radio'
            {...register("side", {
              required: "Please choose to either buy or sell.",
            })}
            id='sell'
            value='sell'
            name='side'
          />
          <span className='label-body'>SELL</span>
        </label>
      </div>
      {errors.side && <p className={styles.formError}>{errors.side.message}</p>}
      <input
        type='number'
        {...register("quantity", { required: "A quantity is required." })}
        placeholder='Quantity'
        min='1'
        max='1000000'
        step='0.00000001'
      />
      <span className={styles.baseCurrency}>{baseCurrency}</span>
      {errors.quantity && (
        <p className={styles.formError}>{errors.quantity.message}</p>
      )}
      <input type='submit' value='Request' className={styles.primaryButton} />
    </form>
  );
};

export default RFQForm;
