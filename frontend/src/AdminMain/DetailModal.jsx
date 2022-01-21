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

    const handleClose = () => {
        setState({modalShow:!state.modalShow});
    }
    

    const handleData = () => {
        const url ='https://127.0.0.1:8000/admin/post';
        const jsonData = {token:token,post_id:state.stateId};
        const method ='POST';
        //TODO to jest do naprawy
        handleFetch(url,jsonData,method)
            .then(data => data.json())
            .then(data => {if(data){
                    console.log(data)
                    setJsonState({post_id:data.post_id,title:data.title ,
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

                        <ul class="list-group list-group-flush">
                            {jsonState.comments.map(element => {
                                return (<li class="list-group-item">{element.text}</li>)
                            })}
                            
                        </ul>
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

