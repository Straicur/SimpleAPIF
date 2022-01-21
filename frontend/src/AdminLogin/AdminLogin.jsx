import React, {useEffect, useState, useCallback} from "react";
import{Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import './AdminLogin.css';
import {handleFetch} from "../Components/handleFetch";
import { useDispatch } from 'react-redux'
import {AddToken} from "../Redusers/redusers";
import { useTranslation } from 'react-i18next';
import md5 from 'md5';
//----------------------------------------------------------------------------------------------------------------------
// This component is responsible for login of admin and setting a new token to enter an application
//----------------------------------------------------------------------------------------------------------------------
export const AdminLogin = () =>{
    const {t, i18n} = useTranslation ();
    const [userState,setUserState]=useState({
        username: '',
        password: '',
        isButtonDisabled: true,
        helperText: 0,
        redirect: false,
        changeLang: i18n.language
    })

    const dispatch = useDispatch();
//----------------------------------------------------------------------------------------------------------------------
// Fetching data to backend and after receiving data a redirect flag is set to true and we are redirected to sets panel
//----------------------------------------------------------------------------------------------------------------------
    const handleLogin = () => {
        const url ='https://127.0.0.1:8000/admin/login';
        const jsonData = { email: userState.username , password:md5(userState.password)};
        const method ='POST';
        handleFetch(url,jsonData,method)
            .then(data => data.json())
            .then(data => {if(data.token){
                dispatch(AddToken(data.token));
                setUserState({
                    ...userState,
                    helperText: 200,
                    redirect:true
                });
            }})
            .catch(e=>{if(e){
                console.log(e)
                dispatch(AddToken(""));
                setUserState({
                    ...userState,
                    helperText: parseInt(e.message),
                });

            }});
    };
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
// Event checking if enter is is clicked and performes a login if button is not disabled
//----------------------------------------------------------------------------------------------------------------------
    const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            userState.isButtonDisabled || handleLogin();
        }
    };
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
// Events that are changing our states when someone changes a input value
//----------------------------------------------------------------------------------------------------------------------
    const handleUsernameChange =
        (event) => {
            setUserState({
                ...userState,
                username:event.target.value
            });

        };

    const handlePasswordChange =
        (event) => {
            setUserState({
                ...userState,
                password:event.target.value
            });
        }
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
// This useEffect is checking if an login and password input is not empty and if its a button is disabled
//----------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (userState?.username?.trim() && userState?.password?.trim()) {

            setUserState({...userState,isButtonDisabled:false});
        } else {
            setUserState({...userState,isButtonDisabled:true});
        }
    }, [userState.username, userState.password]);
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
// This useEffect is performing a language change after a right state is changed
//----------------------------------------------------------------------------------------------------------------------
    useEffect(()=>{
        if (userState.changeLang != null) {
            i18n.changeLanguage(userState.changeLang);
        }
    },[userState.changeLang])
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
// This method is returning a error message
//----------------------------------------------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------------------------------------
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center mx-auto  ">
            <div className="card text-center shadow p-3 mb-5">
                <h1>Admin Login</h1>
                <form className="" autoComplete="off">
                    <div className="">
                        <div className="" />
                        <div className="form-group input">
                            <input
                                id="username"
                                type="text"
                                name="Username"
                                placeholder="Username"
                                value={userState.username}
                                className="form-control mt-2 "
                                onChange={handleUsernameChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                        <div className="form-group input">
                            <input
                                id="password"
                                type="password"
                                name="Password"
                                placeholder="Password"
                                value={userState.password}
                                className="form-control mt-2 "
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            variant="dark"
                            size="lg"
                            color="dark"
                            className=" btn mt-2 login-btn form-control"
                            onClick={()=>handleLogin()}
                            disabled={userState.isButtonDisabled}>
                            NEXT
                        </Button>
                    </div>
                    {errorCode()}
                </form>
                <div>
                </div>

                {(userState.redirect)?<Redirect to="/admin/main" />
                    :null}
            </div>
        </div>
    );
};