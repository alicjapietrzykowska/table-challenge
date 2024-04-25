import axios from "axios";
import { defineStore } from "pinia";
import { State, Ticket } from "@/types";

export const useAppStore = defineStore("app", {
  state: (): State => ({
    isLoading: false,
    ticketData: [],
    searchTerm: "",
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

    setSearchTerm(searchTerm: string): void {
      this.searchTerm = searchTerm;
    },
  },

  getters: {
    sortedTicketData(state): Ticket[] {
      return [...state.ticketData].sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      );
    },

    getAllStatuses(state): string[] {
      return state.ticketData.reduce((unique: number[], ticket) => {
        if (ticket.status && !unique.includes(ticket.status)) {
          unique.push(ticket.status);
        }
        return unique;
      }, []);
    },

    getTicketDetailsById: (
      state: State
    ): ((T: string | number) => Ticket | undefined) => {
      return (ticketId: string | number): Ticket | undefined =>
        state.ticketData.find((ticket) => String(ticket.id) === ticketId);
    },
  },
});
