import request from "@/network/request"
const testAPI = require("@/apis")

export const getAllSale = config => request._get(testAPI.SALE_ALL, config);
export const createSale = config => request._post(testAPI.SALE_CREATE, config);
export const firstApproval = config => request._get(testAPI.SALE_FIRST_APPROVAL, config);
export const secondApproval = config => request._get(testAPI.SALE_SECOND_APPROVAL, config);