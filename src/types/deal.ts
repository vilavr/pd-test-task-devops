// helper interfaces for deal
export interface User {
    id: number;
    name: string;
    email: string;
    active_flag: boolean;
  }
  
  export interface Organization {
    id: number;
    name: string;
    people_count?: number;
    owner_id?: number;
  }
  
  export interface Person {
    id: number;
    name: string;
    email?: { label: string; value: string; primary: boolean }[];
    phone?: { label: string; value: string; primary: boolean }[];
  }
  
  export interface Deal {
    id?: number;
    title: string;
    value?: number;
    currency?: string;
    probability?: number;
    org_id?: Organization;
    person_id?: Person;
    pipeline_id?: number;
    stage_id?: number;
    status?: string;
    add_time?: string;
    update_time?: string;
    creator_user_id?: User;
    user_id?: User;
    visible_to?: string;
    expected_close_date?: string;
    label_ids?: number[];
    products_count?: number;
    activities_count?: number;
    done_activities_count?: number;
    undone_activities_count?: number;
    email_messages_count?: number;
    notes_count?: number;
    followers_count?: number;
    participants_count?: number;
    last_activity_date?: string;
    next_activity_date?: string;
    last_incoming_mail_time?: string;
    last_outgoing_mail_time?: string;
    lost_reason?: string;
    lost_time?: string;
    close_time?: string;
    won_time?: string;
    first_won_time?: string;
    rotten_time?: string;
    weighted_value?: number;
    weighted_value_currency?: string;
    formatted_value?: string;
    formatted_weighted_value?: string;
    cc_email?: string;
    origin?: string;
    origin_id?: string;
    mrr?: number;
    arr?: number;
    acv?: number;
  }
  