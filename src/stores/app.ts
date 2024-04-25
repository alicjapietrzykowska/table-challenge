import axios from "axios";
import { defineStore } from "pinia";
import { State, Ticket } from "@/types";

export const useAppStore = defineStore("app", {
  state: (): State => ({
    isLoading: false,
    initialTicketData: [],
    searchTerm: "",
    filteredTickets: [],
  }),

  actions: {
    async fetchTicketData(): Promise<Ticket[] | undefined> {
      this.isLoading = true;

      try {
        const { data } = await axios.get("MOCK_DATA.json");
        this.initialTicketData = data;
        this.filteredTickets = data;
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

    setFilteredTickets(filters: string[], param: keyof Ticket): void {
      if (!filters.length) {
        this.filteredTickets = this.initialTicketData;
        return;
      }
      this.filteredTickets = this.initialTicketData.filter((ticket) =>
        filters.includes(ticket[param])
      );
    },
  },

  getters: {
    getAllContactChannels(state): string[] {
      return state.initialTicketData.reduce((unique: number[], ticket) => {
        if (ticket.status && !unique.includes(ticket.status)) {
          unique.push(ticket.status);
        }
        return unique;
      }, []);
    },

    getAllUniqueFields: (state: State): ((param: keyof Ticket) => string[]) => {
      return (ticketParam: keyof Ticket): string[] =>
        state.initialTicketData.reduce((unique: number[], ticket) => {
          if (ticket[ticketParam] && !unique.includes(ticket[ticketParam])) {
            unique.push(ticket[ticketParam]);
          }
          return unique;
        }, []);
    },

    getTicketDetailsById: (
      state: State
    ): ((T: string | number) => Ticket | undefined) => {
      return (ticketId: string | number): Ticket | undefined =>
        state.initialTicketData.find(
          (ticket) => String(ticket.id) === ticketId
        );
    },
  },
});
