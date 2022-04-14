import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, map, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { INIT, loadError, loaded } from '../actions/dashboard';
import { userLoaded } from '../actions/user';
import type { Observable } from 'rxjs';
import type { StateObservable } from 'redux-observable';
import type { RootState } from '../store';
import type { InitAction } from '../actions/dashboard';


// loads all of the users surveys
const loadSurveysEpic = (action$: Observable<InitAction>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(INIT),
    switchMap(() => {
        const credentialsObject = localStorage.getItem('credentials');
        if (credentialsObject === null) {
            return of(userLoaded());
        }
        const { auth_token, user_id } = JSON.parse(credentialsObject);

        return fromFetch(
            `http://localhost:9001/survey/user/${user_id}`,
            {
                selector: res => res.json(),
                headers: {'auth-token': auth_token}
            }
        ).pipe(
            map(({ surveys }) => loaded(surveys)),
            catchError(err => of(loadError(err)))
        );
    })
);


export default combineEpics(loadSurveysEpic as any);
