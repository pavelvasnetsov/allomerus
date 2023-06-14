//@ts-ignore
import {createStore} from 'vuex'
import {authorizationStore} from '@/pages/authorization';
import {meStore} from '@/pages/me';
import {registrationStore} from '@/pages/registration';
import {sketchesStore} from '@/pages/sketches';
import {addSketchStore} from "@/pages/add-sketch";
import {ICreateStoreOptions} from 'src/global/types';
import {mainStore} from './main';
import {sketchStore} from "@/pages/sketch";
import {mySketchesStore} from "@/pages/my-sketches";

const storeOptions: ICreateStoreOptions = {
    modules: {
        ...authorizationStore,
        ...meStore,
        ...registrationStore,
        ...sketchesStore,
        ...addSketchStore,
        ...sketchStore,
        ...mySketchesStore,
        ...mainStore
    }
}

//@ts-ignore
const store = createStore(storeOptions);

export default store;