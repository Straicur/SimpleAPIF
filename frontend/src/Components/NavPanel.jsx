import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {handleFetch} from "./handleFetch";


//----------------------------------------------------------------------------------------------------------------------
// This is a NavPanel component which is returning a jsx of our whole upper panel
// its receive a setState and state as a props to communikate with parent component
//----------------------------------------------------------------------------------------------------------------------
export const NavPanel = ({setSetState,state}) =>{
    const {t,i18n} = useTranslation ();
    const [redirect,setRedirect]=useState({
        redirect: false,
        name: ""
    })
    const count = useSelector((state)=>state.token.token);
    const logout = ()=> {
        const url = 'http://127.0.0.1:8000/admin/logout';
        const jsonData = {token: count};
        const method = 'POST';
        handleFetch(url, jsonData, method)
            .catch(e => {
                if (e) {
                    console.log(e);
                }
            });
        //TODO to jest do poprawy
        setSetState({...state,updated:true})
    }
    return(
        <>
            <div className="row navbar">
                <div className="col">
                    <img className="logo" src="" alt=""/>
                    <Button
                        variant="dark"
                        size="lg"
                        color="dark"
                        className=" btn button  mt-2"
                        onClick={()=>setRedirect({redirect:true,name:"sets"})}
                        // disabled={}
                    >
                        {t('SetsButton')}
                    </Button>
                    <Button
                        variant="dark"
                        size="lg"
                        color="dark"
                        className=" btn button  mt-2"
                        onClick={()=>setRedirect({redirect:true,name:"users"})}
                        // disabled={}
                    >
                        {t('UsersButton')}
                    </Button>
                </div>
                <div className="col d-flex justify-content-end  align-items-center">
                    <div className="">
                        <a href="#" className="link-dark m-2">{t('about')}</a>
                    </div>
                    <div className="ps-4 ">
                        <Button
                            name="pl"
                            variant={i18n.language === "pl"?"dark":"light"}
                            size="sm"
                            className="btn button"
                            value="dsa"
                            onClick={()=>setSetState({
                                changeLang:"pl"
                            })}
                        >
                            PL
                        </Button>
                        <Button
                            name="en"
                            variant={i18n.language  === "en"?"dark":"light"}
                            size="sm"
                            className="btn button"
                            onClick={()=>setSetState({
                                changeLang:"en"
                            })}
                        >
                            EN
                        </Button>
                    </div>
                    <Button
                        name="logout"
                        variant="dark"
                        size="sm"
                        className="btn button"
                        onClick={logout}
                    >
                        {t('logout')}
                    </Button>
                </div>
                {redirect.redirect && redirect.name ==="sets"?<Redirect to={"/sets"}/> :null}
                {redirect.redirect && redirect.name ==="users"?<Redirect to={"/users"}/> :null}
            </div>
        </>
    )
}
//----------------------------------------------------------------------------------------------------------------------