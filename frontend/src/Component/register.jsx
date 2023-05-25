import React, { useState } from "react";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = () => {
        const payload = { name, email, password }
        fetch("http://localhost:5500/user/register", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <div className="register">
            <div>Registration page</div>

            <input type="text" placeholder="Enter Name " value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Submit</button>

        </div>
    )
}

export default Register;