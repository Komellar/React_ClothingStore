import { useRef } from 'react';
import { Link } from 'react-router-dom';

import './ClothItemForm.css';

const ClothItemForm = (props) => {
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    props.onAdd(enteredAmountNumber);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <label className="amount-label" htmlFor="amount">
        Amount
      </label>
      <input
        ref={amountInputRef}
        className="amount-input"
        type="number"
        name="amount"
        min="1"
        max="5"
        step="1"
        defaultValue="1"
      />
      <div className="item-buttons">
        <button className="add-button" type="submit">
          + Add
        </button>
        {/* <Link to={`/products/${props.id}`} className="item-details">
          Show Details
        </Link> */}
      </div>
    </form>
  );
};

export default ClothItemForm;
