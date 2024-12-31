import axios from "@/utils/request";
/**
 * 修改密码
 * @param {*} data
 * @returns
 */
export function updatepassword(data: updatepassword) {
  return axios.post("/admin/updatepassword", data);
}

interface updatepassword {
  oldpassword: string;
  password: string;
  repassword: string;
}
