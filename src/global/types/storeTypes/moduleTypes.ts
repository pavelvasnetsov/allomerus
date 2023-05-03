export interface IStoreModule {
    namespaced: boolean;
    state: () => any;
    getters: Object;
    mutations: Object;
    actions: Object;
}

export interface ICreateStoreOptions {
    modules: IModules
}

interface IModules {
    [key: string]: IStoreModule;
}