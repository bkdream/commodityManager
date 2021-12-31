const db = wx.cloud.database().collection("shopmessage");
Page({
    data:{

    },
    onShow(e){
        this.getTabBar().setData({
          active:0,
        })
      },
      //主页右上角扫一扫查询功能
      onClickscanIcon(e){
        var _this = this;
        wx.scanCode({
          onlyFromCamera: true,
          success(res){
              db.where({
                commodityId:res.result,
              }).get({
                success(res){
                  if(res.data.length == 0){
                    wx.showToast({
                      title: '无此条商品信息',
                      icon:'none',
                      duration:2000
                    });
                    setTimeout(() => {
                      wx.redirectTo({
                        url: '/pages/index/index',
                      })
                  }, 2000);
                  }else{
                    _this.setData({
                      commodityMessage:res.data,
                    })
                  }
                  
                }
              })
          }
        })
    },
    deleteCommodity(e){
      var fileList = [];
      fileList.push(e.currentTarget.dataset.commodityimg)
      db.where({
        commodityId:e.currentTarget.dataset.commodityid
      }).remove({
        success(res){
          wx.showToast({
            title: '删除成功',
            icon:'success',
            duration:2000,
          })
        }
      });
      wx.cloud.deleteFile({
        fileList:fileList,
        success(res){
          console.log(res)
        }
      })
    }
})