import Axios from "axios";
import { Entity } from "@/modules/types";

/**
 * Admin CRUD service.
 */
export default class AdminCrudService<T extends Entity> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async create(entity: T): Promise<T> {
    return (await Axios.post(this.url + "/", entity)).data;
  }

  public async update(entity: T): Promise<T> {
    return (await Axios.put(this.url + "/", entity)).data;
  }

  public async fetch(): Promise<T[]> {
    return (await Axios.get(this.url)).data;
  }
}
