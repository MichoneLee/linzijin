<template>
  <div class="flight-item">
    <div @click="handleShow">
      <!-- 显示机票信息 -->
      <el-row class="flight-info" type="flex" align="middle">
        <el-col :span="6">
          <span>{{data.airline_name}}</span> {{data.flight_no}}
        </el-col>

        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}} {{data.org_airport_quay}}</span>
            </el-col>

            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>

            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}} {{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{data.base_price / 2}}</span>起
        </el-col>
      </el-row>
    </div>

    <div class="flight-recommend" v-if="isShow">
      <!-- 隐藏的座位列表信息 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>

        <el-col :span="20">
          <!-- 需要展示多个的作为列表 需要循环 -->
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell"
          v-for="(item, index) in data.seat_infos" :key="index">
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span> | {{item.supplierName}}
            </el-col>

            <el-col :span="5" class="price">
              ￥{{item.org_settle_price}}
            </el-col>

            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">
                选定
              </el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

  data(){
    return {
      isShow: false
    }
  },

  props: {
    // 数据
    data: {
      // 表示接受的类型必须是对象
      type: Object,
      // 默认是空数组
      default: function(){
        return {}
      }
    }
  },

  computed: {
    rankTime(){
      // 到达时间
      const arr = this.data.arr_time.split(':');

      // 出发时间
      const dep = this.data.dep_time.split(':');

      if(arr[0]<dep[0]){
        arr[0] += 24;
      }

      const countMin = (arr[0]*60 + +arr[1]) - (dep[0]*60 + +dep[1]);

      const hours = Math.floor(countMin / 60); // 向下取整
      const min = countMin % 60; // 取余
      return `${hours}时${min}分钟`;
    }
  },

  methods: {
    // 切换隐藏座位信息
    handleShow(){
      this.isShow = !this.isShow;
    }
  }
}
</script>

<style lang="less" scoped>
.flight-item{
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.flight-info{
  padding: 15px;
  cursor: pointer;
}

.flight-info div:first-child, .flight-info div:last-child{
  text-align: center;
}

.flight-info-center{
  padding: 0 30px;
  text-align: center;
}

.flight-airport strong{
  display: block;
  font-size: 24px;
  font-weight: normal;
}

.flight-airport span{
  font-size: 12px;
  color: #ddd;
}

.flight-time span{
  display: inline-block;
  padding: 10px 0;
  border-bottom: 1px #eee solid;
  color: #999;
}

.flight-info-right .sell-price{
  font-size: 24px;
  color: orange;
  margin: 0 2px;
}

.flight-recommend{
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;
}

.flight-sell{
  border-bottom: 1px #eee solid;
  padding: 10px 0;
}

.flight-sell:last-child{
  border-bottom: none;
}

.flight-sell-left{
  font-size: 12px;
}

.flight-sell-left span{
  color: green;
}

.price{
  font-size: 20px;
  color: orange;
}

.choose-button{
  text-align: center;
  color: #666;
}

.choose-button button{
  display: block;
  width: 100%;
  margin-bottom: 5px;
}
</style>
