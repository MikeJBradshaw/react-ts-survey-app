export interface User {
    email: string;
    id: string;
    first: string;
    last: string;
    country: string;
    state: string;
    sex: string;
};



export interface SignupForm {
    email: string;
    password: string;
    first: string;
    last: string;
    country: string;
    state: string;
    sex: string;
}


// when a new user is created
export const CREATE_USER = 'CREATE_USER';
export type CreateUserAction = {type: typeof CREATE_USER, signupForm: SignupForm};
export const createUser = (signupForm: SignupForm): CreateUserAction => ({type: CREATE_USER, signupForm});


// when credentials not found, network error or user doesnt exist
export const LOAD_ERROR = 'LOAD_ERROR';
export type LoadErrorAction = {type: typeof LOAD_ERROR, error: Error};
export const loadError = (error: Error): LoadErrorAction => ({type: LOAD_ERROR, error});


// when a login button is clicked
export const LOGIN_USER = 'LOGIN_USER';
export type LoginUserAction = {type: typeof LOGIN_USER, email: string, password: string};
export const loginUser = (email: string, password: string): LoginUserAction => ({type: LOGIN_USER, email, password});


// when the logout button is clicked
export const LOGOUT_USER = 'LOGOUT_USER';
export type LogoutUserAction = {type: typeof LOGOUT_USER};
export const logoutUser = (): LogoutUserAction => ({type: LOGOUT_USER});


// when user is returned to epic
export const USER_LOADED = 'USER_LOADED';
export type UserLoadedAction = {type: typeof USER_LOADED, user?: User};
export const userLoaded = (user?: User): UserLoadedAction => ({type: USER_LOADED, user});


export type UserAction = CreateUserAction | LoadErrorAction | LoginUserAction | LogoutUserAction | UserLoadedAction;
