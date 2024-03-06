import React, { useState } from "react";

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label_huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" height="150" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
      </label>
    );
  };
  //sets the React hooks.
  export const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      // Checks if transaction is valid. 
      if (event.target.value <= 0 || (atmMode === "Cash Back" && event.target.value > totalState)) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      //checks on submit if its vaslid and if it is. Changes Balance. 
      if (atmMode === "Deposit" || atmMode === "Cash Back") {
        if (validTransaction) {
          let newTotal;
          if (atmMode === "Deposit") {
            newTotal = totalState + deposit;
          } else if (atmMode === "Cash Back" && totalState >= deposit) {
            newTotal = totalState - deposit;
          } else {
            // If the withdrawal amount is greater than the balance, don't change the balance
            newTotal = totalState;
          }
          setTotalState(newTotal);
        }
      }
      event.preventDefault();
    };
  //function is for checking with mode the select  button was clicked. Then sets IsDeposit to true or false based off of that. 
    const handleModeSelect = (event) => {
      const selectedMode = event.target.value;
      setAtmMode(selectedMode);
  
      if (selectedMode === "Deposit") {
        setIsDeposit(true);
      } else if (selectedMode === "Cash Back") {
        setIsDeposit(false);
      }
    };
    //adds drop down selector for mode of ATM operation. 
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label> Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name='mode' id='mode-select'>
          <option id='no-selection' value=''></option>
          <option id='deposit-selection' value='Deposit'>Deposit</option>
          <option id='cashback-selection' value='Cash Back'>Cash Back</option>
        </select>
        {atmMode && (
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        )}
      </form>
    );
  };  