import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';


export default function Blogs({ blogs = [], setBlogs }) {

    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const handleUpdate = async (id, value) => {
        return axios.put(`/put/${id}/`, value)
        .then((reponse) => {
            const { data } = reponse;
            const newBlogs = blogs.map (blog => {
                if (blog.id === id) {
                    return data;
                }
                return blog;
            })
            setBlogs(newBlogs)
        }).catch(() => {
            alert('Algo fue mal!')
        })
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, {body: record.body});
        handleClose();
    }

    const handleChange = (e) => {
        setRecord({
            ...record,
            body: e.target.value
        })
    }

    const handleDelete = (id) => {
        axios.delete(`/delete/${id}`)
        .then(() => {
            const newBlogs = blogs.filter(blog => {
                return blog.id !== id
            });
            setBlogs(newBlogs)
        }).catch(() => {
            alert('Algo fue mal!')
        })
    }



    return (
        <div>
        <ListGroup>
            {blogs.map( blog => {
                return (
            <ListGroupItem key={blog.id} className='d-flex justify-content-between align-items-center'>

                {blog.body}
                <div>
                <FaEdit
                onClick={() => {setRecord(blog); setShow(true)}}
                size={20} style={{cursor: 'pointer'}}/>
                    &nbsp;
                <FaTrashAlt
                onClick={() => { handleDelete (blog.id) }}
                size={20} style={{cursor: 'pointer'}}/>
                </div>

            </ListGroupItem>
            )
            })}
        </ListGroup>


        <Modal show={show} onHide={handleClose}>

            <ModalHeader closeButton>
                <Modal.Title>
                    EDIT BLOG
                </Modal.Title>
            </ModalHeader>

            <Modal.Body>
                <FormControl 
                value={record ? record.body : ''}
                onChange={handleChange}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant='dark' onClick={handleClose}>
                    CERRAR
                </Button>

                <Button variant='dark' onClick={handleSaveChanges}>
                    SAVE
                </Button>
            </Modal.Footer>

        </Modal>
        </div>
    )
}