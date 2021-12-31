const db = wx.cloud.database().collection("shopmessage");
Page({
    data:{
        fileList:[]
    },
    //表单提交结果
    setCommodity(event){
        var fileList = this.data.fileList;
        let extName = fileList[0].url.split(".").pop();
        let cloudPath = new Date().getTime()+'.'+extName;
        wx.cloud.uploadFile({
            cloudPath:'message/'+cloudPath,
            filePath:fileList[0].url,
            success(res){
                var fileID = res.fileID;
                db.add({
                    data:{
                        commodityId:event.detail.value.commodityId,//商品编号
                        commodityName:event.detail.value.commodityName,//商品姓名
                        commodityMoney:event.detail.value.commodityMoney,//商品价格
                        commodityRemark:event.detail.value.commodityRemark,//商品备注
                        commodityImg:fileID
                    },
                    success(res){
                        wx.showToast({
                          title: '添加成功',
                          icon:'success',
                          duration:2000,
                        })
                        setTimeout(() => {
                            wx.redirectTo({
                              url: '/pages/addOne/addOne',
                            })
                        }, 2000);
                        
                    }
                })
            }
        })
        

    },
    //扫码图标按钮
    onClickscanIcon(e){
        var _this = this;
        wx.scanCode({
          onlyFromCamera: true,
          success(res){
              _this.setData({
                commodityId:res.result
              })
          }
        })
    },
    //在界面中显示图片
    afterRead(event){
        var index = event.detail.index;
        var imgurl = event.detail.file.url;
        var fileList = this.data.fileList;
        fileList.splice(index,0,{
            url:imgurl,
            name:"图1"
        })
        this.setData({
            fileList:fileList
        })
    },
    //删除已经添加的图片
    deleteimg(event){
        var index = event.detail.index;
        var fileList = this.data.fileList;
        fileList.splice(index,1);
        this.setData({
            fileList:fileList,
        })
    }
    
})