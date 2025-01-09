(function(){
    const { ElMessage, ElMessageBox } = ElementPlus;
    window.CURD = {
        app: null,
        queryApi: null,
        addApi: null,
        editApi: null,
        delApi: null,
    
        init:(app, searchApi, addApi, editApi, delApi)=>{
            CURD.app = app;
            CURD.queryApi = searchApi;
            CURD.addApi = addApi;
            CURD.editApi = editApi;
            CURD.delApi = delApi;
        },
    
        query:()=>{
            
            const params = {
                page: CURD.app.pageInfo.page,
                limit: CURD.app.pageInfo.limit,
                ...CURD.app.queryForm
            }
            
            CURD.queryApi(params).then(res=>{
                CURD.app.pageInfo.total = res.data.total;
                CURD.app.tableData = res.data.rows;
            })
        },
    
        add:(data)=>{
            if (typeof data=='undefined'){
                CURD.addApi(CURD.app.formData).then(res=>{
                    ElMessage.success("添加成功")
                    CURD.app.dialogVisible = false;
                    CURD.query();
                })
            }else{
                CURD.addApi(data).then(res=>{
                    ElMessage.success("添加成功")
                    CURD.app.dialogVisible = false;
                    CURD.query();
                })
            }
    
        },
    
        edit:(data)=>{
            if (typeof data=='undefined'){
                CURD.editApi(CURD.app.formData).then(res=>{
                    ElMessage.success("编辑成功")
                    CURD.app.dialogVisible = false;
                    CURD.query();
                })
            }else{
                CURD.editApi(data).then(res=>{
                    ElMessage.success("编辑成功")
                    CURD.app.dialogVisible = false;
                    CURD.query();
                })
            }
    
        },
    
        del:(id)=>{
            ElMessageBox.confirm("您是否确认删除选中的记录么？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(res=>{
                CURD.delApi(id).then(res=>{
                    ElMessage.success("删除成功")
                    CURD.query();
                })
    
            }).catch((err)=>{});
        }
    }
})(window);
