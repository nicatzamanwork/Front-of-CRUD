import { Modal } from "@mui/material";
import React, { useState } from "react";
import { BASE_URL, network } from "../network/axiosInstance";
import { useQuery } from "react-query";

import { toast } from "react-toastify";

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({ name: "", description: "" });
  const [forModal, setForModal] = useState("");

  const { data, isLoading, refetch } = useQuery("products", async () => {
    return network.getAll(BASE_URL).then((res) => {
      return res;
    });
  });

  const deleteItem = (id) => {
    network.deleteItem(BASE_URL, id).then(() => refetch());
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitForm = (event, id) => {
    event.preventDefault();
    const { name, description } = values;
    if (name.trim().length === 0 || description.trim().length === 0) {
      toast.warn("Please fill in all the inputs");
    } else {
      if (forModal === "Add") {
        network.addItem(BASE_URL, values).then(() => refetch());
      } else {
        network.updateItem(BASE_URL, id, values).then(() => refetch());
      }

      setValues({ name: "", description: "" });
      toast.success("Category is ready");
      handleClose();
    }
  };

  return (
    <>
      <>
        <div className="header-page">
          <h1 className="all-data-list">Products</h1>
          <button
            className="add-item"
            onClick={() => {
              handleOpen();
              setForModal("Add");
              setValues({ name: "", description: "" });
            }}
          >
            Add Product
          </button>
        </div>

        {data && (
          <table className="w3-table-all w3-centered">
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Date</td>
                <td>Update</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {React.Children.toArray(
                data.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleOpen();
                          setForModal("Update");
                          setValues({
                            name: item.name,
                            description: item.description,
                            _id: item._id,
                          });
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteItem(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </>
      : (<h1 className="not-list">Product list is empty</h1>)
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="box-modal">
          <form onSubmit={(event) => submitForm(event, values._id)}>
            <input
              name="name"
              required
              value={values.name}
              onChange={(e) => handleChange(e)}
              placeholder="Name"
            />
            <input
              name="description"
              required
              value={values.description}
              onChange={(e) => handleChange(e)}
              placeholder="Description"
            />
            <button> {forModal === "Add" ? "Add" : "Update"}</button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Home;
