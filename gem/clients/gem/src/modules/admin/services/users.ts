import { IUser } from "@/modules/types";
import CrudService from "./crud";

/** Users service */
export default class UsersService extends CrudService<IUser> {
  constructor() {
    super("/users");
  }
}
