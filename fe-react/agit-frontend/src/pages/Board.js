import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../static/css/board.css"

function BoardMembers(props) {

    // const [isLoaded, setIsLoaded] = useState(false);
    // const [users, setUsers] = useState([]);

    let users = props.users

    let navigate = useNavigate()
    const changePage = (id) => {
        let newPath = `/user/${id}`
        navigate(newPath)
    }


    let api_link = "http://localhost:8000/api/customers"

    // useEffect(() => {
    //     fetch(api_link)
    //         .then(res => res.json())
    //         .then(
    //             (data) => {
    //             setIsLoaded(true);
    //             setUsers(data);
    //         },
    //             (error) => {
    //                 console.log(error)
    //             }
    //         )
    // })
        
    
        return (
            <div>
            {users.map(user => (
                <div class="list-member">
                <table class="content-table">
                    <tr>
                        <td class="customer">
                            <div class="name">
                                {user.name} 
                            </div>
                            <div class="address">
                                {user.address}
                            </div>
                        </td>
                        <td class="id">{user.id}</td>
                        <td class="action">
                            <button class="user-btn" id={user.id} onClick={() => changePage(user.id)}>View</button>
                        </td>
                    </tr>
                </table>
            </div>
            ))}
            </div>
        )

}

function Pagination(props) {

    const num_pages = props.total_page
    const [currPage, setCurrPage] = useState(1)


    return (
        <div>
            {
                num_pages.map(pgNum => {
                    <h1>Hello</h1>
                })
            }
        </div>
    )
           
}

function Board() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [numPages, setNumPages] = useState(1);

    let { id } = useParams();
    if (id == undefined) {
        id = 1
    }

    let api_link = "http://localhost:8000/api/customers"

    useEffect(() => {
        fetch(api_link)
            .then(res => res.json())
            .then(
                (data) => {
                setIsLoaded(true);
                setUsers(data);
                setNumPages(Math.ceil(users.length/10))
            },
                (error) => {
                    console.log(error)
                }
            )
    })

    var paginationItems = []
    for (var i = 1; i <= numPages; i++) {
        if (id == i) {
            paginationItems.push(
                <a href={"/"+i} class="active">{i}</a>
            )
        }
        else {
            paginationItems.push(
                <a href={"/"+i}>{i}</a>
            )
        }
    }


    return (
        <div class="list-container">
        <div class="page-title">
            <center>LIST CUSTOMERS</center>
        </div>

        <div class="divider"></div>
        <div class="list-header">
            <table class="content-table">
                <tr>
                    <td class="customer">Customer</td>
                    <td class="id">ID</td>
                    <td class="action">Action</td>
                </tr>
            </table>
        </div>

        <div class="cust-list">
            <BoardMembers users={users.slice(10*(id-1), 10*(id-1)+10)}/>
        </div>

        <div class="pagination">
            {
                paginationItems
            }
        </div>

        </div>
    )
};

export default Board;