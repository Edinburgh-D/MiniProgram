// pages/testDB/testDB.js
const db = wx.cloud.database()

const todos = db.collection('todos');

const tododata = db.collection('todos')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddeninput: true,//聚焦弹出框
    focusVal: false,//键盘弹出框
    emptyInput: '',//输入后清空输入框
    Score: 0,
   taskdata:'',
    tododata:'',
    todos:[],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //
  onReady: function (Score) {
    // 页面渲染完成
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(2);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(186, 63, 60, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.setLineWidth(4);
    cxt_arc.setStrokeStyle('#31D608');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    // step * Math.PI - Math.PI / 2
    cxt_arc.arc(186, 63, 60, -Math.PI * 1 / 2, Score * Math.PI - Math.PI, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();
  },
  //按钮点击添加任务事件
  addTask: function () {
    this.setData({
      hiddeninput: !this.data.hiddeninput,
      focusVal: true
    });
    //console.log(this.data.list)
  },
  cancel: function () {
    this.setData({
      hiddeninput: true,

    });
  },
  //确认
  confirm(event) {
    var title = this.data.taskData;
    this.setData({
      //清空input value
      emptyInput: '',
      hiddeninput: true,
    });
    if(title){
      console.log(title)
    }
    if(this.addTodo(title)){
      if(this.queryTodos()){
		  console.log("查询成功")
      }
      
    }

  },
  inputText: function (e) {
    //console.log(e);
    this.setData({
      taskData: e.detail.value
    });
    //console.log(this.data.taskData);
  },
  //添加到数据库
  addTodo:function(title){
    db.collection('todos').add({
      data:{
        text:title,
        flag:false
      },
      success: function (res) {
        console.log("添加成功！")
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      //  console.log(res)
      }
    });
    return true;
  },
 
  queryTodos:function(){
    var that = this;
    db.collection('todos').get({
      success:function(res){
        console.log("res的"+res)
            that.setData({
              tododata : res.data
            });
        //console.log(that.data.tododata) 
      }
    })
    if(that.data.tododata){
      console.log("data的" +that.data.tododata)
    }
   // console.log("data的"+that.data.tododata)
   // console.log("数据有" + this.data.tododata)
   return true
  },
  checkboxChange: function (e) {
    //console.log(e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  catchtap(event) {
    console.log(event.target.id);
    // let checkedTodoId = event.currentTarget.id;
    // this.updateTodo(checkedTodoId);
  },
  itemBindTap(event) {
    console.log(event);
    console.log(this.data.tododata)
    // let checkedTodoId = event.currentTarget.id;
    // let todo = this.findTodo(checkedTodoId);
    // let todoJson = JSON.stringify(todo);
    // wx.navigateTo({ url: `../tododetail/tododetail?todo=${todoJson}` });
  },

   
})