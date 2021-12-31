const db = wx.cloud.database().collection("shopmessage");
Page({
    data:{

    },
    onShow(e){
        this.getTabBar().setData({
          active:0,
        })
      },
      onClickscanIcon(e){
        var _this = this;
        wx.scanCode({
          onlyFromCamera: true,
          success(res){
              
          }
        })
    }
})