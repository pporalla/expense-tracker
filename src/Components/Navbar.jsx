import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
    const location = useLocation();
    const [quote, setQuote] = useState("");
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [author, setAuthor] = useState("");

    const fetchQuote = async () => {
        try {
            const response = await fetch(
                "https://gomezmig03.github.io/MotivationalAPI/en.json"
            );

            const data = await response.json();

            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];

            setQuote(randomQuote.phrase);
            setAuthor(randomQuote.author);
            setIsModelOpen(true);

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar">
            <h1 className="logo">Expense Tracker</h1>

            <ul className="nav-links">
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Dashboard</Link>
                </li>

                <li className={location.pathname === "/transaction" ? "active" : ""}>
                    <Link to="/transaction">Transaction</Link>
                </li>

                <li className={location.pathname === "/reports" ? "active" : ""}>
                    <Link to="/reports">Reports</Link>
                </li>

                <li>
                    <div className="quote-btn" onClick={fetchQuote}>
                        Get Quote
                    </div>
                </li>
            </ul>

            {isModelOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{quote}</p>
                        <h4>- {author}</h4>

                        <button
                            className="cls-btn"
                            onClick={() => setIsModelOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;