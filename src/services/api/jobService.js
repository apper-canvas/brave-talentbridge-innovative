import { getApperClient } from "@/services/apperClient";

class JobService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "job_type_c"}},
          {"field": {"Name": "experience_level_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "salary_range_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "requirements_c"}},
          {"field": {"Name": "benefits_c"}},
          {"field": {"Name": "posted_date_c"}},
          {"field": {"Name": "status_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('job_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching jobs:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "job_type_c"}},
          {"field": {"Name": "experience_level_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "salary_range_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "requirements_c"}},
          {"field": {"Name": "benefits_c"}},
          {"field": {"Name": "posted_date_c"}},
          {"field": {"Name": "status_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('job_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(jobData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Name: jobData.title_c,
          title_c: jobData.title_c,
          company_c: jobData.company_c,
          location_c: jobData.location_c,
          job_type_c: jobData.job_type_c,
          experience_level_c: jobData.experience_level_c,
          industry_c: jobData.industry_c,
          salary_range_c: jobData.salary_range_c,
          description_c: jobData.description_c,
          requirements_c: jobData.requirements_c,
          benefits_c: jobData.benefits_c,
          posted_date_c: jobData.posted_date_c,
          status_c: jobData.status_c
        }]
      };
      
      const response = await apperClient.createRecord('job_c', params);
      
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
      console.error("Error creating job:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.title_c && { Name: updates.title_c, title_c: updates.title_c }),
          ...(updates.company_c && { company_c: updates.company_c }),
          ...(updates.location_c && { location_c: updates.location_c }),
          ...(updates.job_type_c && { job_type_c: updates.job_type_c }),
          ...(updates.experience_level_c && { experience_level_c: updates.experience_level_c }),
          ...(updates.industry_c && { industry_c: updates.industry_c }),
          ...(updates.salary_range_c && { salary_range_c: updates.salary_range_c }),
          ...(updates.description_c && { description_c: updates.description_c }),
          ...(updates.requirements_c && { requirements_c: updates.requirements_c }),
          ...(updates.benefits_c && { benefits_c: updates.benefits_c }),
          ...(updates.posted_date_c && { posted_date_c: updates.posted_date_c }),
          ...(updates.status_c && { status_c: updates.status_c })
        }]
      };
      
      const response = await apperClient.updateRecord('job_c', params);
      
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
      console.error("Error updating job:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)] 
      };
      
      const response = await apperClient.deleteRecord('job_c', params);
      
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
      console.error("Error deleting job:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const jobService = new JobService();