import React, {useEffect, useState, useCallback} from "react";
import{Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {handleFetch} from "../Components/handleFetch";
import { useTranslation } from 'react-i18next';
import {RegisterNotification} from "./RegisterNotification";
import md5 from "md5";



export const Register= () =>{
    const {t, i18n} = useTranslation ();
    const [userState,setUserState]=useState({
        email: '',
        password: '',
        confirmPassword:'',
        isButtonDisabled: true,
        helperText: 0,
        redirect: false,
        redirectTo: '',
        changeLang: i18n.language,
        modalShow: false
    })
    const [emailModal,setEmailModal]=useState(false);
    const handleRegister = () => {
        if(!validateEmail(userState.email)){
            setUserState({
                ...userState,
                helperText: 5,
            });

        }
        if(!validatePassword(userState.password)){
            setUserState({
                ...userState,
                helperText: 2,

            });
        }
        if(userState.confirmPassword!==userState.password){
            setUserState({
                ...userState,
                helperText: 1,

            });
        }

        if(userState.confirmPassword!==userState.password&&!validateEmail(userState.email)){
            setUserState({
                ...userState,
                helperText: 3,
            });
        }
        if(!validatePassword(userState.password)&&!validateEmail(userState.email)){
            setUserState({
                ...userState,
                helperText: 4,
            });
        }

        if(userState.password === userState.confirmPassword && validateEmail(userState.email) && validatePassword(userState.password))
        {
            const url ='https://127.0.0.1:8000/user/register';
            const jsonData = { email: userState.email ,role:["user"] ,password: md5(userState.password) };
            const method ='POST';
            handleFetch(url,jsonData,method)
                .then(data => {if(data){
                    setUserState({
                        ...userState,
                        helperText: 200,
                        modalShow:true
                    });
                }})
                .catch(e=>{if(e){
                    console.log(e.message)
                    setUserState({
                        ...userState,
                        helperText: parseInt(e.message),
                    });
                }});
        }



    };
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validatePassword(pass) {
        const re =  /^[A-Za-z]\w{3,8}$/;
        return re.test(pass);
    }
    const handleEmailChange =
        (event) => {
            setUserState({
                ...userState,
                email:event.target.value
            });
        };
    const redirectToLogin = (event) => {
        setUserState({redirect:true,redirectTo:'/login'})
    };

    const handleConfirmPasswordChange =
        (event) => {
            setUserState({
                ...userState,
                confirmPassword:event.target.value
            });

        }
    const handlePasswordChange =
        (event) => {
            setUserState({
                ...userState,
                password:event.target.value
            });
        }
    useEffect(() => {
        if (userState.email.trim() && userState.password.trim() && userState.confirmPassword.trim()) {

            setUserState({...userState,isButtonDisabled:false});
        } else {
            setUserState({...userState,isButtonDisabled:true});
        }
    }, [userState.email, userState.password,userState.confirmPassword]);

    const errorCode=()=>{
        switch (userState?.helperText){
            case 200 :{
                return ("");
                break;
            }
            case 401 :{
                return (t('Login401'));
                break;
            }
            case 500:{
                return (t('UserRegisterIs'));
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
                                        
                                        <p className="text-white-50 mb-5">Rejestracja</p>
        
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
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                id="typePasswordX"
                                                type="password"
                                                name="Password"
                                                placeholder="ConfirmPassword"
                                                value={userState.confirmPassword}
                                                className="form-control form-control-lg "
                                                onChange={handleConfirmPasswordChange}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">ConfirmPassword</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            {userState.helperText !==0?errorCode():null}
                                        </div>
                                        <Button
                                            variant="dark"
                                            size="lg"
                                            color="dark"
                                            className="btn btn-outline-light btn-lg px-5"
                                            onClick={()=>handleRegister()}
                                            disabled={userState.isButtonDisabled}>
                                            Zarejestruj
                                        </Button>

                                    </div>
                                    <div>

                                        <p className="mb-0"><a  onClick={redirectToLogin} className="text-white-50 fw-bold">Powrót do logowania</a></p>
                                    </div>
                                    {userState.modalShow?<RegisterNotification setModalState={setUserState} state={userState}/>:null}
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