import { GlobalProps, ChildrenNode, User } from "../interfaces/data";
import { createContext, useContext, FC, useState, useEffect } from "react";
import { getUsers } from "../services";

const GlobalContext = createContext<GlobalProps | undefined>(undefined);

const GlobalContextProvider: FC<ChildrenNode> = ({ children }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const [deletedUser, setDeletedUser] = useState<null>(null);

  const getUser = async () => {
    try {
      const userData = await getUsers();
      const filteredData = userData.filter(
        (user: User) => user.id > 100 && user.type === "USER"
      );
      setUsers(filteredData);
      
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);

        const matchedUser = filteredData.find(
          (user: any) => user.email == parsedUser.email
        );

        if (matchedUser) {
          setLoggedInUser(matchedUser);
        } else {
          setLoggedInUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const closeDeleteModal = () => {
    setshowDelete(false);
    setDeletedUser(null);
  };
  const openDeleteModal = (user: any) => {
    setshowDelete(true);
    setDeletedUser(user);
  };

  const contextValue: GlobalProps = {
    showPassword,
    setShowPassword,
    confirmPassword,
    setConfirmPassword,
    users,
    setUsers,
    loggedInUser,
    showDelete,
    setshowDelete,
    deletedUser,
    closeDeleteModal,
    openDeleteModal,
  };

  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = (): GlobalProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("ERROR");
  }
  return context;
};

export { GlobalContextProvider, useGlobalContext };
