export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("nip");
  localStorage.removeItem("nama");
  localStorage.removeItem("role");
  window.location.replace("/login");
};