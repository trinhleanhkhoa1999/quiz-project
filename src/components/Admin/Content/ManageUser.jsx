import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useState, useEffect } from "react";
import TableUsers from "./TableUsers";
import {
  getAllUsers,
  getUserWithPaginate,
} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUsersPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [listUsers, setListUsers] = useState([]);

  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [dataView, setDataView] = useState({});

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const fetchListUser = async () => {
    const data = await getAllUsers();
    if (data && data.EC === 0) {
      setListUsers(data.DT);
    }
  };

  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT_USER = 3;

  const fetchListUserWithPaginate = async (page) => {
    const data = await getUserWithPaginate(page, LIMIT_USER);
    if (data && data.EC === 0) {
      console.log(data);
      setListUsers(data.DT.users);
      setPageCount(data.DT.totalPages);
    }
  };

  const handleClickBtnUpdateUser = (user) => {
    setShowModalUpdateUser(!showModalUpdateUser);
    setDataUpdate(user);
  };
  const handleClickBtnViewUser = (user) => {
    setShowModalViewUser(!showModalViewUser);
    setDataView(user);
  };

  const handleClickBtnDeleteUser = (user) => {
    setShowModalDeleteUser(!showModalDeleteUser);
    setDataDelete(user);
  };
  const restUpdateDate = () => {
    setDataUpdate({});
    setDataView({});
  };

  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);
  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(!showModalCreateUser)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUsers
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnViewUser={handleClickBtnViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
          /> */}
          <TableUsersPaginate
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnViewUser={handleClickBtnViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUser={fetchListUser}
          restUpdateDate={restUpdateDate}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataView={dataView}
          restUpdateDate={restUpdateDate}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
