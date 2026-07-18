import React from 'react';
import '../styles/Transaction.css';

function Transaction(){

    const existingTransaction = JSON.parse(localStorage.getItem("transactions")) || [];

    const categoryEmojies = {
        "Salary":" 💰",
        "Groceries":"🛒",
        "Dining":"🍽️",
        "Transport":" 🚗 ",
        "Entertainment":" 🎬 ",
        "Others":"🧾"
    };
    console.log(categoryEmojies["Salary"]);

    existingTransaction.map((data, i)=>{
        console.log(data);
    });
    return(
        <div>

            <h2>All Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { existingTransaction.map((tx, index) => (
                        <tr key={index}> {/* Here, we used index bcoz, it is unique */}
                            <td>{ categoryEmojies[tx.category]}{tx.category }</td>
                            <td>{ tx.description || 'No Description'}</td>
                            <td className = {tx.type =='Income'?'income' : 'expense' } >{ tx.amount.toLocaleString('en-In', {style:'currency', currency:'INR'}) }</td>
                            <td>{ tx.date }</td>
                            <td>{ tx.type }</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-btn">✏️ Edit</button>
                                    <button className="delete-btn">🗑️ Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
export default Transaction;