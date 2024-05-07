import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableUsersPaginate = ({
  listUsers,
  handleClickBtnViewUser,
  handleClickBtnUpdateUser,
  handleClickBtnDeleteUser,
  fetchListUserWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    setCurrentPage(+event.selected + 1);
    fetchListUserWithPaginate(+event.selected + 1);
  };
  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, idx) => {
              return (
                <tr key={`table-user ${idx + 1}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="d-flex justify-content-around justify-content-md-start  ">
                    <button
                      className="btn btn-secondary "
                      onClick={() => handleClickBtnViewUser(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdateUser(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={5}>Not found data...</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-paginate d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
};

export default TableUsersPaginate;
