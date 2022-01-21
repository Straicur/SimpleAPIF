import React, {useEffect, useState, useCallback} from "react";
import{Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import './AdminMain.css';
import {handleFetch} from "../Components/handleFetch";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {DetailModal} from "./DetailModal";
import {EditModal} from "./EditModal";
import {NewPostModal} from "./NewPostModal";

export const AdminMain = () =>{
    const {t, i18n} = useTranslation ();

    const [jsonState,setJsonState]=useState([
        {
            post_id: 0,
            title: '',
            text: '',
            post_date:'',
            com_amount: 0
        }
    ]);
    const [state,setState]=useState({
        modalAddShow: false,
        modalEditShow: false,
        modalDetailShow: false,
        modalShow:false,
        updated: false,
        errors: 0,
        redirect: false,
        redirectTo: '',
        title: '',
        text: '',
        stateId:''
    });

    const count = useSelector((state)=>state.token.token);
    const handleData = ()=> {
        const url ='https://127.0.0.1:8000/admin/posts';
        const jsonData = {token: count};
        const method ='POST';
        handleFetch(url,jsonData,method)
            .then(data => data.json())
            .then(data => {if(data){
                data.map((row)=>{
                    let table=[];
                    console.log(row)
                setJsonState(state => {
                    return state.map((item, j) => {
                        if ((item.post_id === 0 && j===0) || item.post_id === row.post_id) {
                            table.push(row.post_id)
                            return {
                                post_id: row.post_id,
                                title: row.title,
                                text: row.text,
                                post_date: row.post_date,
                                com_amount: row.com_amount
                            };
                        }
                        else {
                            return item;
                        }
                    });
                })
                let stateTable = false;
                table.forEach(e=> {
                    stateTable = (e === row.post_id);
                });
                let multiCheck = "";
                for (let x in jsonState) {
                    if(multiCheck === ""){
                        if( !stateTable && jsonState[x].post_id !== row.post_id ) {
                            multiCheck = row.post_id;
                            setJsonState(arr=>[...arr,{
                                post_id: row.post_id,
                                title: row.title,
                                text: row.text,
                                post_date: row.post_date,
                                com_amount: row.com_amount
                            }])
                        }
                    }

                }
                })
            }})
            .catch(e=>{if(e){
                if(parseInt(e.message)===401){
                    redirectToLogin();
                }
                setState({errors:parseInt(e.message)})
            }});
    };

    useEffect(()=>{
        handleData();
    },[])
    const redirectToLogin = () => {
        setState({redirect:true,redirectTo:'/admin/login'})
    };

    const showDetailModal = (post_id) => {
        setState({modalDetailShow:true,modalShow:true,stateId:post_id})
    };
    const editModal = (post_id,r_title,r_text) => {
        //TODO tu ma być edit i delet
        setState({modalEditShow:true,modalShow:true,stateId:post_id})
    };
    const addNewPost = () => {
        
        setState({modalAddShow:true,modalShow:true})
    };
    const logout = () => {
        const url ='https://127.0.0.1:8000/admin/posts';
        const jsonData = {token: count};
        const method ='POST';
        handleFetch(url,jsonData,method)
            .then(data => {if(data){
                redirectToLogin();
            }})
            .catch(e=>{if(e){
                redirectToLogin();
            }});
    };
    
    
    const errorCode=()=>{
        switch (state.helperText){
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
                return ("");
                break;
            }
        }
    }
    const createPosts=()=>{
        return jsonState.map((row)=>{
            let myuuid=[] ;
            for(let i=0;i<9;i++)
            {
                myuuid[i]= uuidv4();
            }

            return (
                <div className="row" key={myuuid[0]}>
                    <div className="col-10" key={myuuid[1]}>
                        <div className="row" key={myuuid[2]}>
                            <div className="col" key={myuuid[3]}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title">Data Updatu: {row.post_date}</h5>
                                            <h5 className="card-title">Tytuł : {row.title}</h5>
                                            <p className="card-text">Treść: {row.text}</p>
                                        </div>
                                        Ilość komentarzy: {row.com_amount}
                                    </div>
                            </div>
                            <div className="col" key={myuuid[4]}>
                                <Button
                                    variant="dark"
                                    size="lg"
                                    color="dark"
                                    className=" btn button"
                                    onClick={()=>{showDetailModal(row.post_id,row.title,row.text)}}
                                >
                                    Szczegóły
                                </Button>
                                <Button
                                    variant="dark"
                                    size="lg"
                                    color="dark"
                                    className=" btn button"
                                    onClick={()=>{editModal(row.post_id)}}
                                >
                                    Edytuj
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-2" key={myuuid[2]}>

                    </div>
                    
                </div>
            )
        })
    }

    return (
        <div className="container-fluid main-container mt-3">
            <div className="card position-relative shadow p-3 mb-5">
                {state.modalShow && state.modalDetailShow ? <DetailModal setState={setState} state={state} token={count}/>:null}
                {state.modalShow && state.modalEditShow ? <EditModal setState={setState} state={state} token={count}/>:null}
                {state.modalShow && state.modalAddShow ? <NewPostModal setState={setState} state={state} token={count}/>:null}
                <div className="table-title row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-3">
                                <h2 className="col-8">BLOG</h2>
                            </div>
                            <div className="col-9">
                                <Button
                                    variant="dark"
                                    size="lg"
                                    color="dark"
                                    className=" btn button"
                                    onClick={()=>{addNewPost()}}
                                >
                                    Dodaj post
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-4">
                        <Button
                            variant="dark"
                            size="lg"
                            color="dark"
                            className=" btn button"
                            onClick={()=>{logout()}}
                        >
                           Wyloguj
                        </Button>
                    </div>
                    {errorCode()}
                </div>
                <div>
                    <div className="row post-row">
                        {createPosts()}
                        
                    </div>
                    {/* {createTable()} */}

                </div>
            </div>
            {(state.redirect)?<Redirect to={state.redirectTo !== undefined ? state.redirectTo:""} />
                :null}
        </div>
    );
};