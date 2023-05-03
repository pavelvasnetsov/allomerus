import { IStoreModule } from "./moduleTypes";

export interface ICreateStoreOptions {
    modules: IModules
}

interface IModules {
    [key: string]: IStoreModule;
}