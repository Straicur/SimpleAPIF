import React, {useEffect, useState, useCallback} from "react";
import{Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import './Login.css';
import {handleFetch} from "../Components/handleFetch";
import { useDispatch } from 'react-redux'
import {AddToken} from "../Redusers/redusers";
import { useTranslation } from 'react-i18next';
import md5 from 'md5';


export const Login = () =>{

    const {t, i18n} = useTranslation ();
    const [userState,setUserState]=useState({
        email: '',
        password: '',
        isButtonDisabled: true,
        helperText: 0,
        redirect: false,
        redirectTo: '',
        changeLang: i18n.language
    })
    const dispatch = useDispatch();
    const handleLogin = () => {
        if(userState.email&&userState.password){
            const url ='https://127.0.0.1:8000/user/login';
            const jsonData = { email: userState.email , password:md5(userState.password)};
            const method ='POST';
            handleFetch(url,jsonData,method)
                .then(data => data.json())
                .then(data => {if(data.token){
                    dispatch(AddToken(data.token));
                    setUserState({
                        ...userState,
                        helperText: 200,
                        redirect:true,
                        redirectTo:'/main'
                    });
                }})
                .catch(e=>{if(e){
                    dispatch(AddToken(""));
                    setUserState({
                        ...userState,
                        helperText: parseInt(e.message),
                    });
                }});
        }
    };
    const handleEmailChange =
        (event) => {
            setUserState({
                ...userState,
                email:event.target.value
            });
        };
    const redirectToRegister = (event) => {
        setUserState({redirect:true,redirectTo:'/register'})
    };
    const handlePasswordChange =
        (event) => {
            setUserState({
                ...userState,
                password:event.target.value
            });
        }
    useEffect(() => {
        if (userState.email.trim() && userState.password.trim()) {

            setUserState({...userState,isButtonDisabled:false});
        } else {
            setUserState({...userState,isButtonDisabled:true});
        }
    }, [userState.email, userState.password]);
    useEffect(()=>{
        if (userState.changeLang != null) {
            i18n.changeLanguage(userState.changeLang);
        }
    },[userState.changeLang])
    const errorCode=()=>{
        switch (userState.helperText){
            case 200 :{
                return ("");
                break;
            }
            case 0 :{
                return ("");
                break;
            }
            case 400 :{
                return (t('Login401'));
                break;
            }
            case 401 :{
                return (t('Login401'));
                break;
            }
            case 501:{
                return (t('Login501'));
                break;
            }
            default:{
                return (t('LoginDefault'));
                break;
            }
        }
    }
    return(
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <p className="text-white-50 mb-5">{t('UserLoginWelcome')}</p>

                                        <div className="form-outline form-white mb-4">
                                            <input
                                                id="typeEmailX"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={userState.email}
                                                className="form-control form-control-lg"
                                                onChange={handleEmailChange}
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input
                                                id="typePasswordX"
                                                type="password"
                                                name="Password"
                                                placeholder="Password"
                                                value={userState.password}
                                                className="form-control form-control-lg "
                                                onChange={handlePasswordChange}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        {userState.helperText !==0?errorCode():null}
                    

                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            color="secondary"
                                            className=" btn mt-2 login-btn form-control"
                                            onClick={()=>handleLogin()}
                                            disabled={userState.isButtonDisabled}>
                                            Zaloguj
                                        </Button>
                                    </div>

                                    <div>
                                        <p className="mb-0"><a onClick={redirectToRegister} className="text-white-50 fw-bold">Zarejestruj</a></p>
                                    </div>
                                    {(userState.redirect)
                                        ? <Redirect to={userState.redirectTo !== undefined ? userState.redirectTo:""} />
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
//----------------------------------------------------------------------------------------------------------------------