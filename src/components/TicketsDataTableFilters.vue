<template>
  <div class="d-flex align-center">
    <v-text-field
      v-model.trim="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      @update:modelValue="store.setSearchTerm(search)"
    />
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          prepend-icon="mdi-filter"
          class="ml-5"
          size="large"
          v-bind="props"
        >
          Filters
        </v-btn>
      </template>

      <v-card min-width="400">
        <v-list>
          <v-list-item>
            <h3>Filters</h3>
          </v-list-item>
          <v-divider class="my-2" />
          <v-list-item>
            <v-combobox
              v-model="selectedStatuses"
              multiple
              label="Statuses"
              :items="store.getAllUniqueFields('status')"
              @update:modelValue="store.setFilteredTickets($event, 'status')"
            />
          </v-list-item>
          <v-list-item>
            <v-combobox
              v-model="selectedContactChannels"
              multiple
              label="Contact channels"
              :items="store.getAllUniqueFields('contact_channel')"
              @update:modelValue="
                store.setFilteredTickets($event, 'contact_channel')
              "
            />
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const search = ref<string>("");

const menu = ref<boolean>(false);

const selectedStatuses = ref<string[]>([]);
const selectedContactChannels = ref<string[]>([]);
</script>
