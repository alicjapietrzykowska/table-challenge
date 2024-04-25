<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores/app";

const { fetchTicketData } = useAppStore();

onMounted(() => {
  fetchTicketData();
});
</script>
