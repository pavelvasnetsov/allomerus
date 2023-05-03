export interface IStoreModule {
    namespaced: boolean;
    state: () => any;
    getters: Object;
    mutations: Object;
    actions: Object;
}