import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    const handleInvoice = (type) => {
        if (type === 'new') {
            navigate("/invoice", { state: { type } });
        } else if (type === 'default') {
            navigate("/invoice", { state: { type } });
        }

    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to Home Page </h1>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <button style={{ marginTop: "20px", padding: "10px 20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "blue", color: 'white' }} onClick={() => handleInvoice('default')}>Fill Default Values</button>
                <button onClick={() => handleInvoice('new')} style={{ marginTop: "20px", padding: "10px 20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "lightseagreen", color: 'white' }}>Create Invoice</button>
                <button
                    onClick={handleLogout}
                    style={{ marginTop: "20px", padding: "10px 20px", border: "1px solid black", borderRadius: "5px", backgroundColor: "red", color: "white", cursor: "pointer" }}
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

