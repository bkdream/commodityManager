const db = wx.cloud.database().collection("shopmessage");
var commodityId = null;
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
            commodityId = res.result;
              db.where({
                commodityId:commodityId,
              }).get({
                success(res){
                  if(res.data.length == 0){
                    _this.setData({
                      commodityMessage:res.data,
                    })
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
      //删除云储存文件用
      var deleteList = [];
      deleteList.push(e.currentTarget.dataset.commodityimg);
      var that = this;
      db.where({
        commodityImg:e.currentTarget.dataset.commodityimg
      }).remove({
        success(res){
          wx.showToast({
            title: '删除成功',
            icon:'success',
            duration:1000,
          });
          console.log(that.data)
        }
      });
      wx.cloud.deleteFile({
        fileList:deleteList
      })
      db.where({
        commodityId:commodityId,
      }).get({
        success(res){
          that.setData({
            commodityMessage:res.data,
          })
        }
      })
    }
})