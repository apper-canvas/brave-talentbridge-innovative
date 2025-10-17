import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { candidateProfileService } from '@/services/api/candidateProfileService';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Tags: '',
    personal_information_c: '',
    skills_c: '',
    experience_c: '',
    contact_information_c: ''
  });

  const skillsOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'sql', label: 'SQL' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
    { value: 'c#', label: 'C#' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!user?.userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await candidateProfileService.getByUserId(user.userId);
      
      if (data) {
        setProfile(data);
        setFormData({
          Name: data.Name || '',
          Tags: data.Tags || '',
          personal_information_c: data.personal_information_c || '',
          skills_c: data.skills_c || '',
          experience_c: data.experience_c || '',
          contact_information_c: data.contact_information_c || ''
        });
      } else {
        setProfile(null);
      }
    } catch (err) {
      setError('Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      skills_c: selectedOptions.join(',')
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        Name: profile.Name || '',
        Tags: profile.Tags || '',
        personal_information_c: profile.personal_information_c || '',
        skills_c: profile.skills_c || '',
        experience_c: profile.experience_c || '',
        contact_information_c: profile.contact_information_c || ''
      });
    }
  };

  const handleSave = async () => {
    if (!formData.Name?.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);

    try {
      let result;
      
      if (profile?.Id) {
        result = await candidateProfileService.update(profile.Id, formData);
      } else {
        result = await candidateProfileService.create(formData);
      }

      if (result) {
        toast.success('Profile saved successfully');
        setIsEditing(false);
        await loadProfile();
      } else {
        toast.error('Failed to save profile');
      }
    } catch (err) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  const selectedSkills = formData.skills_c ? formData.skills_c.split(',') : [];

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your candidate profile information</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            {!isEditing && (
              <Button variant="primary" onClick={handleEdit}>
                <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="Tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <Input
                  id="Tags"
                  name="Tags"
                  value={formData.Tags}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend Developer, React Expert"
                />
              </div>

              <div>
                <label htmlFor="skills_c" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <select
                  id="skills_c"
                  name="skills_c"
                  multiple
                  value={selectedSkills}
                  onChange={handleSkillsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  style={{ minHeight: '120px' }}
                >
                  {skillsOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple skills</p>
              </div>

              <div>
                <label htmlFor="personal_information_c" className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Information
                </label>
                <TextArea
                  id="personal_information_c"
                  name="personal_information_c"
                  value={formData.personal_information_c}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div>
                <label htmlFor="experience_c" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <TextArea
                  id="experience_c"
                  name="experience_c"
                  value={formData.experience_c}
                  onChange={handleInputChange}
                  placeholder="Describe your work experience..."
                  rows={6}
                />
              </div>

              <div>
                <label htmlFor="contact_information_c" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information
                </label>
                <TextArea
                  id="contact_information_c"
                  name="contact_information_c"
                  value={formData.contact_information_c}
                  onChange={handleInputChange}
                  placeholder="Email, phone, LinkedIn, etc."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Check" className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {!profile ? (
                <div className="text-center py-12">
                  <ApperIcon name="User" className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Profile Yet</h3>
                  <p className="text-gray-600 mb-6">Create your candidate profile to get started</p>
                  <Button variant="primary" onClick={handleEdit}>
                    <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                    Create Profile
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                    <p className="text-gray-900">{profile.Name || 'Not provided'}</p>
                  </div>

                  {profile.Tags && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Tags</h3>
                      <p className="text-gray-900">{profile.Tags}</p>
                    </div>
                  )}

                  {profile.skills_c && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills_c.split(',').map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.personal_information_c && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h3>
                      <p className="text-gray-900 whitespace-pre-wrap">{profile.personal_information_c}</p>
                    </div>
                  )}

                  {profile.experience_c && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Experience</h3>
                      <p className="text-gray-900 whitespace-pre-wrap">{profile.experience_c}</p>
                    </div>
                  )}

                  {profile.contact_information_c && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h3>
                      <p className="text-gray-900 whitespace-pre-wrap">{profile.contact_information_c}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;