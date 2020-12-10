import React from "react";
import "./Header.css";
import { Route, Link} from "react-router-dom";


export default function Header() {
  return (
    <div className='container'>
      <div>
        <Link to='/' className='link'>
            <h1>Boater Beta</h1>
        </Link>
      </div>
      <div className='p-container'>
        <Link to="/signin" className='link'>
            <p>Sign In</p>
        </Link>
        <Link to="/register" className='link'>
            <p>Create Account</p>
        </Link>
      </div>
    </div>
  );
}
