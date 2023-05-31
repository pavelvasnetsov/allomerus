//@ts-ignore
import {createStore} from 'vuex'
import {authorizationStore} from '@/pages/authorization';
import {meStore} from '@/pages/me';
import {registrationStore} from '@/pages/registration';
import {sketchesStore} from '@/pages/sketches';
import {ICreateStoreOptions} from 'src/global/types';
import {mainStore} from './main';

const storeOptions: ICreateStoreOptions = {
    modules: {
        ...authorizationStore,
        ...meStore,
        ...registrationStore,
        ...sketchesStore,
        ...mainStore
    }
}

//@ts-ignore
const store = createStore(storeOptions);

export default store;