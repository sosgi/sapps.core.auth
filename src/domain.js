
export class User{
    constructor(id, params){

        Object.defineProperties(this, {
            id:{
                get:function(){
                    return id;
                },
                enumerable: true
            },
            name:{
                value:params.name,
                enumerable: true,
            },
            login:{
                value:params.login,
                enumerable: true,
            }
        });
        this._params = params;
    }

    serialize(){
        var params = Object.assign({}, this._params);
        params.id = this.id;
        return params;
    }
    isAnonymous() {
        return false;
    }
}

export class AnonymousUser extends User{
    constructor(){
        super(0, {name:'Anonymous', login:''});
    }
    isAnonymous() {
        return true;
    }
    getName(){
        return 'Anonymous';
    }
}

export function createUser(params) {
    params = params || {};
    return params.id ? new User(params.id, params) : new AnonymousUser();
}
