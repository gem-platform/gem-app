import { log } from "@/lib/logging";
import { Operation } from "@/lib/operations";
import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { IRole } from "../../types";
import RolesService from "../services/roles";

const service = new RolesService();

/** Roles storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-roles", store })
export default class RolesStoreModule extends VuexModule {
  public roles: IRole[] = [];

  /** List of async operations. */
  public operations = {
    fetch: new Operation()
  };

  /** Data */

  /** Fetch */

  /** Fetches list of roles from remote server. */
  @Action public async fetch(): Promise<IRole[]> {
    try {
      this.fetchRolesStarted();
      const roles = await service.fetch();
      this.fetchRolesSucceeded(roles);
      return roles;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.fetchRolesFailed(message);
      throw new Error(message);
    }
  }

  /** Roles has been fetched successfully. */
  @Mutation private fetchRolesStarted() {
    this.operations.fetch.start();
  }

  /** Roles has been fetched successfully. */
  @Mutation private fetchRolesSucceeded(roles: IRole[]) {
    this.roles = roles;
    this.operations.fetch.succeed();
  }

  /** Fetch failed */
  @Mutation private fetchRolesFailed(error: string) {
    this.operations.fetch.fail(error);
  }

  /** Getters */

  get all(): IRole[] {
    return this.roles;
  }
}

export const RolesStore = getModule(RolesStoreModule);
