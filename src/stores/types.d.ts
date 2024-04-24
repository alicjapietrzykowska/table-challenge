export interface State {
  isLoading: boolean;
  ticketData: Ticket[];
}

export interface Ticket {
  id: number;
  customer: Customer;
  contact_channel: string;
  status: string;
  interaction_creation_date: string;
  due_date: string;
  attachments: string;
  last_comment: string;
  assignedTO: string;
}

export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country_code: string;
  phone: string;
  birthday: string;
}
