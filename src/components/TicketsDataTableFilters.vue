<template>
  <div class="d-flex">
    <v-text-field
      v-model.trim="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      @update:modelValue="setSearchTerm(search)"
    />

    <v-btn color="primary" icon="mdi-filter" class="ml-5" />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { ref } from "vue";

const { setSearchTerm } = useAppStore();

const search = ref<string>("");
</script>
