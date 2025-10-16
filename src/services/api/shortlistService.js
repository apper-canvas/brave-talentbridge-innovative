import { getApperClient } from "@/services/apperClient";

class ShortlistService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "criteria_c"}},
          {"field": {"Name": "number_of_candidates_c"}},
          {"field": {"Name": "urgency_c"}},
          {"field": {"Name": "additional_notes_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "request_date_c"}},
          {"field": {"Name": "job_id_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('shortlist_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching shortlist requests:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "criteria_c"}},
          {"field": {"Name": "number_of_candidates_c"}},
          {"field": {"Name": "urgency_c"}},
          {"field": {"Name": "additional_notes_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "request_date_c"}},
          {"field": {"Name": "job_id_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('shortlist_request_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching shortlist request ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByJobId(jobId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "criteria_c"}},
          {"field": {"Name": "number_of_candidates_c"}},
          {"field": {"Name": "urgency_c"}},
          {"field": {"Name": "additional_notes_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "request_date_c"}},
          {"field": {"Name": "job_id_c"}}
        ],
        where: [{
          "FieldName": "job_id_c",
          "Operator": "EqualTo",
          "Values": [parseInt(jobId)]
        }]
      };
      
      const response = await apperClient.fetchRecords('shortlist_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching shortlist requests for job ${jobId}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async create(requestData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Name: `Shortlist Request - ${new Date().toISOString().split('T')[0]}`,
          criteria_c: requestData.criteria_c,
          number_of_candidates_c: parseInt(requestData.number_of_candidates_c),
          urgency_c: requestData.urgency_c,
          additional_notes_c: requestData.additional_notes_c,
          status_c: requestData.status_c,
          request_date_c: requestData.request_date_c,
          job_id_c: parseInt(requestData.job_id_c)
        }]
      };
      
      const response = await apperClient.createRecord('shortlist_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating shortlist request:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.criteria_c && { criteria_c: updates.criteria_c }),
          ...(updates.number_of_candidates_c && { number_of_candidates_c: parseInt(updates.number_of_candidates_c) }),
          ...(updates.urgency_c && { urgency_c: updates.urgency_c }),
          ...(updates.additional_notes_c && { additional_notes_c: updates.additional_notes_c }),
          ...(updates.status_c && { status_c: updates.status_c }),
          ...(updates.request_date_c && { request_date_c: updates.request_date_c }),
          ...(updates.job_id_c && { job_id_c: parseInt(updates.job_id_c) })
        }]
      };
      
      const response = await apperClient.updateRecord('shortlist_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating shortlist request:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)] 
      };
      
      const response = await apperClient.deleteRecord('shortlist_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting shortlist request:", error?.response?.data?.message || error);
      return false;
    }
  }
}
export const shortlistService = new ShortlistService();