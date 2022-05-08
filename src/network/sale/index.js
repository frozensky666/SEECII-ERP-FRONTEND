import request from "@/network/request"
const testAPI = require("@/apis")

export const getAllPurchase = config => request._get(testAPI.SALE_PURCHASE_ALL, config)
export const createPurchase = config => request._post(testAPI.SALE_PURCHASE_CREATE, config)
export const firstApproval = config => request._get(testAPI.SALE_FIRST_APPROVAL, config)
export const secondApproval = config => request._get(testAPI.SALE_SECOND_APPROVAL, config)
export const getAllCustomer = config => request._get(testAPI.SALE_CUSTOMER_QUERY, config)