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
import { EmptyProposal, IProposal } from "../../types";
import ProposalsService from "../services/proposals";

const service = new ProposalsService();

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "admin-proposals", store })
export default class ProposalsStoreModule extends VuexModule {
  public proposals: IProposal[] = [];

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
   * @param proposal Proposal to edit in dialog (default EmptyProposal).
   */
  @Mutation public openEditDialog(proposal: IProposal = EmptyProposal): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.operations.save.startConfirmation({ ...proposal });
  }

  /** Close edit dialog. */
  @Mutation public closeEditDialog(): void {
    this.operations.save.clear();
  }

  /**
   * Open proposal delete confirmation dialog.
   * @param proposal Proposal to delete.
   */
  @Mutation public openConfirmDeleteDialog(proposal: IProposal): void {
    this.operations.delete.startConfirmation(proposal);
  }

  /** Close proposal delete confirmation dialog. */
  @Mutation public closeConfirmDeleteDialog(): void {
    this.operations.delete.cancel();
  }

  /** Data */

  /** Fetch */

  /** Fetches list of proposals from remote server. */
  @Action public async fetch(): Promise<IProposal[] | undefined> {
    try {
      this.fetcProposalsStarted();
      const proposals = await service.fetch();
      this.fetchProposalsSucceeded(proposals);
      return proposals;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.fetchProposalsFailed(message);
    }
  }

  /** Proposals has been fetched successfully. */
  @Mutation private fetcProposalsStarted() {
    this.operations.fetch.start();
  }

  /** Proposals has been fetched successfully. */
  @Mutation private fetchProposalsSucceeded(proposals: IProposal[]) {
    this.proposals = proposals;
    this.operations.fetch.succeed();
  }

  /** Fetch failed */
  @Mutation private fetchProposalsFailed(error: string) {
    this.operations.fetch.fail(error);
  }

  /** Save */

  /**
   * Save user.
   * @param proposal Proposal to save.
   * @return User.
   */
  @Action public async save(
    proposal: IProposal
  ): Promise<IProposal | undefined> {
    try {
      this.saveProposalStarted();
      if (proposal.oid && proposal.oid !== -1) {
        const result = await service.update(proposal);
        this.proposalUpdated(result);
      } else {
        const result = await service.create(proposal);
        this.proposalCreated(result);
      }
      return proposal;
    } catch (err) {
      const message =
        (err.response.data.detail instanceof Array
          ? err.response.data.detail[0].msg
          : err.message) || "Can't save proposal";
      log({ message });
      this.saveProposalFailed(message);
    }
  }

  @Mutation private saveProposalStarted() {
    this.operations.save.start();
  }

  @Mutation private saveProposalFailed(error: string) {
    this.operations.save.fail(error);
  }

  /** User has been successfully created. */
  @Mutation private proposalCreated(proposal: IProposal) {
    this.proposals.push(proposal);
    this.operations.save.succeed("Proposal created");
  }

  /** User has been successfully updated. */
  @Mutation private proposalUpdated(proposal: IProposal) {
    const original = this.proposals.find(x => x.oid === proposal.oid);
    Object.assign(original, proposal);
    this.operations.save.succeed("Proposal updated");
  }

  /** Delete */

  /**
   * Delete user.
   * @param proposal Proposal to delete.
   */
  @Action public async delete(
    proposal: IProposal
  ): Promise<IProposal | undefined> {
    try {
      this.deleteProposalStarted();
      const result = await service.delete(proposal);
      this.proposalDeleted(result);
      return result;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.deleteProposalFailed(message);
    }
  }

  @Mutation private deleteProposalStarted() {
    this.operations.delete.start();
  }

  /** User has been successfully deleted. */
  @Mutation private proposalDeleted(proposal: IProposal) {
    this.proposals = this.proposals.filter(x => x.oid !== proposal.oid);
    this.operations.delete.succeed("Proposal deleted");
  }

  /** User has been successfully deleted. */
  @Mutation private deleteProposalFailed(message: string = "") {
    this.operations.delete.fail(message);
  }

  /**
   * Lock pecified proposal for modification.
   * @param proposal Proposal.
   */
  @Action public async lock(proposal: IProposal) {
    try {
      this.lockStarted();
      const res = await service.lock(proposal);
      this.lockSucceeded(proposal);
      return res;
    } catch (err) {
      const message =
        (err.response.data.detail instanceof Array
          ? err.response.data.detail[0].msg
          : err.message) || "Can't lock proposal";
      log({ message });
      this.lockFailed(message);
    }
  }

  @Mutation private lockStarted() {
    this.operations.lock.start();
  }

  @Mutation private lockSucceeded(proposal: IProposal) {
    proposal.locked = true;
    this.operations.lock.succeed();
  }

  @Mutation private lockFailed(message: string = "") {
    this.operations.lock.fail(message);
  }

  /** Getters */

  get all(): IProposal[] {
    return this.proposals;
  }
}

export const ProposalsStore = getModule(ProposalsStoreModule);
