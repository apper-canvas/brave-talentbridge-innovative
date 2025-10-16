import { getApperClient } from "@/services/apperClient";

class ApplicationService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "candidate_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "resume_url_c"}},
          {"field": {"Name": "cover_letter_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "submitted_date_c"}},
          {"field": {"Name": "job_id_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching applications:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "candidate_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "resume_url_c"}},
          {"field": {"Name": "cover_letter_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "submitted_date_c"}},
          {"field": {"Name": "job_id_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('application_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByJobId(jobId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "candidate_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "resume_url_c"}},
          {"field": {"Name": "cover_letter_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "submitted_date_c"}},
          {"field": {"Name": "job_id_c"}}
        ],
        where: [{
          "FieldName": "job_id_c",
          "Operator": "EqualTo",
          "Values": [parseInt(jobId)]
        }]
      };
      
      const response = await apperClient.fetchRecords('application_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching applications for job ${jobId}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async create(applicationData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Name: applicationData.candidate_name_c,
          candidate_name_c: applicationData.candidate_name_c,
          email_c: applicationData.email_c,
          phone_c: applicationData.phone_c,
          resume_url_c: applicationData.resume_url_c,
          cover_letter_c: applicationData.cover_letter_c,
          status_c: applicationData.status_c,
          submitted_date_c: applicationData.submitted_date_c,
          job_id_c: parseInt(applicationData.job_id_c)
        }]
      };
      
      const response = await apperClient.createRecord('application_c', params);
      
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
      console.error("Error creating application:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.candidate_name_c && { Name: updates.candidate_name_c, candidate_name_c: updates.candidate_name_c }),
          ...(updates.email_c && { email_c: updates.email_c }),
          ...(updates.phone_c && { phone_c: updates.phone_c }),
          ...(updates.resume_url_c && { resume_url_c: updates.resume_url_c }),
          ...(updates.cover_letter_c && { cover_letter_c: updates.cover_letter_c }),
          ...(updates.status_c && { status_c: updates.status_c }),
          ...(updates.submitted_date_c && { submitted_date_c: updates.submitted_date_c }),
          ...(updates.job_id_c && { job_id_c: parseInt(updates.job_id_c) })
        }]
      };
      
      const response = await apperClient.updateRecord('application_c', params);
      
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
      console.error("Error updating application:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)] 
      };
      
      const response = await apperClient.deleteRecord('application_c', params);
      
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
      console.error("Error deleting application:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const applicationService = new ApplicationService();