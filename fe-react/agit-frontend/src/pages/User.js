import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../static/css/user.css"

function User(props) {

    let { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);

    let navigate = useNavigate()
    const backPage = () => {
        let newPath = `/`
        navigate(newPath)
    }

    const deleteRecord = (delete_api_link) => {
        fetch(delete_api_link, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let newPath = `/`
        navigate(newPath)

    }

    let get_api_link = "http://localhost:8000/api/customers/" + id
    let delete_api_link = "http://localhost:8000/api/customers/delete/" + id

    useEffect(() => {
        fetch(get_api_link)
            .then(res => res.json())
            .then(
                (data) => {
                setIsLoaded(true);
                setUser(data[0]);
            },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    else {

        return (
            <div class="container">
                <div class="page-title">
                    <center>CUSTOMER DETAILS</center>
                </div>

                <div class="table-container">
                    <table class="user-table">
                        <tr>
                            <td class="left">
                                <div class="label">Full Name</div>
                                <div class="label-value">{user.name}</div>
                            </td>
                            <td class="right">
                                <div class="label">ID</div>
                                <div class="label-value">{user.id}</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="left">
                                <div class="label">Address</div>
                                <div class="label-value">{user.address}</div>
                            </td>
                            <td class="right">
                                <div>
                                    <button id="btn-back" onClick={backPage}>RETURN TO CUSTOMER LIST</button>
                                </div>
                                <div>
                                    <button id="btn-delete" onClick={() => deleteRecord(delete_api_link)}>DELETE CUSTOMER</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                

            </div>
        )
    }
}

export default User;