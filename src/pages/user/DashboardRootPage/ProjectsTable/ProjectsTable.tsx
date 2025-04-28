import {
  FiEdit,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiPauseCircle,
  FiPlay,
} from "react-icons/fi";
import { IProject } from "../../../../types";

interface ProjectsTableProps {
  projects: IProject[];
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
}

const statusConfig = {
  NOT_STARTED: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    icon: <FiClock className="mr-1" />,
    label: "Not Started",
  },
  IN_PROGRESS: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    icon: <FiPlay className="mr-1" />,
    label: "In Progress",
  },
  COMPLETED: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    icon: <FiCheckCircle className="mr-1" />,
    label: "Completed",
  },
  ON_HOLD: {
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    icon: <FiPauseCircle className="mr-1" />,
    label: "On Hold",
  },
};

const ProjectsTable = ({ projects, onEdit, onDelete }: ProjectsTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-slate-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Project
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Budget
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Deadline
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-gray-700">
          {projects?.map((project) => (
            <tr
              key={project?.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-500"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {project?.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {formatDate(project?.createdAt)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {formatCurrency(project?.budget)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`text-sm ${
                    new Date(project?.deadline) < new Date() &&
                    project?.status !== "COMPLETED"
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {formatDate(project?.deadline)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                    statusConfig[project?.status].color
                  }`}
                >
                  {statusConfig[project?.status].icon}
                  {statusConfig[project?.status].label}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(project?.id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(project?.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No projects found</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;
