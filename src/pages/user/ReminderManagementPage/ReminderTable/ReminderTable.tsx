import {
  FiEdit,
  FiTrash2,
  FiBell,
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiAlertTriangle,
} from "react-icons/fi";
import { IReminder } from "../../../../types";

interface RemindersTableProps {
  reminders: IReminder[];
  onEdit?: (reminder: IReminder) => void;
  onDelete?: (reminderId: string) => void;
}

const ReminderTable = ({
  reminders,
  onEdit,
  onDelete,
}: RemindersTableProps) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getReminderStatus = (dateString: string) => {
    const now = new Date();
    const reminderDate = new Date(dateString);
    const timeDiff = reminderDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 0) {
      return {
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        label: "Overdue",
        icon: <FiAlertTriangle className="mr-1" />,
      };
    } else if (hoursDiff < 24) {
      return {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        label: "Due Soon",
        icon: <FiBell className="mr-1" />,
      };
    } else {
      return {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        label: "Upcoming",
        icon: <FiCalendar className="mr-1" />,
      };
    }
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
              Reminder
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Due Date
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
          {reminders?.map((reminder) => {
            const status = getReminderStatus(reminder.date);
            return (
              <tr
                key={reminder?.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-500"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {reminder.message?.length > 50
                      ? reminder?.message?.substring(0, 30) + "..."
                      : reminder?.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {formatDateTime(reminder.date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${status.color}`}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {reminder.client && (
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <FiUser className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        {reminder.client.name}
                      </div>
                    )}
                    {reminder.project && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiBriefcase className="mr-2 h-4 w-4" />
                        {reminder.project.title}
                      </div>
                    )}
                    {!reminder.client && !reminder.project && (
                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        General reminder
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(reminder)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(reminder.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {reminders?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No reminders found</p>
        </div>
      )}
    </div>
  );
};

export default ReminderTable;
