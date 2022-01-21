import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {handleFetch} from "../Components/handleFetch";
import {v4 as uuidv4} from 'uuid';


export const DetailModal = ({setState,state,token}) =>{
   

    const [jsonState,setJsonState]=useState(
        {
            post_id: 0,
            title: '',
            text: '',
            post_date:'',
            comments: []
        }
    );
    const [stateComment,setComState]=useState(
        {
            commentText: '',
            newCommentText: '',
            showchange:false
        }
    );
    const handleClose = () => {
        setState({modalShow:!state.modalShow});
    }
    
    const handleNewCommentTextChange =
    (event) => {
        setComState({newCommentText:event.target.value});
    };
    const handleCommentTextChange =
    (event) => {
        setComState({...stateComment,commentText:event.target.value});
    };
    const handleCommentDelete=(commentId)=>{
        if(commentId){
            const url ='https://127.0.0.1:8000/user/comment/delete';
            const jsonData = {token:token,comment_id:commentId};
            const method ='POST';
            //TODO to jest do naprawy
            handleFetch(url,jsonData,method)
                .then(data => {if(data){
                    handleClose(); 
                }})
                .catch(e=>{if(e){
                    if(parseInt(e.message)===401) {
                        setState({redirect: true, redirectTo: '/admin/login'});
                    }
                    console.log(e);
                    setState({...state,errors:parseInt(e.message)})
                    handleClose();
                }});
        }
    }
    const handleCommentChange=(commentId)=>{
        if(stateComment.commentText&&commentId){
            const url ='https://127.0.0.1:8000/user/comment/edit';
            const jsonData = {token:token,text:stateComment.commentText,comment_id:commentId};
            const method ='POST';
            //TODO to jest do naprawy
            handleFetch(url,jsonData,method)
                .then(data => {if(data){
                    handleClose(); 
                }})
                .catch(e=>{if(e){
                    if(parseInt(e.message)===401) {
                        setState({redirect: true, redirectTo: '/admin/login'});
                    }
                    console.log(e);
                    setState({...state,errors:parseInt(e.message)})
                    handleClose();
                }});
        }
    }
    const handleCommentAdd=()=>{
        console.log(token)
        console.log(jsonState.post_id)
        console.log(stateComment.newCommentText)
        if(stateComment.newCommentText&&jsonState.post_id){
            const url ='https://127.0.0.1:8000/user/comment/add';
            const jsonData = {token:token,post_id:jsonState.post_id,text:stateComment.newCommentText};
            const method ='POST';
            //TODO to jest do naprawy
            handleFetch(url,jsonData,method)
                .then(data => {if(data){
                    handleClose(); 
                }})
                .catch(e=>{if(e){
                    if(parseInt(e.message)===401) {
                        setState({redirect: true, redirectTo: '/admin/login'});
                    }
                    console.log(e);
                    setState({...state,errors:parseInt(e.message)})
                    handleClose();
                }});
        }
    }
    const handleData = () => {
        const url ='https://127.0.0.1:8000/user/comment/all';
        const jsonData = {token:token,post_id:state.stateId};
        const method ='POST';
        //TODO to jest do naprawy
        handleFetch(url,jsonData,method)
            .then(data => data.json())
            .then(data => {if(data){
                    console.log(data)
                    setJsonState({post_id:data.post_id,
                    title:data.title ,
                    text: data.text,
                    post_date:data.post_date,
                    comments: data.comments})   
                    
            }})
            .catch(e=>{if(e){
                if(parseInt(e.message)===401) {
                    setState({redirect: true, redirectTo: '/admin/login'});
                }
                console.log(e);
                setState({...state,errors:parseInt(e.message)})
                handleClose();
            }});
    }
    useEffect(()=>{
        handleData();
    },[])
    
    return (
        <>  
           
            <Modal
                show={state.modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title><h3><b>Post Detail</b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row" >
                    
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Data Updatu: {jsonState.post_date}</h5>
                            <h5 className="card-title">Tytuł : {jsonState.title}</h5>
                            <p className="card-text">Treść: {jsonState.text}</p>

                        </div>
                        <p className="card-text">Komentarze:</p>
                        {/* handleCommentDelete
                        handleCommentChange */}
                        {/* handleNewCommentTextChange */}
                        <ul class="list-group list-group-flush">
                        

                            {jsonState.comments.map(element => {
                                if(element.his){
                                    return (
                                        <li class="list-group-item" >
                                            <div className="row" >
                                                <div className="col-6" >
                                                    {element.text}
                                                </div>
                                                <div className="col-3" >
                                                
                                                    <Button variant="dark" size="sm" onClick={()=>{setComState({showchange:!stateComment.showchange})}}>
                                                        Edytuj
                                                    </Button>
                                                    
                                                </div>
                                                <div className="col-3" >
                                                    <Button variant="danger" size="sm" onClick={()=>handleCommentDelete(element.comment_id)}>
                                                        Usuń
                                                    </Button>
                                                </div>
                                                
                                            </div>
                                            <div className={stateComment.showchange?"mt-2":"d-none mt-2"}>
                                                    <div className="card card-body">
                                                        <div className="row" >
                                                        <p>Podaj nowy komentarz</p>
                                                            <div className="col" >
                                                            <input
                                                                id="name"
                                                                type="text"
                                                                name="name"
                                                                value={stateComment.commentText}
                                                                className="form-control"
                                                                placeholder="Tekst"
                                                                onChange={handleCommentTextChange}
                                                            />
                                                            </div>
                                                            <div className="col" >
                                                                <Button variant="success" className="form-control" size="sm" onClick={()=>handleCommentChange(element.comment_id)}>
                                                                    Zmień
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </li>
                                        )
                                }
                                else{
                                    return (
                                        <li class="list-group-item" >{element.text}</li>
                                    ) 
                                }
                                
                            })}
                            
                        </ul>
                        <p className="card-text">Dodaj komentarz:</p>
                        
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={stateComment.newCommentText}
                            className="form-control mt-2"
                            placeholder="Tekst"
                            onChange={handleNewCommentTextChange}
                        />
                        <Button variant="dark" onClick={()=>handleCommentAdd()}>
                            Dodaj komentarz
                        </Button>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
//----------------------------------------------------------------------------------------------------------------------

