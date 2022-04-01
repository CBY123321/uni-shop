export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),

  }),

  // 模块的 mutations 方法
  mutations: {
    getCart(state, good) {
      const a = state.cart.find((x) => x.id == good.id)
      if (!a) {
        state.cart.push(good)
      } else {
        a.count++
      }
     this.commit('cart/keepCart')
    },
    keepCart(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
  },

  // 模块的 getters 属性
  getters: {
    getCount(state) {
      let c = 0
      state.cart.forEach(x => c += x.count)
      return c
    }
  },
}
