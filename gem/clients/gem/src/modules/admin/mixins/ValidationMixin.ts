import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ValidationMixin extends Vue {
  public validationMessage(path: string, data: []) {
    if (!data) {
      return [];
    }

    return data
      .map((x: any) => ({
        location: x.loc.join("."),
        message: x.msg
      }))
      .filter((x: any) => x.location === path)
      .map((x: any) => x.message);
  }
}
