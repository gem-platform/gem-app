import { log } from "@/lib/logging";
import { Operation } from "@/lib/operations";
import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { EmptyEvent, IEvent } from "../../types";
import EventsService from "../services/events";

const service = new EventsService();

/** Events module */
@Module({ namespaced: true, dynamic: true, name: "admin-events", store })
export default class EventsStoreModule extends VuexModule {
  public events: IEvent[] = [];
  public showStartDateDialog: boolean = false;

  /** List of async operations. */
  public operations = {
    delete: new Operation(),
    fetch: new Operation(),
    save: new Operation()
  };

  /** UI */

  /**
   * Open edit dialog.
   * @param event Event to edit in dialog (default EmptyEvent).
   */
  @Mutation public openEditDialog(event: IEvent = EmptyEvent): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.operations.save.startConfirmation({ ...event });
  }

  /** Close edit dialog. */
  @Mutation public closeEditDialog(): void {
    this.operations.save.clear();
  }


  /**
   * Open event delete confirmation dialog.
   * @param event Event to delete.
   */
  @Mutation public openConfirmDeleteDialog(event: IEvent): void {
    this.operations.delete.startConfirmation(event);
  }

  /** Close event delete confirmation dialog. */
  @Mutation public closeConfirmDeleteDialog(): void {
    this.operations.delete.cancel();
  }

  /** Data */

  /** Fetch */

  /** Fetches list of events from remote server. */
  @Action public async fetch(): Promise<IEvent[] | undefined> {
    try {
      this.fetchEventsStarted();
      const events = await service.fetch();
      this.fetchEventsSucceeded(events);
      return events;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.fetchEventsFailed(message);
    }
  }

  /** Events has been fetched successfully. */
  @Mutation private fetchEventsStarted() {
    this.operations.fetch.start();
  }

  /** Events has been fetched successfully. */
  @Mutation private fetchEventsSucceeded(events: IEvent[]) {
    this.events = events;
    this.operations.fetch.succeed();
  }

  /** Fetch failed */
  @Mutation private fetchEventsFailed(error: string) {
    this.operations.fetch.fail(error);
  }

  /** Save */

  /**
   * Save event.
   * @param event Event to save.
   * @return Event.
   */
  @Action public async save(event: IEvent): Promise<IEvent | undefined> {
    try {
      this.saveEventStarted();
      if (event.oid && event.oid !== -1) {
        const result = await service.update(event);
        this.eventUpdated(result);
      } else {
        const result = await service.create(event);
        this.eventCreated(result);
      }
      return event;
    } catch (err) {
      const message =
        (err.response.data.detail instanceof Array
          ? err.response.data.detail[0].msg
          : err.message) || "Can't save event";
      log({ message });
      this.saveEventFailed(message);
    }
  }

  @Mutation private saveEventStarted() {
    this.operations.save.start();
  }

  @Mutation private saveEventFailed(error: string) {
    this.operations.save.fail(error);
  }

  /** Event has been successfully created. */
  @Mutation private eventCreated(event: IEvent) {
    this.events.push(event);
    this.operations.save.succeed("Event created");
  }

  /** Event has been successfully updated. */
  @Mutation private eventUpdated(event: IEvent) {
    const original = this.events.find(x => x.oid === event.oid);
    Object.assign(original, event);
    this.operations.save.succeed("Event updated");
  }

  /** Delete */

  /**
   * Delete event.
   * @param event Event to delete.
   */
  @Action public async delete(event: IEvent): Promise<IEvent | undefined> {
    try {
      this.deleteEventStarted();
      const result = await service.delete(event);
      this.eventDeleted(result);
      return result;
    } catch (err) {
      const message = err.response.data.detail;
      log({ message });
      this.deleteEventFailed(message);
    }
  }

  @Mutation private deleteEventStarted() {
    this.operations.delete.start();
  }

  /** Event has been successfully deleted. */
  @Mutation private eventDeleted(event: IEvent) {
    this.events = this.events.filter(x => x.oid !== event.oid);
    this.operations.delete.succeed("Event deleted");
  }

  /** Event has been successfully deleted. */
  @Mutation private deleteEventFailed(message: string = "") {
    this.operations.delete.fail(message);
  }

  /** Getters */

  get all(): IEvent[] {
    return this.events;
  }
}

export const EventsStore = getModule(EventsStoreModule);
