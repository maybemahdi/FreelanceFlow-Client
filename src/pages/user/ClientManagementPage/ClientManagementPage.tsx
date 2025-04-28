/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useDeleteClientMutation,
  useGetMyClientsQuery,
} from "../../../redux/features/client/client.api";
import MyPagination from "../../../components/ui/MyPagination/MyPagination";
import Empty from "../../../components/shared/Empty/Empty";
import ClientsTable from "./ClientsTable/ClientsTable";
import MyButton from "../../../components/ui/MyButton/MyButton";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { handleAsyncWithToast } from "../../../utils/handleAsyncWithToast";
import Swal from "sweetalert2";

const ClientManagementPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<{ name: string; value: any }[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState<{ name: string; value: any }>({
    name: "",
    value: "",
  });

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
    data: getMyClientsResponse,
    isLoading: isMyClientsLoading,
    isFetching: isMyClientsFetching,
  } = useGetMyClientsQuery(query);

  const [deleteClient] = useDeleteClientMutation();

  const clients = getMyClientsResponse?.data;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onSearch = (value: string) =>
    setSearchText({ name: "searchTerm", value: value });

  const handleEdit = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  const handleDelete = async (clientId: string) => {
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
          return deleteClient(clientId);
        }, "Deleting...");
        Swal.fire({
          title: "Deleted!",
          text: "Client has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="flex flex-col gap-8">
      {/* client table */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <h2 className="font-semibold text-2xl text-primary dark:text">
            Manage Clients
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
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
              <Link to={"/clients/new"}>
                <MyButton
                  label="Add Client"
                  customIcon={<Plus />}
                  className="py-[9.7px]"
                />
              </Link>
            </div>
          </div>
        </div>
        {!isMyClientsLoading && !isMyClientsFetching ? (
          <div className="w-full">
            <ClientsTable
              clients={clients}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <MyPagination
              page={page}
              pageSize={pageSize}
              total={getMyClientsResponse?.meta?.total || 0}
              onPageChange={handlePaginationChange}
            />
          </div>
        ) : (
          ""
        )}
        {isMyClientsLoading || isMyClientsFetching ? (
          <div className="w-full gap-x-2 flex justify-center items-center h-[200px]">
            <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
            <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
          </div>
        ) : (
          ""
        )}
        {!isMyClientsLoading && !isMyClientsFetching && clients?.length < 1 ? (
          <Empty
            title="No Client Found"
            description="No client found. Create client here."
            actionText="Create Client"
            actionPath="/clients/new"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ClientManagementPage;
