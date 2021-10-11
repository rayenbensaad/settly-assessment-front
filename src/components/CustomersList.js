import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { useDispatch, useSelector } from 'react-redux'
import { listCustomers, deleteCustomer, removeAllCustomer, search } from '../redux/actions/customer'
import CustomerService from '../services/customer'
import { Redirect } from 'react-router-dom';

const CustomersList = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [searchCustomer, setSearchCustomer] = useState("");
  const customersRef = useRef();
  let { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch()
  let isFiltered = false;
  let filtredUsers = []

  customersRef.current = customers;



  useEffect(() => {
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    dispatch(listCustomers())

  }, []);

  const onChangeSearchTitle = (e) => {
    const searchCustomer = e.target.value;
    setSearchCustomer(searchCustomer);
    dispatch(search(e.target.value))

  };

  const findBy = () => {
    dispatch(search(searchCustomer))

  };


  const removeAllCustomers = () => {
    dispatch(removeAllCustomer())

  };



  const openCustomer = (rowIndex) => {
    const id = customersRef.current[rowIndex].id;
     props.history.push("/customers/" + id);
  };

  const removeCustomer = (rowIndex) => {
    const id = customersRef.current[rowIndex].id;
    dispatch(deleteCustomer(id))

  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",

      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span  style={{marginRight: 20}} onClick={() => openCustomer(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => removeCustomer(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: isFiltered ? filtredUsers : customers
  });

  return (
    
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search .."
            value={searchCustomer}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">

          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllCustomers}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default CustomersList;
