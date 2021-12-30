// custom-tab-bar/index.js
Component({

    data: {
        active: 0,
        "list": [{
            "pagePath": "/pages/index/index",
            "text": "查询订单",
            "iconPath":"search",
            "icon-active":"search"
        },
        {
            "pagePath": "/pages/admin/admin",
            "text": "管理订单",
            "iconPath":"home-o",
            "icon-active":"home-o"
        }]
    },
    methods:{
        onChange(e){
            //红色点击状态
            let index = e.detail;
            this.setData({
                active:index
            });
            //跳转到点击的界面 需要在被点击的界面写getTabBar方法建立索引onShow
            wx.switchTab({
              url: this.data.list[index].pagePath,
            })
        }
    }
    
})