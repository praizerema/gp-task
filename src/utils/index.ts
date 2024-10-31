import {toast} from "react-toastify";

/**This is used to forcefully clear a users data from session and local storage and optionally push them to the login screen */
export const _clearData = ( {pushToLogin = true} ) => {
  if (typeof window !== "undefined") {
    globalThis?.localStorage?.clear();
    globalThis?.sessionStorage?.clear();
    if (pushToLogin) {
      window.location.href = "/login";
    }
    return false;
  }
};

export const _getToken = () => {
  const token = globalThis?.localStorage?.getItem("token");
  const refreshToken = globalThis?.localStorage?.getItem("refresh_token");

  if (!token && !refreshToken) return false;

  return token;
};

export const _getUser = () => {
  // if (typeof window !== undefined) {
    const stringifiedUser = globalThis?.localStorage?.getItem("user");
    const localUser = stringifiedUser && JSON.parse(stringifiedUser);
    const user = _isAnEmptyObject(localUser) ? false : localUser;
    return user;
  // }
};
export const _isUserLoggedIn = () => {
  const user = _getUser();
  if (!_isAnEmptyObject(user) && _getToken()) {
    return true;
  }
  return false;
};

export const _getLocalUser = () => {
  if (typeof window !== "undefined") {
    const stringifiedUser = globalThis?.localStorage?.getItem("user");
    const localUser = stringifiedUser && JSON.parse(stringifiedUser);
    const user = _isAnEmptyObject(localUser) ? null : localUser;
    return user;
  }
};
export const _isAnEmptyObject = (obj: object): boolean => {
  return (obj && typeof obj === 'object') && Object.keys(obj).length === 0;
};

export const _getUserRole = (user: { role_slug: string; }) => {
  let role = user?.role_slug.toLowerCase();
  role = role?.replace(/-/g, " ");
  return role;
};

export const showToast = (message: string, type: string) => {
  switch (type) {
    case "success":
      toast.success(message, { position: "top-right", autoClose: 5000 });
      break;
    case "info":
      toast.info(message, { position: "top-right", autoClose: 10000 });
      break;
    case "loading":
      toast.loading(message, { position: "top-right", autoClose: 10000 });
      break;
    case "warn":
      toast.warn(message, { position: "top-right", autoClose: 10000 });
      break;
    case "error":
      toast.error(message, { position: "top-right", autoClose: 15000 });
      break;

    default:
      toast.info(message, { position: "top-right", autoClose: 10000 });
      break;
  }
};

