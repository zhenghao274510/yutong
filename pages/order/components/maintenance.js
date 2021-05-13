module.exports={
	// bass:"http://192.168.0.180:8085"
	orderUserTabs:[{name: "待分配",state:0},{name: "进行中",state: 2},{name: "已完成",state: 4}],
	orderMasterTabs:[{name: "进行中",state:2},{name: "已完成",state: 4},{name: "已退单",state:3},{name: "审核",state:6}],
	orderList:[{title: '来源',answer: [{label: '保修'}, {label: '有偿'}],brand: 0}],
	souceList: [{title: '来源',answer: [{label: '直供'}, {label: '内采'}, {label: '外采'}],source: 0}],
	maintenance:[{title: '1、过滤网清洗',answer: [{label: '较脏'}, {label: '轻微'}, {label: '正常'}],brand: 0},
				{title: '2、管路部件是否锈、漏、松？',answer: [{label: '是',value:'0'}, {label: '否',value:'1'}],brand: 0},
				{title: '3、内外机运行是否正常？',answer: [{label: '是',value:'0'}, {label: '否',value:'1'}],brand: 0}],
	ordermaintenance:[{title: '1、服务人员是否及时赶到现场？',answer: [{label: '是',value:'0'}, {label: '否',value:'1'}],brand: 0}, 
				{title: '2、反馈问题是否及时解决？',answer: [{label: '是',value:'0'}, {label: '否',value:'1'}],brand: 0}, 
				{title: '3、反馈问题是否一次解决？',answer: [{label: '是',value:'0'}, {label: '否',value:'1'}],brand: 0}, 
				{title: '4、您对本次服务整体满意度评价？',answer: [{label: '1分'}, {label: '2分',},{label: '3分'}, {label: '4分'},{label: '5分'}],brand: 0}, 
				{title: '5、您对此服务是否满意？',answer: [{label: '是',value:'0'}, {label: '否',value:'1'}],brand: 0}]
}
