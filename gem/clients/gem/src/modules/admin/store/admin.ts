import store from "@/store";
import {
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { Snackbar } from "../types";

/** Admin store module */
@Module({ namespaced: true, dynamic: true, name: "admin", store })
export default class AdminStoreModule extends VuexModule {
  public isSnackbarVisible: boolean = false;
  public snackbar: Snackbar = { message: "", color: "" };

  /**
   * Open snackbar
   * @param snackbar Message.
   */
  @Mutation public openSnackbar(snackbar: Snackbar) {
    this.isSnackbarVisible = true;
    this.snackbar = snackbar;
  }

  /** Close snackbar. */
  @Mutation public closeSnackbar() {
    this.isSnackbarVisible = false;
  }
}

export const AdminStore = getModule(AdminStoreModule);
