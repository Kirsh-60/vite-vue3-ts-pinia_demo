import { useCookies } from "@vueuse/integrations/useCookies";

let cookies = useCookies();
let TokenKey = "admin-token";

// 设置token
export function setToken(token:string) {
  return cookies.set(TokenKey, token);
}

// 获取token
export function getToken() {
  return cookies.get(TokenKey);
}

// 移除token
export function removeToken() {
  return cookies.remove(TokenKey);
}
