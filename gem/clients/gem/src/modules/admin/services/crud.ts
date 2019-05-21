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
    const url = this.url + "/";
    const entityToSend = this.transformOut(entity);
    return (await Axios.post(url, entityToSend)).data;
  }

  /**
   * Updates entity.
   * @param entity Entity to update.
   * @returns Updated entity.
   */
  public async update(entity: T): Promise<T> {
    const url = this.url + "/" + entity.oid;
    const entityToSend = this.transformOut(entity);
    return (await Axios.put(url, entityToSend)).data;
  }

  /**
   * Fetches list of entities.
   * @returns List of entities.
   */
  public async fetch(): Promise<T[]> {
    const entities = (await Axios.get(this.url)).data;
    return entities.map((x: any) => this.transformIn(x));
  }

  /**
   * Remove entity.
   * @param entity Entity to remove.
   * @returns Removed entity.
   */
  public async delete(entity: T): Promise<T> {
    const url = this.url + "/" + entity.oid;
    return (await Axios.delete(url)).data;
  }

  /**
   * Transforms entity before send.
   * @param entity Entity to transform.
   * @returns Transformed entity.
   */
  protected transformOut(entity: T): any {
    return entity;
  }

  /**
   * Transforms entity after receive.
   * @param entity Entity to transform.
   * @returns Transformed entity.
   */
  protected transformIn(entity: any): T {
    return entity;
  }
}
