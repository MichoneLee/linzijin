
      // localStorage

      // var obj = [{name: '富婆', age: 38}, {name: '备胎', age: 18}];

      // localStorage.setItem('obj', JSON.stringify(obj));

      // var res = localStorage.getItem('obj');

      // console.log(JSON.parse(res));


      // map

      // var arr = [2,8,34,46];

      // var newArr = arr.map(function(v){
      //   return v + 1;
      // });

      // console.log(newArr);


      // filter

      // var arr = [{name: "狗蛋"}, {name: "张全蛋"}, {name: "无关人士"}];
      // // 找出name带"蛋"字
      // var newArr = arr.filter(function(v){
      //   return v.name.indexOf('蛋') > -1;
      // })
      // console.log(newArr);

      // 小明他老爸说，假设这次考试及格就给他买AJ，否则吊起来打
      // $.ajax({
      //   url: "去考试",
      //   success: function(res) {
      //     if (res >= 60) {
      //       console.log("买AJ");
      //     } else {
      //       console.log("吊起来打");
      //     }
      //   }
      // })

      // 小明他老爸说，假设这次考试及格就给他买五三，否则看鲨鱼
      // $.ajax({
      //   url: "去考试",
      //   success: function(res) {
      //     if (res >= 60) {
      //       console.log("买五三");
      //     } else {
      //       console.log("看鲨鱼");
      //     }
      //   }
      // })

      // function test(resolve,reject){
      //   $.ajax({
      //     url: "去考试",
      //     success: function(res) {
      //       if (res >= 60) {
      //         resolve();
      //       } else {
      //         reject();
      //       }
      //     }
      //   })
      // }

      // test(function(){
      //   console.log("买AJ");
      // }, function(){
      //   console.log("吊起来打");
      // })

      // Promise
      var promise = new Promise(function(resolve, reject){
        setTimeout(function(){

          var res = 61;
          if (res >= 60) {
            resolve("小明同学语文及格");
          } else {
            reject();
          }
        },2000)
      })

      var promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){

          var res = 61;
          if (res >= 60) {
            resolve("小明同学数学及格");
          } else {
            reject();
          }
        },2000)
      })

      async function test(){

        var res = await promise;
        console.log(res);

        var res2 = await promise2;
        console.log(res2);
      }

      test();




      // promise.then(function(){
      //   console.log("买AJ");
      // }).catch(function(){
      //   console.log("吊起来打");
      // })



