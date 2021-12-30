Page({
    data:{
        fileList:[]
    },
    //表单提交结果
    setCommodity(event){
        console.log(event)
        console.log(this.data.fileList)
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