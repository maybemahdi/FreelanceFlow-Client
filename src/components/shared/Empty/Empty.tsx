import { FiDatabase } from "react-icons/fi";
import { Link } from "react-router-dom";
import MyButton from "../../ui/MyButton/MyButton";

interface EmptyTableProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionPath?: string;
  className?: string;
}

const Empty = ({
  title = "No Data Found",
  description = "There are no records to display. You might want to add some data.",
  actionText = "Add New",
  actionPath,
  className = "",
}: EmptyTableProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      <div className="text-5xl text-gray-400 mb-4">
        <FiDatabase />
      </div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
        {description}
      </p>
      {actionPath && (
        <Link to={actionPath}>
          <MyButton label={actionText} />
        </Link>
      )}
    </div>
  );
};

export default Empty;
