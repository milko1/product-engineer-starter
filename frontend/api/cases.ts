/*
  Using JS/TS native web client, instead of Axios or other widely used web client libraries.
  For demo purposes, using less dependencies, simpler, and showing how these work.
*/


const API_URL = 'http://localhost:8000';

enum CaseStatus {
  SUBMITTED = 'submitted',
  CREATED = 'created',
  DELETED = 'deleted',
  APPROVED = 'approved',
  DENIED = 'denied'
}

interface Case { // not used as of now, but useful if processing this data on the client-side, to add type-checks
  case_id: string;
  created_at: Date;
  status: CaseStatus;
}


export class API {
  
  constructor () {
  }


  static async getCases () {
    try {
      const res = await fetch(`${API_URL}/cases`)
      if (!res.ok) {
        throw new Error(`Error fetching data from ${API_URL}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${API_URL}:`, error);
    }
  }


  static async getCase (case_id: string) {
    try {
      const res = await fetch(`${API_URL}/cases/${case_id}`)
      if (!res.ok) {
        throw new Error(`Error fetching data from ${API_URL}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${API_URL}:`, error);
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
    }
  }
}
