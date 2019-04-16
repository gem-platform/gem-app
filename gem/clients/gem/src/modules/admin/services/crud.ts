import Axios from "axios";
import { Entity } from "@/modules/types";

/**
 * Admin CRUD service.
 */
export default class CrudService<T extends Entity> {
  /** URL prefix to send request to. */
  private url: string;

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
    return (await Axios.put(this.url + "/", entity)).data;
  }

  /**
   * Fetches list of entities.
   * @returns List of entities.
   */
  public async fetch(): Promise<T[]> {
    return (await Axios.get(this.url)).data;
  }
}
