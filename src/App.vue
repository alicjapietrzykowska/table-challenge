<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores/app";

const { fetchTicketData } = useAppStore();

onMounted(() => {
  fetchTicketData();
});
</script>
