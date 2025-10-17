import { getApperClient } from '@/services/apperClient';

class CandidateProfileService {
  constructor() {
    this.tableName = 'candidate_profile_c';
  }

  async getByUserId(userId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "personal_information_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "experience_c" } },
          { field: { Name: "contact_information_c" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        where: [
          {
            FieldName: "Owner",
            Operator: "EqualTo",
            Values: [parseInt(userId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data || response.data.length === 0) {
        return null;
      }

      return response.data[0];
    } catch (error) {
      console.error("Error fetching candidate profile:", error?.response?.data?.message || error);
      return null;
    }
  }

  async create(profileData) {
    try {
      const apperClient = getApperClient();

      const params = {
        records: [
          {
            Name: profileData.Name || '',
            Tags: profileData.Tags || '',
            personal_information_c: profileData.personal_information_c || '',
            skills_c: profileData.skills_c || '',
            experience_c: profileData.experience_c || '',
            contact_information_c: profileData.contact_information_c || ''
          }
        ]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create profile:`, failed);
          return null;
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating candidate profile:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, profileData) {
    try {
      const apperClient = getApperClient();

      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: profileData.Name || '',
            Tags: profileData.Tags || '',
            personal_information_c: profileData.personal_information_c || '',
            skills_c: profileData.skills_c || '',
            experience_c: profileData.experience_c || '',
            contact_information_c: profileData.contact_information_c || ''
          }
        ]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update profile:`, failed);
          return null;
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating candidate profile:", error?.response?.data?.message || error);
      return null;
    }
  }
}

export const candidateProfileService = new CandidateProfileService();