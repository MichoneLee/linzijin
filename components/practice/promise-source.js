class CustomPromise {

  constructor(handleFunc) {
    this.status = 'pending'
    this.value = undefined
    this.fulfilledList = []
    this.rejectedList = []

    handleFunc(this.triggerResolve.bind(this), this.triggerReject.bind(this))
}

  triggerResolve(val) {
    // 当前的 promise 状态已经变成了 resolve, 要执行后续的操作
    setTimeout(() => {
      if (this.status !== 'pending') return

      if (val instanceof CustomPromise) {
          val.then(
              value => {},
              err => {}
          )
      } else {
          // resolve 方法传入的是普通值
          this.status = 'fulfilled'
          this.value = val
          this.triggerFulfilled(val)
      }
  }, 0)
  }

  triggerFulfilled(val) {
    this.fulfilledList.forEach(item => item(val))
    this.fulfilledList = []
  }

  triggerReject() {

  }

  then(onFulfilled, onRejected) {
    const {value, status} = this

    return new CustomPromise((onNextFulfilled, onNextRejected) => {

        function onFinalFulfilled(val) {
            if (typeof onFulfilled !== 'function') {
                onNextFulfilled(val)
            } else {
                const res = onFulfilled(val)
                if (res instanceof CustomPromise) {
                    res.then(onNextFulfilled, onNextRejected)
                } else {
                    onNextFulfilled(res)
                }
            }
        }

        function onFinalRejected(error) {
            if (typeof onRejected !== 'function') {
                onNextRejected(error)
            } else {
                let res = null
                try {
                    res = onRejected(error)
                } catch (e) {
                    onNextRejected(e)
                }

                if (res instanceof CustomPromise) {
                    res.then(onNextFulfilled, onNextRejected)
                } else {
                    onFulfilled(res)
                }
            }
        }

        switch (status) {
            case 'pending': {
                this.fulfilledList.push(onFinalFulfilled)
                this.rejectedList.push(onFinalRejected)
                break
            }
            case 'fulfilled': {
                onFinalFulfilled(value)
                break
            }
        }
    })
  }

  catch() {
    return this.then(null, onRejected)
  }

  static resolve(value) {
    if ( value instanceof CustomPromise ) {
      return new CustomPromise(resolve => resolve(value))
    }
  }

  static reject() {

  }

  static all(list) {
    return new CustomPromise((resolve, reject) => {
      let count = 0
      const values = []

      list.forEach((CustomPromiseInstance, i) => {
        CustomPromise.resolve(CustomPromiseInstance)
          .then()
      })

      for (const [i, CustomPromiseInstance] of list.entries()) {
          CustomPromiseInstance
              .then(
                  res => {
                      values[i] = res
                      count++
                      if (count === list.length) resolve(values)
                  },
                  err => {
                      reject(err)
                  }
              )
      }
  })
  }

  static race(list) {
    return new CustomPromise((resolve, reject) => {
      list.forEach(item => {
        CustomPromise.resolve(item)
          .then(
            res => {
              resolve(res)
            },
            err => {
              reject(err)
            }
          )
      })
    })
  }

}

// const promise1 = new CustomPromise(function(resolve, reject){
//   resolve('hello world');
// })



// promise1
//   .then(function(str){console.log(str); return str})
//   .then(function(str2){console.log('resolve2', str2)})

const promise = function(time) {
  return new CustomPromise(function(resolve,reject){
    return setTimeout(resolve, time);
  })
}

CustomPromise.all([promise(1000), promise(2000)])
  .then(function(){
    console.log('all promise resolved');
  })


