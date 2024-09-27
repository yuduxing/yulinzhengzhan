import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "../constants/status";
import { BaseUrl } from "../constants/config";
import { logError } from "../utils/error";

export default {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    let contentType = "application/json";
    data = {
      ...data,
      timestamp: new Date().getTime(),
    };
    const requestUrl = url.indexOf("http") !== -1 ? url : BaseUrl + url;
    console.log("requestUrl:" + requestUrl)

    return new Promise((resolve, reject) => {
      Taro.request({
        url: requestUrl,
        data: data,
        method: method,
        header: {
          "content-type": contentType,
          Authorization: "Bearer " + Taro.getStorageSync("token"), // 修正拼写
        },
        success(res) {
          console.log("res", res);
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            logError("api", "请求资源不存在");
            reject(new Error("请求资源不存在"));
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            logError("api", "服务端出现了问题");
            reject(new Error("服务端出现了问题"));
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            logError("api", "没有权限访问");
            reject(new Error("没有权限访问"));
          } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
            logError("api", "请先登录");
            reject(new Error("请先登录"));
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            resolve(res.data);
          } else {
            logError("api", "未知错误" + res.statusCode);
            reject(new Error("未知错误" + res.statusCode)); // 添加错误处理
          }
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  get(url, data) {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  },
  put(url, data) {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  },
  delete(url, data) {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  },
};
