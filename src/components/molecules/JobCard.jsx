import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import SaveJobButton from "@/components/molecules/SaveJobButton";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewJob = () => {
    navigate(`/job/${job.Id}`);
  };

  const getJobTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "success";
      case "part-time":
        return "warning";
      case "contract":
        return "info";
      default:
        return "default";
    }
  };

  const getExperienceLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "entry-level":
        return "success";
      case "mid-level":
        return "primary";
      case "senior-level":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card hover className="p-6 cursor-pointer" onClick={handleViewJob}>
    <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
            <h3
                className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                {job.title_c}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
                <ApperIcon name="Building2" className="h-4 w-4 mr-2" />
                <span className="font-medium">{job.company_c}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-3">
                <ApperIcon name="MapPin" className="h-4 w-4 mr-2" />
                <span>{job.location_c}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="default">
                    {job.industry_c}
                </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary">
                    {job.experience_level_c}
                </Badge>
                <Badge variant={getJobTypeColor(job.job_type_c)}>
                    {job.job_type_c}
                </Badge>
                <Badge variant={getExperienceLevelColor(job.experience_level_c)}>
                    {job.experience_level_c}
                </Badge>
                <Badge variant="default">
                    {job.industry_c}
                </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {job.description_c?.substring(0, 120)}...
                      </p>
            <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                    <ApperIcon name="Clock" className="h-4 w-4 mr-1" />
                    <span>Posted {formatDistanceToNow(new Date(job.posted_date_c), {
                            addSuffix: true
                        })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <SaveJobButton jobId={job.Id} variant="ghost" size="sm" />
                    <Button variant="primary" size="sm" onClick={handleViewJob}>View Details
                                  </Button>
                </div>
            </div>
        </div></div></Card>
  );
};

export default JobCard;