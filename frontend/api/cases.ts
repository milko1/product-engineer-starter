/*
  Using JS/TS native web client, instead of Axios or other widely used web client libraries.
  For demo purposes, using less dependencies, simpler, and showing how these work.
  
  Note I'm forcing NextJS to just avoid caching, as make sure I'm getting latest,
    it might not be the best idea for production and might be better a timed/smarter caching.
*/


const API_URL = 'http://localhost:8000';

export enum CaseStatus {
  SUBMITTED = 'submitted',
  CREATED = 'created',
  DELETED = 'deleted',
  APPROVED = 'approved',
  DENIED = 'denied',
  COMPLETE = 'complete',
}

export interface Case { // not used as of now, but useful if processing this data on the client-side, to add type-checks
  case_id: string;
  created_at: Date;
  status: CaseStatus;
}


export class API {
  
  constructor () {
  }


  static async getCases () {
    try {
      const res = await fetch(`${API_URL}/cases`, { cache: 'no-store' })
      if (!res.ok) {
        throw new Error(`Error fetching data from ${API_URL}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${API_URL}:`, error);
      throw new Error(`Error connecting to ${API_URL}`);
    }
  }


  static async getCase (case_id: string) {
    try {
      const res = await fetch(`${API_URL}/cases/${case_id}`, { cache: 'no-store' })
      if (!res.ok) {
        throw new Error(`Error fetching data from ${API_URL}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${API_URL}:`, error);
      throw new Error(`Error connecting to ${API_URL}`);
    }
  }


  static async createCase () {
    try {
      const res = await fetch(`${API_URL}/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        throw new Error(`Error fetching data from ${API_URL}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${API_URL}:`, error);
      throw new Error(`Error connecting to ${API_URL}`);
    }
  }
}
