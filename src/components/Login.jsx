
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../services/pokemonServiceBack";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const { user, password } = data;
        setError(null);
        try {
            const isValid = await login({ user, password });
            if (isValid)
                navigate("/home")
            reset();
        } catch (err) {
            setError(err);
            reset()
            console.error("ERROR::" + err.message)
        }
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nombre"></label>
                    <input
                        type="text"
                        name="user"
                        id="user"
                        {...register("user", {
                            required: true,
                            maxLength: 15,
                        })}
                        placeholder="Usuario"
                        style={{ height: 35, width: 350, textAlign: "center" }}
                    />
                </div>
                <div>
                    <label htmlFor="nombre"></label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        {...register("password", {
                            required: true,
                            maxLength: 15,
                        })}
                        placeholder="Password"
                        style={{ height: 35, width: 350, textAlign: "center" }}
                    />
                </div>
                <input type="submit" value="Entrar" />
                {error && <p>Error en el login</p>}
            </form>
        </div>
    )
}

export default Login
