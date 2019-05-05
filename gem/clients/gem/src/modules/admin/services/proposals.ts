import { IProposal } from "@/modules/types";
import Axios from "axios";
import CrudService from "./crud";

/** Proposals service */
export default class ProposalsService extends CrudService<IProposal> {
  constructor() {
    super("/proposals");
  }

  /**
   * Lock specified proposal.
   * @param proposal Proposal to lock.
   */
  public async lock(proposal: IProposal) {
    const url = `${this.url}/${proposal.oid}/lock`;
    const res = await Axios.post(url, {});
    return res.data;
  }
}
