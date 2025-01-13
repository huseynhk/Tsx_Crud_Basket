import { useGlobalContext } from "../../context/GlobalContext";
import { GlobalProps } from "../../interfaces/data";
import Layout from "../layout/Layout";
import { ROUTER } from "../../constant/Router";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan, FaPen } from "react-icons/fa6";
import DeleteUser from "./DeleteUser";

const User = () => {
  const { loggedInUser, openDeleteModal } = useGlobalContext() as GlobalProps;
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center pt-[5vh]">
        {loggedInUser && (
          <>
            <h1 className="text-stone-200 font-bold text-3xl tracking-wide pb-5">
              {loggedInUser.name}
            </h1>
            <div className="w-4/12 text-stone-300 text-center text-lg">
              <img
                className="w-full h-[300px] object-cover rounded-t-lg"
                src={loggedInUser.image}
                alt={loggedInUser.name}
              />

              <div className="bg-gray-950 py-4 rounded-b-lg">
                <h2 className="font-semibold">Name: {loggedInUser.name}</h2>
                <p className="py-2">Email: {loggedInUser.email}</p>
                <address>Address: {loggedInUser.address}</address>
                <p className="py-2">Phone: {loggedInUser.phone}</p>

                <div>
                  <button
                    className="px-7 py-2 bg-blue-700 rounded-md hover:opacity-75 transition-all duration-700"
                    onClick={() =>
                      navigate(`${ROUTER.UserEdit}/${loggedInUser.id}`)
                    }
                  >
                    <FaPen size={20} />
                  </button>
                  <button
                    className="px-7 py-2 ml-2 bg-red-700 rounded-md hover:opacity-75 transition-all duration-700"
                    onClick={() => openDeleteModal(loggedInUser)}
                  >
                    <FaRegTrashCan size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <DeleteUser />
    </Layout>
  );
};

export default User;
