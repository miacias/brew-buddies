import React from "react";
import { Button } from 'antd' 
import Auth from '../utils/auth'

export default function LogoutButton() {
    if (Auth.loggedIn()) {
        return (
            <Button>
                <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
            </Button>
        )
    }
}