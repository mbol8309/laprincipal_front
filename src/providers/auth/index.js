import instance from "../../api/instance";

const authProvider = {
  // authentication
  login: ({ username, password }) => {
    return instance
      .post("/auth/login", {
        username,
        password,
      })
      .then(({ data }) => {
        if (data?.data?.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...data.data,
              fullName: data?.data?.name,
            })
          );
        }
        return data?.data;
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: (params) =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  logout: () => {
    localStorage.removeItem("auth")
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, fullName, avatar } = JSON.parse(localStorage.getItem("auth"));
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
  // authorization
  getPermissions: () => Promise.resolve(/* ... */),
};

export default authProvider;
