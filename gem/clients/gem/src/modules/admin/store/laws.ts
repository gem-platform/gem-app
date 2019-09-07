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
import { EmptyLaw, ILaw } from "../../types";
import LawsService from "../services/laws";

const service = new LawsService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-laws", store })
export default class LawsStoreModule extends VuexModule {
  public laws: ILaw[] = [];

  /** List of async operations. */
  public operations = {
    delete: new Operation(),
    fetch: new Operation(),
    lock: new Operation(),
    save: new Operation()
  };

  /** UI */

  /**
   * Open edit dialog.
   * @param law Law to edit in dialog (default EmptyLaw).
   */
  @Mutation
  public openEditDialog(law: ILaw = EmptyLaw): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.operations.save.startConfirmation({ ...law });
  }

  /** Close edit dialog. */
  @Mutation
  public closeEditDialog(): void {
    this.operations.save.clear();
  }

  /**
   * Open law delete confirmation dialog.
   * @param law Law to delete.
   */
  @Mutation
  public openConfirmDeleteDialog(law: ILaw): void {
    this.operations.delete.startConfirmation(law);
  }

  /** Close law delete confirmation dialog. */
  @Mutation
  public closeConfirmDeleteDialog(): void {
    this.operations.delete.cancel();
  }

  /** Data */

  /** Fetch */

  /** Fetches list of laws from remote server. */
  @Action
  public async fetch(): Promise<ILaw[] | undefined> {
    try {
      this.fetchLawsStarted();
      const laws = await service.fetch();
      this.fetchLawsSucceeded(laws);
      return laws;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.fetchLawsFailed(message);
    }
  }

  /** Laws has been fetched successfully. */
  @Mutation
  private fetchLawsStarted() {
    this.operations.fetch.start();
  }

  /** Laws has been fetched successfully. */
  @Mutation
  private fetchLawsSucceeded(laws: ILaw[]) {
    this.laws = laws;
    this.operations.fetch.succeed();
  }

  /** Fetch failed */
  @Mutation
  private fetchLawsFailed(error: string) {
    this.operations.fetch.fail(error);
  }

  /** Save */

  /**
   * Save user.
   * @param law Law to save.
   * @return User.
   */
  @Action
  public async save(law: ILaw): Promise<ILaw | undefined> {
    try {
      this.saveLawStarted();
      if (law.oid && law.oid !== -1) {
        const result = await service.update(law);
        this.lawUpdated(result);
      } else {
        const result = await service.create(law);
        this.lawCreated(result);
      }
      return law;
    } catch (err) {
      const message =
        (err.response.data.detail instanceof Array
          ? err.response.data.detail[0].msg
          : err.message) || "Can't save law";
      log({ message });
      this.saveLawFailed(message);
    }
  }

  @Mutation
  private saveLawStarted() {
    this.operations.save.start();
  }

  @Mutation
  private saveLawFailed(error: string) {
    this.operations.save.fail(error);
  }

  /** User has been successfully created. */
  @Mutation
  private lawCreated(law: ILaw) {
    this.laws.push(law);
    this.operations.save.succeed("Law created");
  }

  /** User has been successfully updated. */
  @Mutation
  private lawUpdated(law: ILaw) {
    const original = this.laws.find(x => x.oid === law.oid);
    Object.assign(original, law);
    this.operations.save.succeed("Law updated");
  }

  /** Delete */

  /**
   * Delete user.
   * @param law Law to delete.
   */
  @Action
  public async delete(law: ILaw): Promise<ILaw | undefined> {
    try {
      this.deleteLawStarted();
      const result = await service.delete(law);
      this.lawDeleted(result);
      return result;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.deleteLawFailed(message);
    }
  }

  @Mutation
  private deleteLawStarted() {
    this.operations.delete.start();
  }

  /** User has been successfully deleted. */
  @Mutation
  private lawDeleted(law: ILaw) {
    this.laws = this.laws.filter(x => x.oid !== law.oid);
    this.operations.delete.succeed("Law deleted");
  }

  /** User has been successfully deleted. */
  @Mutation
  private deleteLawFailed(message: string = "") {
    this.operations.delete.fail(message);
  }

  /**
   * Request laws that match search
   * @param match
   */
  @Action
  public async search(match: string): Promise<ILaw[] | undefined> {
    try {
      this.fetchLawsStarted();
      const laws = await service.search(match);
      this.fetchLawsSucceeded(laws);
      return laws;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.fetchLawsFailed(message);
    }
  }

  /** Getters */

  get all(): ILaw[] {
    return this.laws;
  }
}

export const LawsStore = getModule(LawsStoreModule);
