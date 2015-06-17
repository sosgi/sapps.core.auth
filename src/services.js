import {
    USER_LOAD, USER_UNLOAD
} from 'sapps.core.api';
import {createUser} from './domain';

export class UserService{
    constructor(repository) {
        this._repository = repository;
        this._user = null;
    }
    getUser(){
        return new Promise((resolve, reject) => {
            if(this._user !== null){
              resolve(this._user);
            }else{
              this._repository.getUser()
                  .then((data) => {
                    this._user = createUser(data);
                    resolve(this._user);
                  });
            }
        });
    }

    udate(data){

    }
}

export class AuthService{
    constructor(repository) {
        this._repository = repository;
        this._user = null;
    }
    login(login, password) {
        return new Promise((resolve, reject) => {
            this._repository.login(login, password)
                .then(function(data) {
                this._user = createUser(data);
                if (!this._user.isAnonymous()) {
                    this._dispacher.auth(LOGIN, this._user);
                }
              }, reject);
        })
    }
    logout(){
        var self = this;
        return new Promise((resolve, reject) => {
            this._repository.logout().then(() => {
                var user = self._user;
                self._user = createUser();
                self._dispacher.auth(LOGOUT, user);
            }, reject);
        });
    }
}
