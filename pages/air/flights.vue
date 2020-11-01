<template>
  <section class="flights-container">
    <el-row type="flex" justify="space-between">

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>

        </div>

        <!-- 航班头部布局 -->
        <FlightsListHead/>

        <!-- 航班信息 -->
        <div>
          <FlightsItem
          v-for="(item, index) in dataList" :key="index" :data="item"/>

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>

        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="flights-aside">
        <!-- 侧边栏组件 -->
      </div>

    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '../../components/air/flightsListHead'
import FlightsItem from '../../components/air/flightsItem'

export default {
  data(){
    return {
      // flightsData 航班的总数据
      flightsData: {},
      pageIndex: 1, // 默认当前页
      pageSize: 5, // 默认条数
      total: 0, // 默认总条数
      dataList: [] // 存当前页的数据
    }
  },

  components: {
    FlightsListHead,
    FlightsItem
  },

  methods: {
    // 切换条数时触发
    handleSizeChange(value){
      this.pageSize = value;
      this.setDataList();
    },

    // 切换页数时触发
    handleCurrentChange(value){
      this.pageIndex = value;

      this.setDataList();
    },

    // 设置机票列表的数据
    setDataList() {
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize
      )
    }

  },

  mounted(){
    console.log('flightsQuery:', this.$route.query);

    // 请求机票列表
    this.$axios({
      url: "http://157.122.54.189:9095/airs",
      params: this.$route.query
    }).then(res => {
      console.log('flights的res.data', res.data);
      this.flightsData = res.data;

      this.dataList = this.flightsData.flights.slice(0,5);

      this.total = this.flightsData.total;
    })
  }

}
</script>

<style lang="less" scoped>
.flights-container{
  width: 1000px;
  margin: 20px auto;
}

.flights-content{
  width: 745px;
  font-size: 14px;
}

.flights-aside{
  width: 240px;
}
</style>
