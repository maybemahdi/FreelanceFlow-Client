import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../../../components/ui/MyButton/MyButton";
import { Plus } from "lucide-react";
import ReminderTable from "./ReminderTable/ReminderTable";
import MyPagination from "../../../components/ui/MyPagination/MyPagination";
import Empty from "../../../components/shared/Empty/Empty";
import {
  useDeleteReminderMutation,
  useGetAllReminderQuery,
} from "../../../redux/features/reminder/reminder.api";
import { handleAsyncWithToast } from "../../../utils/handleAsyncWithToast";
import Swal from "sweetalert2";

const ReminderManagementPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<
    { name: string; value: string | number }[]
  >([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState<{ name: string; value: string }>(
    {
      name: "",
      value: "",
    }
  );

  useEffect(() => {
    setQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ]);
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
    setQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
      searchText,
    ]);
  }, [searchText]);

  const {
    data: getInteractionsResponse,
    isLoading: isInteractionsLoading,
    isFetching: isInteractionsFetching,
  } = useGetAllReminderQuery(query);

  const [deleteReminder] = useDeleteReminderMutation();

  const reminders = getInteractionsResponse?.data;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onSearch = (value: string) =>
    setSearchText({ name: "searchTerm", value: value });

  const handleEdit = (reminderId: string) => {
    navigate(`/reminders/${reminderId}`);
  };

  const handleDelete = (reminderId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleAsyncWithToast(async () => {
          return deleteReminder(reminderId);
        }, "Deleting...");
        Swal.fire({
          title: "Deleted!",
          text: "Reminder has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="flex flex-col gap-8">
      {/* interaction table */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <h2 className="font-semibold text-2xl text-primary dark:text">
            All Reminders
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reminders..."
                className="w-full border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 pr-8"
                value={searchText.value}
                onChange={(e) => onSearch(e.target.value)}
              />
              {searchText.value ? (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary"
                  onClick={() =>
                    setSearchText({ name: "searchTerm", value: "" })
                  }
                >
                  ✕
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              <Link to={"/reminders/new"}>
                <MyButton
                  label="Add new"
                  customIcon={<Plus />}
                  className="py-[9.7px]"
                />
              </Link>
            </div>
          </div>
        </div>
        {!isInteractionsLoading && !isInteractionsFetching ? (
          <div className="w-full">
            <ReminderTable
              reminders={reminders}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <MyPagination
              page={page}
              pageSize={pageSize}
              total={getInteractionsResponse?.meta?.total || 0}
              onPageChange={handlePaginationChange}
            />
          </div>
        ) : (
          ""
        )}
        {isInteractionsLoading || isInteractionsFetching ? (
          <div className="w-full gap-x-2 flex justify-center items-center h-[200px]">
            <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
            <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
          </div>
        ) : (
          ""
        )}
        {!isInteractionsLoading &&
        !isInteractionsFetching &&
        reminders?.length < 1 ? (
          <Empty
            title="No Reminder Found"
            description="No reminder found. Add reminder here."
            actionText="Add reminder"
            actionPath="/reminders/new"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ReminderManagementPage;
