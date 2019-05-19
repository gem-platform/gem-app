import { IRole } from "@/modules/types";
import CrudService from "./crud";

/** Users service */
export default class UsersService extends CrudService<IRole> {
  constructor() {
    super("/roles");
  }
}
