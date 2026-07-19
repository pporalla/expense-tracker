import React from "react";

function RecentTransactions({ transactions }) {

    const categoryEmojies = {
        "Salary": " 💰",
        "Groceries": "🛒",
        "Dining": "🍽️",
        "Transport": " 🚗 ",
        "Entertainment": " 🎬 ",
        "Others": "🧾"
    };

    return (
        <>
            <ul>
                {transactions.slice(-8).reverse().map((tx, index) => (
                    <li key={index} className="transaction-item">
                        <span className="transaction-category">
                            {categoryEmojies[tx.category]} {tx.category}
                        </span>
                        <span className={`transaction-amount ${
                            tx.type === "Income" ? "income" : "expense"
                        }`}>
                            ₹{tx.amount.toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );

}

export default RecentTransactions;