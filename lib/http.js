//站点路径
// const baseUrl = "/home/david/Project/webpg/综合案例-选课/frontend/"
const baseUrl = "/"
// 接口地址
const apiBaseURL = "/prj/api"
// axios实例
const service = axios.create({
	baseURL: 'http://127.0.0.1:9090'+apiBaseURL,
	timeout: 60000,
	headers: { 
		'Content-Type': 'application/json;charset=UTF-8'
	}
})

const { ElMessage, ElMessageBox } = ElementPlus;

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		config.headers['X-Requested-With'] = 'XMLHttpRequest'
		config.headers['token'] = localStorage.getItem('token')
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	async (response) => {
		
		if (response.status !== 200) {
			return Promise.reject(new Error(response.statusText || 'Error'))
		}else if(response.data.code === 401){
			// 未登录
			setTimeout(()=>{
				localStorage.clear()
				if(parent){
					parent.location.href = baseUrl+"login.html"
				}else{
					window.location.href = baseUrl+"login.html"
				}
			},1000)
			ElementPlus.ElMessage.error("请登陆后操作")
			return Promise.reject(new Error(response.statusText || 'Error'))
		}

		const res = response.data
		if (Object.prototype.toString.call(res) === '[object Blob]') {
			// 响应文件流
			return response
		}

		if (res.code !== 200) {
			// 响应失败
			ElementPlus.ElMessage.error(res.msg)
			return Promise.reject(new Error(response.statusText || 'Error'))
		}

		// 响应成功
		return  Promise.resolve(res)
	},
	error => {
		return Promise.reject(error)
	}
)


const Api = {
	// 登录
	loginApi: (params)=>service.post("/login",params),
	// 注销
	logoutApi: ()=>service.post("/logout"),

	// 获取个人信息
	getUserInfo: ()=>service.get("/user/info"),

	// 获取菜单
    getMenuApi:()=>service.get("/menu/nav"),
	// 获取权限节点
	getPermsApi:()=>service.get("/menu/rules"),
	// 菜单树-用于选择上一级菜单（M类型）
	getMenuTreeList: ()=>service.get("/menu/treelist"),
	// 添加菜单
	addMenu: (params)=>service.post("/menu/add",params),
	// 修改菜单
	editMenu: (params)=>service.post("/menu/edit",params),
	// 删除菜单
	delMenu: (id)=>service.post("/menu/del",{"id": id}),
	// 查询菜单
	getMenuList: (params)=>service.get("/menu/list",{params:params}),

	// 添加用户
	addUser: (params)=>service.post("/user/add",params),
	// 修改用户
	editUser: (params)=>service.post("/user/edit",params),
	// 删除用户
	delUser: (id)=>service.post("/user/del",{"id": id}),
	// 查询用户
	getUserList: (params)=>service.get("/user/list",{params:params}),
	// 重置用户密码
	resetUserPwd: (id)=>service.post("/user/resetpwd?id="+id),
	// 重置自己密码
	updatePwd: (params)=>service.post("/user/updatepwd", params),
	// 重置密码
	resetUserUnlock: (id)=>service.post("/user/unlock?id="+id),
	// 批量导入用户
	importUserApiUrl: (formData)=>service.post("/user/import", formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}),

	// 部门属性选择
	getDeptTreeList: ()=>service.get("/department/treelist"),
	// 添加用户
	addDepartment: (params)=>service.post("/department/add",params),
	// 修改用户
	editDepartment: (params)=>service.post("/department/edit",params),
	// 删除用户
	delDepartment: (id)=>service.post("/department/del",{"id": id}),
	// 查询用户
	getDepartmentList: (params)=>service.get("/department/list",{params:params}),

	// 修改角色
	editRole: (params)=>service.post("/role/edit",params),
	// 查询角色
	getRoleList: (params)=>service.get("/role/list",{params:params}),

	// 课程列表
	getCourseList: (params)=>service.get("/course/list",{params:params}),
	// 添加课程
	addCourse: (params)=>service.post("/course/add",params),
	// 编辑课程
	editCourse: (params)=>service.post("/course/edit",params),
	// 删除课程
	delCourse: (id)=>service.post("/course/del",{"id": id}),
	// 修改状态
	changeCourseStatus: (params)=>service.post("/course/changestatus",params),
	// 我的课程
	getMyCourseList: (params)=>service.get("/course/my",{params:params}),
	// 可选课程
	getAvalibleCourseList: (params)=>service.get("/course/avalible",{params:params}),
	// 更新课程选课情况
	getCourseStatus: (ids)=>service.get("/course/refresh?ids="+ids.join(",")),
	// 选课和取消选课
	selectCourse: (params)=>service.post("/course/select",params),
	// 选课学生列表
	getCourseStudentsList: (courseId)=>service.get("/course/students?id="+courseId),
	// 确认学生
	confirmCourseStudent: (params)=>service.post("/course/confirm",params),

	// 学期列表
	getTermList: (params)=>service.get("/term/list",{params:params}),
	// 添加学期
	addTerm: (params)=>service.post("/term/add",params),
	// 编辑学期
	editTerm: (params)=>service.post("/term/edit",params),
	// 删除学期
	delTerm: (id)=>service.post("/term/del",{"id": id}),
	getDormitoryList: (params) => service.get('/dormitory/list', { params }),
    addDormitory: (data) => service.post('/dormitory/add', data),
    editDormitory: (data) => service.post('/dormitory/edit', data),
    delDormitory: (id) => service.delete(`/dormitory/del?id=${id}`),
	getCollegeAll: () => service.get(`/college/all`),
	getCollegeList: (params) => service.get('/college/list' , {params}),
	delCollege: (id) => service.delete(`/college/del?id=${id}`),
	getAllDept: () => service.get(`/dept/all`),
	editCollege: (data) => service.post('/college/edit', data),
	getStudentList: (params) => service.get('/student/list', { params }),
	getNoUseAll: () => service.get(`/bed/all`),
	editStudent: (data) => service.post(`/bed/edit`, data ),
	delStudent: (id) => service.delete(`/bed/del?id=${id}`),
	addCollege: (data) => service.post('/college/add', data),
	getAllStudentCourse: (id) => service.get(`/getAllStudentCourse/all?id=${id}`),
	getAllStudentByCourseId: (id) => service.get(`/getAllStudentByCourseId/all?id=${id}`),
	insertAttendance:(params) => service.post("/insertAttendance/edit",params),
	getAttendanceSummary:(id) => service.get(`/getAttendanceSummary/all?id=${id}`),
}


const HasAuth = (name) => {
  if (name === "*") {
    return true;
  }
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const index = permissions.findIndex(item => {
    if (item.path === name) {
      return true;
    }
  });
  return index>=0;
};