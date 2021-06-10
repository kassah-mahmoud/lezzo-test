import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStore } from "../features/stores/storesAction";
import Modal from "./shared/Modal";
import { Button } from "@material-ui/core";
import AddStore from "./AddStore";

const SingleStore = ({ storeId }) => {
  const { store, isLoading, error } = useSelector((state) => {
    return state.store;
  });

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleStore(storeId));
  }, [storeId]);

  return (
    <>
      <Modal
        title="Create New Category"
        open={open}
        handleClose={handleCloseModal}
      >
        {/* <AddStore onSuccess={fetchSingleStore.bind(null, storeId)} /> */}
        Add Category
      </Modal>
      <div className="flex h-[600px]">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : store ? (
          <div className="w-full h-full">
            <div className="w-full flex py-2 justify-start">
              <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
              >
                Add New Category
              </Button>
            </div>
            <div className="w-full mt-5 h-[70%]">
              <div className="flex items-center space-x-10">
                <img
                  className="w-60 rounded-md"
                  src={store.logo && `/${store.logo}`}
                  alt=""
                />

                <div className="text-3xl font-bold">{store.name}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-4 text-lg font-medium text-gray-300">
            Not Found
          </div>
        )}
      </div>
    </>
  );
};

export default SingleStore;
