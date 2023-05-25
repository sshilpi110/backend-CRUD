import React, { useState } from "react";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        const payload = { email, password }
        // console.log(payload)
        fetch("http://localhost:5500/user/login", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res =>{ 
                localStorage.setItem("token",res.token)
                console.log(res)
                
                
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="login">
            <div>Login Page</div>
            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>


        </div>
    )
}
export default Login;