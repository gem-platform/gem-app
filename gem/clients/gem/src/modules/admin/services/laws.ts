import { ILaw } from "@/modules/types";
import Axios from "axios";
import CrudService from "./crud";

/** Laws service */
export default class LawsService extends CrudService<ILaw> {
  constructor() {
    super("/laws");
  }

  /**
   * Lock specified law.
   * @param law Law to lock.
   */
  public async lock(law: ILaw) {
    const url = `${this.url}/${law.oid}/lock`;
    const res = await Axios.post(url, {});
    return res.data;
  }
}
