import axios from "@/utils/request";

export function login(data: login | undefined) {
  return axios.post("/admin/login", data);
}

/**
 *
 * @returns 获取用户信息
 */
export function getInfo() {
  return axios.post("/admin/getinfo");
}
/**
 *
 * @returns 退出
 */
export function logout() {
  return axios.post("/admin/logout");
}

interface login {
  username: string;
  password: string;
}
