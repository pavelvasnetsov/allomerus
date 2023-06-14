import {checkingAuthorization} from './checkingAuthorization';
import {snackbar} from "@/store/main/snackbar";
import {loader} from "@/store/main/loader";

export const mainStore = {
    checkingAuthorization,
    snackbar,
    loader
};