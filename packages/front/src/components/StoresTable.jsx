import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { fetchAllStores } from "../features/stores/storesAction";

const StoresTable = () => {
  const { stores, isLoading, error } = useSelector((state) => {
    return state.stores;
  });

  const [pagination, setPagination] = useState({
    size: stores.size || 5,
    currentPage: stores.currentPage || 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllStores({
        size: pagination.size,
        page: pagination.currentPage + 1,
      })
    );
  }, [pagination.currentPage, pagination.size]);

  const columns = [
    {
      field: "logoIcon",
      headerName: "Logo",
      width: 150,
      renderCell: (params) => (
        <img className="w-16 rounded-md" src={params.row.logo} />
      ),
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
  ];

  return (
    <div className="flex h-full">
      {/* {isLoading && <div>Loading...</div>} */}
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : stores.data && stores.data.length > 0 ? (
        <div className="w-full h-[400px]">
          <DataGrid
            rows={stores.data}
            columns={columns}
            page={pagination.currentPage}
            pageSize={pagination.size}
            rowsPerPageOptions={[5, 10, 15]}
            paginationMode="server"
            loading={isLoading}
            rowCount={stores.count}
            onPageChange={(params) => {
              setPagination((pagination) => ({
                ...pagination,
                currentPage: params.page,
              }));
            }}
            onPageSizeChange={(params) => {
              setPagination((pagination) => ({
                ...pagination,
                size: params.pageSize,
              }));
            }}
          />
        </div>
      ) : (
        <div className="my-4 text-lg font-medium text-gray-300">
          It seems there are no stores yes
        </div>
      )}
    </div>
  );
};

export default StoresTable;
