import React, { useEffect, useState } from 'react';
import '../styles/Transaction.css';
import { useNavigate } from 'react-router-dom';

function Transaction(){
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState([]);
    const categoryEmojies = {
        "Salary":" 💰",
        "Groceries":"🛒",
        "Dining":"🍽️",
        "Transport":" 🚗 ",
        "Entertainment":" 🎬 ",
        "Others":"🧾"
    };

    useEffect(() => {
        const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransaction(existingTransactions);
    }, [])
    
    console.log(categoryEmojies["Salary"]);

    function handleEdit(index){
        const editTransaction = transaction[index];
        navigate("/add-transaction", { state: { transaction : { ...editTransaction, index } }, });//route and pass the data through state
    }

    function handleDelete(index){
        const updatedTransactions = transaction.filter((data, i) => i!==index);
        setTransaction(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));        
    }

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
                    { transaction.map((tx, index) => (
                        <tr key={index}> {/*Here, we used index bcoz, it is unique*/}
                            <td>{ categoryEmojies[tx.category]}{tx.category }</td>
                            <td>{ tx.description || 'No Description'}</td>
                            <td className = {tx.type =='Income'?'income' : 'expense' } >{ tx.amount.toLocaleString('en-In', {style:'currency', currency:'INR'}) }</td>
                            <td>{ tx.date }</td>
                            <td>{ tx.type }</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-btn" onClick={ () => handleEdit(index) } >✏️ Edit</button>
                                    <button className="delete-btn" onClick={ () => handleDelete(index) }>🗑️ Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Transaction;