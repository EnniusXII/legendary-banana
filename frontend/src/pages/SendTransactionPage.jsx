import React, { useState } from 'react';
import { mineBlock, sendTransaction } from '../services/HttpClient';

export const SendTransactionPage = () => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await sendTransaction(recipient, amount);
        console.log(response);

        if (response.success) {
          window.alert("Successfully added transaction. Please mine the block to confirm");
          setRecipient("");
          setAmount("");
        }
      } catch (error) {
        console.error(error);
        window.alert("Transaction failed. Please try again.");
      }
    };
  
    const handleMineBlock = async () => {
      try {
        await mineBlock();

        window.alert("Block mined successfully and added to the blockchain.");
        window.location.href = "/blocks";
      } catch (error) {
        console.error("Error mining transactions:", error);
      }
    };
  
    return (
      <div className="sendTransactionWrapper">
        <h1>Send a Transaction</h1>
        <form className="forms" onSubmit={handleSubmit}>
            <label>Recipient:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          <button type="submit">Add Transaction</button>
          <button type="button" onClick={handleMineBlock}>
            Mine Block
          </button>
        </form>
      </div>
    );
}
