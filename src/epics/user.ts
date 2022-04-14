import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, map, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { userLoaded, loadError } from '../actions/user';
import { INIT } from '../actions/app';
import { LOGIN_USER, LOGOUT_USER, CREATE_USER } from '../actions/user';
import type { Observable } from 'rxjs';
import type { StateObservable } from 'redux-observable';
import type { RootState } from '../store';
import type { InitAction } from '../actions/app';
import type { LoginUserAction, LogoutUserAction, CreateUserAction, User } from '../actions/user';


const loadUserEpic = (action$: Observable<InitAction>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(INIT),
    switchMap(() => {
        // check for the credentials
        const credentialsObject = localStorage.getItem('credentials');
        if (credentialsObject === null) {
            return of(userLoaded());
        }
        const { auth_token, user_id } = JSON.parse(credentialsObject);

        return fromFetch(
            `http://localhost:9001/user/${user_id}`,
            {
                selector: res => res.json(),
                headers: {'auth-token': auth_token}
            }
        ).pipe(
            map(({ user }) => userLoaded(user)),
            catchError(err => of(loadError(err)))
        );
    })
);


const loginUserEpic = (action$: Observable<LoginUserAction | any>) => action$.pipe(
    ofType(LOGIN_USER),
    switchMap(({ email, password }) => { console.log({ email, password }); return fromFetch(
        'http://localhost:9001/session',
        {
            headers: {'Content-Type': 'application/json'},
            selector: res => res.json(),
            body: JSON.stringify({ email, password }),
            method: 'POST'
        }
    ).pipe(
        map(({ auth_token, refresh_token, user }: { auth_token: string, refresh_token: string, user: User }) => {
            // store the credentials
            localStorage.setItem('credentials', JSON.stringify({auth_token, refresh_token, user_id: user.id}));
            // return user
            return userLoaded(user);
        }),
        catchError(({ err }) => {
            console.log('err: ', err);
            return of(loadError(err))
        })
    )})
);


const createUserEpic = (action$: Observable<CreateUserAction | any>) => action$.pipe(
    ofType(CREATE_USER),
    switchMap(({signupForm: { email, password, first, last, city, country, sex }}) => fromFetch(
        'http://localhost:9001/user',
        {
            headers: {'Content-Type': 'application/json'},
            selector: res => res.json(),
            body: JSON.stringify({email, password, first, last, city, country, sex}),
            method: 'POST'
        }
    ).pipe(
        map(({ auth_token, refresh_token, user }: { auth_token: string, refresh_token: string, user: User }) => {
            // store the credentials
            localStorage.setItem('credentials', JSON.stringify({auth_token, refresh_token, user_id: user.id}));
            // return user
            return userLoaded(user);
        }),
        catchError(err => of(loadError(err)))
    ))
);


const logoutUserEpic = (action$: Observable<LogoutUserAction | any>) => action$.pipe(
    ofType(LOGOUT_USER),
    switchMap(() => {
        const credentialsObject = localStorage.getItem('credentials');
        if (credentialsObject === null) {
            return of(userLoaded());
        }

        const { user_id, auth_token } = JSON.parse(credentialsObject);

        return fromFetch(
            `http://localhost:9001/session/user/${user_id}/delete`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth_token
                },
                selector: res => res.json(),
                method: 'GET'
            }
        ).pipe(
            map(() => {
                localStorage.removeItem('credentials');
                return userLoaded()
            }),
            catchError(map(({ err }) => {
                console.log('err: ', err);
                return of(loadError(err))
            }))
        )
    })
);


export default combineEpics(loadUserEpic as any, loginUserEpic, createUserEpic, logoutUserEpic as any);
