import request from "@/network/request";
const testAPI = require("@/apis")

export const getAllCommodityClassification = config => request._get(testAPI.COMMODITY_CLASSIFICATION_ALL, config);
export const getAllCommodity = config => request._get(testAPI.COMMODITY, config);