// called when app component mounted
export const INIT = 'INIT';
export type InitAction = {type: typeof INIT};
export const init = (): InitAction => ({type: INIT});

export type AppAction = InitAction;
