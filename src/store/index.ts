//@ts-ignore
import { createStore } from 'vuex'
import { authorizationStore } from '../pages/authorization';
import { meStore } from '../pages/me';
import { registrationStore } from '../pages/registration';
import { sketchesStore } from '../pages/sketches';

const store = createStore({
    modules: {
        ...authorizationStore,
        ...meStore,
        ...registrationStore,
        ...sketchesStore
    }
});

export default store;