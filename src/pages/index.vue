<template>
  <v-card title="Tickets List" flat>
    <template v-slot:text>
      <tickets-data-table-filters />
    </template>
    <tickets-data-table />
  </v-card>
</template>
