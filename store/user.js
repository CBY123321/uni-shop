export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    address: {
      address: '',
      name: '',
      tel: ''
    }
  }),

  // 模块的 mutations 方法
  mutations: {
    getAddress(state, a) {
      console.log(a)
      state.address.address = a.Address
      state.address.name = a.Name
      state.address.tel = a.Tel
     uni.setStorageSync('address',JSON.stringify(state.address)) 
    },


  }
}
