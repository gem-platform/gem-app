<template>
  <edit-dialog
    title="Edit law"
    :visible="visible"
    :operation="operation"
    :canSave="!isLocked"
    @close="close"
    @save="save"
  >
    <template v-if="!isNew" #actions>
      <v-btn
        light
        flat
        @click="onLockClicked"
        data-ref="lock"
        v-if="!isLocked && canLock"
      >
        Lock
      </v-btn>
    </template>

    <v-flex xs12>
      <v-alert type="info" v-model="isLocked" ref="locked-alert">
        This law is locked for modification
      </v-alert>
    </v-flex>

    <v-flex xs12>
      <v-text-field
        v-model="law.title"
        label="Title"
        required
        ref="title"
      />
    </v-flex>
    <v-flex xs12>
      <ckeditor
        :editor="editor.editor"
        v-model="law.content"
        :config="editor.config"
      ></ckeditor>
    </v-flex>
  </edit-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import { ILaw } from "@/modules/types.ts";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyLaw } from "../../types";

// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import EditDialog from "./EditDialog.vue";

@Component({
  components: {
    EditDialog
  }
})
export default class EditUserDialog extends Vue {
  @Prop({default: () => EmptyLaw}) public readonly law!: ILaw;
  @Prop({default: false}) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;

  private get editor() {
    return {
      config: {},
      editor: ClassicEditor
    };
  }

  @Emit()
  private close() {
    return;
  }

  @Emit()
  private save() {
    return this.law;
  }

  @Emit("lock")
  private onLockClicked() {
    return this.law;
  }

  get isNew(): boolean {
    return this.law.oid === -1;
  }

  get isLocked(): boolean {
    return this.law.locked;
  }

  get canLock(): boolean {
    // For future usage
    return false;
  }
}
</script>
