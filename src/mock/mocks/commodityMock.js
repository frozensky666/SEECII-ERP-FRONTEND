const API = require("../../apis");

module.exports = {
	getAllCommodity: [
		API.COMMODITY,
		"get",
		{
			"code": 200,
			"msg": "",
			"data": {
				"commodity_list": [
					{
						"id": "1",
						"name": "电视机",
						"type": "小米",
						"quantity": 1300,
						"purchase_price": 4000,
						"retail_price": 6000,
						"recent_pp": 4100,
						"recent_rp": 6500,
					},
					{
						"id": "2",
						"name": "电冰箱",
						"type": "海信",
						"quantity": 1300,
						"purchase_price": 4000,
						"retail_price": 6000,
						"recent_pp": 4100,
						"recent_rp": 6500,
					},
					{
						"id": "3",
						"name": "笔记本电脑",
						"type": "MacBook",
						"quantity": 1300,
						"purchase_price": 4000,
						"retail_price": 6000,
						"recent_pp": 4100,
						"recent_rp": 6500,
					},
				]
			}
		}
	]
}