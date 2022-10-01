import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link 
  } from "react-router-dom"

import Board from './Board'
import User from './User'

function RoutePage() {
    return (
        <Router>
            <Routes>
                <Route exact path = "/" element = {<Board/>}/>
                <Route path = "/:id" element = {<Board/>}/>
                <Route path = "/user/:id" element = {<User/>}/>
            </Routes>
        </Router>
    )
}

export default RoutePage;