import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiPhone,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";
import { IClient } from "../../../../types"; // Define this type based on your Prisma model

interface ClientsTableProps {
  clients: IClient[];
  onEdit?: (client: IClient) => void;
  onDelete?: (clientId: string) => void;
}

const ClientsTable = ({ clients, onEdit, onDelete }: ClientsTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
              Client
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Projects
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
          {clients?.map((client) => (
            <tr
              key={client?.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-500"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {client?.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Added: {formatDate(client?.createdAt)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white flex flex-col gap-1">
                  <div className="flex items-center">
                    <FiMail className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {client?.email}
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {client?.phoneNumber}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {client?.company ? (
                    <div className="flex items-center">
                      <FiBriefcase className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      {client.company}
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">
                      N/A
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {client?.projects?.length || 0}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(client)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(client?.id)}
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

      {clients?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No clients found</p>
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
