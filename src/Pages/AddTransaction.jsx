import React from 'react';
import '../styles/AddTransaction.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function AddTransaction(){
    const [type, setType] = useState("Expense");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [transaction, setTransaction] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const location = useLocation();

    function handleAddTransaction(e){

        console.log(type, amount, category, description, date);

        if (!amount || !category || !date){
            return alert("Please fill all the details");
        }

        const currentTransaction = {
            type: type,
            amount:parseFloat(amount),
            category,
            description,
            date
        }
        let newTransactions;
        if (editIndex == null){
            newTransactions = [...transaction, currentTransaction];
        }
        else{
            newTransactions=[...transaction];
            newTransactions[editIndex] = currentTransaction;
        }


        
        console.log(transaction);
        
        console.log(newTransactions);
        localStorage.setItem("transactions", JSON.stringify(newTransactions));
        if (editIndex !== null){
            alert(`${type} updated successfully`)
        }
        else{
            alert(`${type} added Successfully`);
        }
        
        setCategory("");
        setDescription("")
        setDate("");
        setType("Expense");
        setAmount("");
        setEditIndex(null);
    }

    useEffect( () => {
        const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || []; //If the transaction is not yet created, the empty array will run and when the new transaction(object) is created, then the new object will store in the array.
        setTransaction(existingTransactions);

        console.log(location.state);
        if (location.state && location.state.transaction){
            const transaction = location.state.transaction;
            setType(transaction.type);
            setAmount(transaction.amount);
            setCategory(transaction.category);
            setDescription(transaction.description);
            setDate(transaction.date);
            setEditIndex(transaction.index);
        }

    }, [location]);

    return(
        <div className="add-transaction-container">
            <h2>Add Transaction</h2>
            <div className="transaction-box">
                <div className="transaction-type">
                    <label>
                        <input type="radio" value="Expense" checked = {type=="Expense"} onChange={ (e) => setType("Expense") }/> Expense
                    </label>
                    <label>
                        <input type="radio" value="Income" checked = {type=="Income"} onChange={ (e) => setType("Income") }/> Income
                    </label>
                </div>
                <input type="number" value = {amount} placeholder = 'Amount (Rs.)' onChange={ (e) => setAmount(e.target.value) }/>
                <select value={category} onChange={ (e) => setCategory(e.target.value) }>
                    <option value="">Select a category</option>
                    <option value="Salary">Salary</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Dining">Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Others">Others</option>
                </select>
                <textarea value={description} placeholder="Description" onChange={ (e) => setDescription(e.target.value) }></textarea>
                <input type="date" value={date} onChange={ (e) => setDate(e.target.value) } />
                <button onClick={ handleAddTransaction }>{editIndex==null?'Add Transaction':'Update Transaction'}</button>
            </div>
        </div>
    );
}

export default AddTransaction;