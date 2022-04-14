interface Question {
    id: string;
    type: string;
    question: string;
}


export interface Survey {
    id: string;
    status: string;
    title: string;
    restricted: boolean;
    expires: boolean;
    created: Date;
    questions?: Question[];
};


// when the dashboard component mounts
export const INIT = 'INIT';
export type InitAction = {type: typeof INIT};
export const init = (): InitAction => ({type: INIT});


export const LOADED = 'LOADED';
export type LoadedAction = {type: typeof LOADED, surveys?: Survey[]}
export const loaded = (surveys?: Survey[]): LoadedAction => ({type: LOADED, surveys});


export const LOAD_ERROR = 'LOAD_ERROR';
export type LoadErrorAction = {type: typeof LOAD_ERROR, error: Error};
export const loadError = (error: Error): LoadErrorAction => ({type: LOAD_ERROR, error});


export type DashboardAction = InitAction | LoadedAction | LoadErrorAction;
