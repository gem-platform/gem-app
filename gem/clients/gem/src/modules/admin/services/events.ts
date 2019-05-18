import { IEvent } from "@/modules/types";
import CrudService from "./crud";

/** Events service */
export default class EventsService extends CrudService<IEvent> {
  constructor() {
    super("/events");
  }
}
