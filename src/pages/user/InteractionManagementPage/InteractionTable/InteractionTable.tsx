import {
  FiEdit,
  FiTrash2,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";
import { IInteraction } from "../../../../types"; // Define this type based on your Prisma model

const interactionTypeConfig = {
  CALL: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    icon: <FiPhone className="mr-1" />,
    label: "Call",
  },
  EMAIL: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    icon: <FiMail className="mr-1" />,
    label: "Email",
  },
  MEET: {
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    icon: <FiCalendar className="mr-1" />,
    label: "Meeting",
  },
  CHAT: {
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    icon: <FiMessageSquare className="mr-1" />,
    label: "Chat",
  },
};

interface InteractionsTableProps {
  interactions: IInteraction[];
  onEdit?: (interactionId: string) => void;
  onDelete?: (interactionId: string) => void;
}

const InteractionTable = ({
  interactions,
  onEdit,
  onDelete,
}: InteractionsTableProps) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              Interaction
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Details
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Related To
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
          {interactions?.map((interaction) => (
            <tr
              key={interaction?.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-500"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center">
                    <span
                      className={`p-2 rounded-full ${
                        interactionTypeConfig[interaction.type].color
                      }`}
                    >
                      {interactionTypeConfig[interaction.type].icon}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {interactionTypeConfig[interaction.type].label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(interaction.date)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-white">
                  {interaction.notes || (
                    <span className="text-gray-400 dark:text-gray-500">
                      No notes
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm text-gray-900 dark:text-white">
                    <FiUser className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {interaction.client?.name || "Unknown Client"}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiBriefcase className="mr-2 h-4 w-4" />
                    {interaction.project?.title || "Unknown Project"}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(interaction?.id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(interaction.id)}
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

      {interactions?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No interactions found
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractionTable;
