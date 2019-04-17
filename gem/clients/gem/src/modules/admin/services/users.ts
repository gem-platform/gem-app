import { User } from "@/modules/types";
import CrudService from "./crud";

/** Users service */
export default class UsersService extends CrudService<User> {
  constructor() {
    super("/users");
  }
}
