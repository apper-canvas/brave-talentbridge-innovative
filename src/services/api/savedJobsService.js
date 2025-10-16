import { getApperClient } from "@/services/apperClient";

export const getAll = async () => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        {"field": {"Name": "Name"}},
        {"field": {"Name": "job_id_c"}},
        {"field": {"Name": "saved_at_c"}}
      ]
    };
    
    const response = await apperClient.fetchRecords('saved_job_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching saved jobs:", error?.response?.data?.message || error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        {"field": {"Name": "Name"}},
        {"field": {"Name": "job_id_c"}},
        {"field": {"Name": "saved_at_c"}}
      ]
    };
    
    const response = await apperClient.getRecordById('saved_job_c', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching saved job ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const isJobSaved = async (jobId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "job_id_c"}}
      ],
      where: [{
        "FieldName": "job_id_c",
        "Operator": "EqualTo",
        "Values": [parseInt(jobId)]
      }]
    };
    
    const response = await apperClient.fetchRecords('saved_job_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return false;
    }
    
    return (response.data || []).length > 0;
  } catch (error) {
    console.error(`Error checking if job ${jobId} is saved:`, error?.response?.data?.message || error);
    return false;
  }
};

export const create = async (jobId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [{
        Name: `Saved Job - ${jobId}`,
        job_id_c: parseInt(jobId),
        saved_at_c: new Date().toISOString()
      }]
    };
    
    const response = await apperClient.createRecord('saved_job_c', params);
    
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
    console.error("Error saving job:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteSavedJob = async (jobId) => {
  try {
    const apperClient = getApperClient();
    
    const checkParams = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "job_id_c"}}
      ],
      where: [{
        "FieldName": "job_id_c",
        "Operator": "EqualTo",
        "Values": [parseInt(jobId)]
      }]
    };
    
    const checkResponse = await apperClient.fetchRecords('saved_job_c', checkParams);
    
    if (!checkResponse.success || !checkResponse.data || checkResponse.data.length === 0) {
      console.error("Saved job not found");
      return false;
    }
    
    const savedJobId = checkResponse.data[0].Id;
    
    const params = { 
      RecordIds: [savedJobId] 
    };
    
    const response = await apperClient.deleteRecord('saved_job_c', params);
    
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
    console.error("Error deleting saved job:", error?.response?.data?.message || error);
    return false;
  }
};

export default {
  getAll,
  getById,
  isJobSaved,
  create,
  delete: deleteSavedJob
};