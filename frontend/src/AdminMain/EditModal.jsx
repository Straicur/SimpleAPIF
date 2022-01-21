import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {handleFetch} from "../Components/handleFetch";



export const EditModal = ({setState,state,token}) =>{
    const [stateModal,setStateModal] = useState({
        name:"",
        sure:false
    })
    const [stateTitle,setSateTitle] = useState("")
    const [stateText,setSateText] = useState("")
    const [stateButton,setStateButton] = useState(false)
    const handleSetTitleChange =
        (event) => {
            setSateTitle(event.target.value);
        };
    const handleSetTextChange =
        (event) => {
            setSateText(event.target.value);
        };
    const handleClose = () => {
        setState({modalShow:!state.modalShow});
    }
    useEffect(() => {
        if (stateTitle.trim()&&stateText.trim()) {

            setStateButton(false);
        } else {
            setStateButton(true);
        }
    }, [stateTitle,stateText]);

    const editPost = () => {
        if(stateTitle&&stateText)
        {
            const url ='https://127.0.0.1:8000/admin/post/edit';
            const jsonData = {token:token,title:stateTitle,text:stateText,post_id:state.stateId};
            const method ='POST';
            //TODO to jest do naprawy
            handleFetch(url,jsonData,method)
                .then(data => {if(data){
                    setState({modalShow:state.modalShow});
                    setState({updated: false})
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
    const deletePost = () => {
    
        const url ='https://127.0.0.1:8000/admin/post/delete';
        const jsonData = {token:token,post_id:state.stateId};
        const method ='POST';
        //TODO to jest do naprawy
        handleFetch(url,jsonData,method)
            .then(data => {if(data){
                setState({modalShow:state.modalShow});
                setState({updated: false})
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
    
    return (
        <>
            <Modal
                show={state.modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title><h3><b>Edycja Posta </b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Button
                        variant="dark"
                        onClick={()=>{setStateModal({name:"edit"})}}>
                        Edytuj
                    </Button>
                    <Button
                        variant="dark"
                        onClick={()=>{setStateModal({name:"delete"})}}>
                        Usuń
                    </Button>
                    {
                        stateModal.name==="edit"?<div>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={stateTitle}
                            className="form-control mt-2"
                            placeholder="Tytuł"
                            onChange={handleSetTitleChange}
                        />
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={stateText}
                            className="form-control mt-2"
                            placeholder="Tekst"
                            onChange={handleSetTextChange}
                        />
                        <Button
                            disabled={stateButton}
                            variant="dark"
                            onClick={editPost}>
                            Dodaj Post
                        </Button>
                        </div>
                        :
                        stateModal.name==="delete"?<div>
                        <Button
                            variant="danger"
                            onClick={()=>{handleClose()}}>
                            Nie
                        </Button>
                        <Button
                            variant="success"
                            onClick={()=>{deletePost()}}>
                            Tak
                        </Button>
                        </div>:null
                        
                    }
                    
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

