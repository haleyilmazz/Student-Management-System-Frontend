import React, { useState , useEffect} from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from "axios";
const Student = () => {
    const [Students,setStudents] = useState([]);
    const [RowData, SetRowData] = useState([]);
    
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }
    
    
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }
    
    const [id,setId] = useState("");
    const [name, setname] = useState("")
    const [surname, setsurname] = useState("")
    const [midterm, setmidterm] = useState("")
    const [final, setfinal] = useState("")
 
 
    
    
    const getAllStudent = () => {
        axios.get("http://localhost:3000/students")
        .then(response =>{
            console.log(response.data);
            setStudents(response.data.stundents);
        })
    }

    const handleSubmite = () => {
        const newStudent = { name, surname, midterm, final }
        axios.post('http://localhost:3000/student', newStudent)
            .then(response => {
                const result = response.data;
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleEdit = () =>{
        const updateUser = { name, surname, midterm, final }
        axios.put(`http://localhost:3000/student/${id}`, updateUser)
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) =>{
        console.log(id);
        axios.delete(`http://localhost:3000/student/${id}`)
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllStudent();
    }, [])
    
    return (
        <div>
            <div className="row">
                <div className="mt-5 mb-4">
                <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Ekle
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive">
                     <table className="table table-striped table-hover table-bordered" >
                        <thead>
                            <tr>
                                <th>İSİM</th>
                                <th>Soyisim</th>
                                <th>Vize</th>
                                <th>Final</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Students.map((item)=>
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.midterm}</td>
                                <td>{item.final}</td>
                                <td style={{ minWidth: 190 }}>
                                    <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id))}}>Düzenle</Button>|
                                    <Button size='sm' variant='danger' onClick={() => handleDelete(item._id)}>Sil</Button>|
                                </td>
                            </tr>
                            )}
                        </tbody>
                     </table>
                </div>
            </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Öğrenci Ekle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="İsim" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setsurname(e.target.value)} placeholder="Soyisim" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setmidterm(e.target.value)} placeholder="Vize" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setfinal(e.target.value)} placeholder="Final" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Öğrenci Ekle</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Çık</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Öğrenci Düzenle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>İsim</label>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="İsim" defaultValue={RowData.name}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Soyisim</label>
                                <input type="text" className='form-control' onChange={(e) => setsurname(e.target.value)} placeholder="Soyisim" defaultValue={RowData.surname} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Vize</label>
                                <input type="text" className='form-control' onChange={(e) => setmidterm(e.target.value)} placeholder="Vize" defaultValue={RowData.midterm}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Final</label>
                                <input type="text" className='form-control' onChange={(e) => setfinal(e.target.value)} placeholder="Final" defaultValue={RowData.final}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Öğrenci Düzenle</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Çık</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Student;