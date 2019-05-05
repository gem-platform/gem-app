import { IEntity } from "@/modules/types";
import Axios from "axios";

/**
 * Admin CRUD service.
 */
export default class CrudService<T extends IEntity> {
  /** URL prefix to send request to. */
  protected url: string;

  /**
   * Creates new instance of the CrudService.
   * @param url URL prefix.
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * Creates new entity.
   * @param entity Entity to create.
   * @returns Created entity.
   */
  public async create(entity: T): Promise<T> {
    return (await Axios.post(this.url + "/", entity)).data;
  }

  /**
   * Updates entity.
   * @param entity Entity to update.
   * @returns Updated entity.
   */
  public async update(entity: T): Promise<T> {
    return (await Axios.put(this.url + "/" + entity.oid, entity)).data;
  }

  /**
   * Fetches list of entities.
   * @returns List of entities.
   */
  public async fetch(): Promise<T[]> {
    return (await Axios.get(this.url)).data;
  }

  /**
   * Remove entity.
   * @param entity Entity to remove.
   * @returns Removed entity.
   */
  public async delete(entity: T): Promise<T> {
    return (await Axios.delete(this.url + "/" + entity.oid)).data;
  }
}
