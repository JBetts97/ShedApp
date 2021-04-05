import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

export const authenticationService = {
    login,
    
};

function login(username, password) {

    // Remove anything currently in localstorage with the following keys
    localStorage.removeItem('error');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('name');
    localStorage.removeItem('token');

    // perform axios post request to auth server
    return axios
    .post(
      "http://localhost:8081/login",
      {
          "username": username,
          "password": password
      },
    )
        .then(user => {  
            if (user.data.message != null) {
                localStorage.setItem('error', JSON.stringify(user.data.message));
            } else {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.data.username));
            localStorage.setItem('name', JSON.stringify(user.data.firstname));
            localStorage.setItem('token', JSON.stringify(user.data.token));
            }
            // reload page to set items
            window.location.reload();
            return user;           
         });
}