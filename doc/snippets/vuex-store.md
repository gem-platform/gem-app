# Store snippets

## Implement store itself

```ts
import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

/** Import service to perform requests if required. */
const service = new DummyService();

/** Dummy storage module */
@Module({ namespaced: true, dynamic: true, name: "MODULE_NAME", store })
export default class DummyModule extends VuexModule {
  /** Implement store state here. */
  public state: string = "";

  /** Implement store actions here */

  /**
   * Do the job.
   * @param data data to pass to action.
   *             You can pass only one arg.
   * @returns Promise
   */
  @Action public async doJob(data: IJobData): Promise<boolean> {
    try {
      const result = await service.doJob(data);
      this.jobSucceeded(result);
      return true;
    } catch (err) {
      this.jobSucceeded(err || "Unknown error");
      return false;
    }
  }

  /**
   * Job succeeded.
   * @param token Authentication token.
   */
  @Mutation private jobSucceeded(result: IJobResult) {
    /** Mutate your state here */
    this.state = true;
  }

  /** Implement getters here. */

  /**
   * Is user authenticated?
   * @returns true if authenticated, otherwise false.
   */
  get isStateOK(): boolean {
    return this.state === "OK";
  }
}

export const Dummy = getModule(DummyModule);
```

## Import store and use it

1. Import store
2. Use state variables directly or use getters.
3. Call actions or mutations as a functions. Remember: you can pass only one arg.

```ts
import { Dummy } from "@/modules/dummy/store/index";

@Component
export default class DummyComponent extends Vue {
  async doJob() {
    // use async/await if action is async
    const done = await Dummy.doJob({
      jobData: "1234",
      jobData2: "2345"
    });
  }

  // mark function as a getter, to use it in a view
  // as a computed value
  get whatIsAState(): string {
    return "State is: " + Dummy.state + ".Is it OK: " + Dummy.isStateOK;
  }
}
```
