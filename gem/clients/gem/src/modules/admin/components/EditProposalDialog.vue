<template>
  <edit-dialog
    :title="$t('proposal.edit')"
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
        @click="lock"
        data-ref="lock"
        v-if="!isLocked && canLock"
      >
        {{ $t("lock") }}
      </v-btn>
    </template>

    <v-flex xs12>
      <v-alert type="info" v-model="isLocked" ref="locked-alert">
        {{ $t("locked") }}
      </v-alert>
    </v-flex>

    <v-flex xs12>
      <v-text-field
        v-model="proposal.title"
        :label="$t('title')"
        required
        ref="title"
      />
    </v-flex>
    <v-flex xs12>
      <ckeditor
        :editor="editor.editor"
        v-model="proposal.content"
        :config="editor.config"
      ></ckeditor>
    </v-flex>
  </edit-dialog>
</template>

<script lang="ts">
import { Operation } from "@/lib/operations";
import { IProposal } from "@/modules/types.ts";
import { Component, Emit, Model, Prop, Vue } from "vue-property-decorator";
import { EmptyProposal } from "../../types";

// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import EditDialog from "./EditDialog.vue";

@Component({
  components: {
    EditDialog
  }
})
export default class EditUserDialog extends Vue {
  @Prop({ default: () => EmptyProposal }) public readonly proposal!: IProposal;
  @Prop({ default: false }) public visible!: boolean;
  @Prop({}) public readonly operation!: Operation;

  private get editor() {
    return {
      config: {},
      editor: ClassicEditor
    };
  }

  @Emit() private close() {
    return;
  }

  @Emit() private save() {
    return this.proposal;
  }

  @Emit() private lock() {
    return this.proposal;
  }

  get isNew(): boolean {
    return this.proposal.oid === -1;
  }

  get isLocked(): boolean {
    return this.proposal.locked;
  }

  get canLock(): boolean {
    // For future usage
    return false;
  }
}
</script>

<i18n>
en:
  proposal.edit: Edit proposal
  title: Title
  lock: Lock
  locked: The proposal is locked for modification
ru:
  proposal.edit: Редактировать законопроект
  title: Заголовок
  Lock: Заблокировать
  locked: Законопроект заблокирован для изменений
</i18n>
