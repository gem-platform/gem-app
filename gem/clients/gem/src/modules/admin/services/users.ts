import { User } from "@/modules/types";
import AdminCrudService from "./crud";

/** Users service */
export default class AdminUsersService extends AdminCrudService<User> {
  constructor() {
    super("/users");
  }
}
