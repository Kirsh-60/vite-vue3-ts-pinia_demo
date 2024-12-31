import { useCookies } from "@vueuse/integrations/useCookies";
import axios from "axios";
import { toast } from "@/composables/utils";
import { createPinia } from "pinia";
import App from "@/App.vue";
import { createApp } from "vue";
import { useUserInfoStore } from "@/store";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
const service = axios.create({
  baseURL: "/api",
});
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 往hearder中添加token
    const cookie = useCookies();
    const token = cookie.get("admin-token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.request.responseType == "blob"
      ? response.data
      : response.data.data;
  },
  async function (error) {
    const msg = error.response.data.msg || "请求失败";

    if (msg == "非法token，请先登录！") {
      const store = useUserInfoStore();
      await store.logout().finally(() => location.reload());
    }

    toast(msg, "error");

    return Promise.reject(error);
  }
);
export default service;
