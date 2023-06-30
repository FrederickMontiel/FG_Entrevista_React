import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Usuarios from "../../../Fakedb/UsuariosFake";
import "../../../Assets/Css/Global/Variables.css"
import "../../../Assets/Css/Pages/Login.css"
import  logoPng  from "../../../Assets/Images/Identification/logo.png"
import { isAdmin, isLogued, isUser } from "../../../Middlewares/Stricts/AuthStrict";

const LoginPage = () =>{
    useEffect(()=>{
        if(isLogued()){
            if(isAdmin()){
                window.location.href = "/admin/pedidos";
            }else if(isUser()){
                window.location.href = "/user/dashboard";
            }
        }

        let usuariosFake = new Usuarios();

        usuariosFake.findAll();
    },[]);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const iniciarSesion = (e:FormEvent) =>{
        e.preventDefault();

        if(validator()){
            let usuariosFake = new Usuarios();
            
            let usuarioEncontrado = usuariosFake.findOne({username: formData.username, password: formData.password});

            if(usuarioEncontrado){
                localStorage.setItem("session", JSON.stringify(usuarioEncontrado));
                window.location.href = "/admin/pedidos";
            }
        }
    }

    const [formError, setFormError] = useState({
        message : ""
    });
    const validator = ():boolean =>{
        if(formData.username === "" || formData.password === ""){
            setFormError({message: "Por favor, ingrese su usuario y contraseña"});
            return false;
        }

        setFormError({message: ""});
        return true;
    }

    return (<div id="loginView">
        <div id="loginView__container">
            <div id="loginView__container__logo">
                <img src={logoPng} alt="4Geeks Academy"/>
            </div>
            <div id="loginView__container__header">
                <h1 className="description">admin:1234 {/*o user:1234*/}</h1>
            </div>
            <div id="loginView__container__form">
            <p className="errorMessage">{formError.message}</p>
                <form onSubmit={(e:FormEvent)=>{iniciarSesion(e)}}>
                    <div className="loginView__container__form__input">
                        <input
                        className="form-input-login"
                        onChange={(e: ChangeEvent) => {
                            let target = e.target as HTMLInputElement;
                            setFormData({...formData, [target.name]: target.value});
                        }} type="username" name="username" id="username" placeholder="Usuario"/>
                    </div>
                    <div className="loginView__container__form__input">
                        <input
                        className="form-input-login"
                        onChange={(e: ChangeEvent) => {
                            let target = e.target as HTMLInputElement;
                            setFormData({...formData, [target.name]: target.value});
                        }} type="password" name="password" id="password" placeholder="Contraseña"/>
                    </div>
                    <div className="loginView__container__form__input">

                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default LoginPage;