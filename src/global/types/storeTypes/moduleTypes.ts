export interface IStoreModule {
    namespaced: boolean;
    state: () => any;
    getters: Object;
    mutations: Object;
    actions: Object;
}

export interface ContextParam<T> {
    commit: (mutationName: string, payload: any, options?: any) => void;
    dispatch: (actionName: string, payload: any, options?: any) => void;
    state: T
}