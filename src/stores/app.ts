// Utilities
import axios from "axios";
import { defineStore } from "pinia";
import { State, Ticket } from "@/types";

export const useAppStore = defineStore("app", {
  state: (): State => ({
    isLoading: false,
    ticketData: [],
  }),

  actions: {
    async fetchTicketData(): Promise<Ticket[] | undefined> {
      this.isLoading = true;

      try {
        const { data } = await axios.get("MOCK_DATA.json");
        this.ticketData = data;
      } catch (error) {
        console.error(error);
        return error;
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    sortedTicketData(state): Ticket[] {
      return [...state.ticketData].sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      );
    },

    getTicketDetailsById: (
      state
    ): ((T: string | number) => Ticket | undefined) => {
      return (ticketId: string | number): Ticket | undefined =>
        state.ticketData.find((ticket) => String(ticket.id) === ticketId);
    },
  },
});
