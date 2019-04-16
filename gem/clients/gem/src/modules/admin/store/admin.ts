import store from "@/store";
import {
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { SnackbarMessage } from "@/modules/types";

/** Admin storage */
@Module({ namespaced: true, dynamic: true, name: "admin", store })
export default class AdminModule extends VuexModule {
  isSnackbarVisible: boolean = false;
  snackbarMessage: string = "";
  snackbarColor: string = "";

  /**
   * Open snackbar
   * @param message Message.
   */
  @Mutation openSnackbar({ message, color }: SnackbarMessage) {
    this.isSnackbarVisible = true;
    this.snackbarMessage = message;
    this.snackbarColor = color;
  }

  /** Close snackbar. */
  @Mutation closeSnackbar() {
    this.isSnackbarVisible = false;
  }
}

export const Admin = getModule(AdminModule);
