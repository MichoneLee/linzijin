<template>
  <div class="filters">
    <el-row class="filters-top" type="flex" justify="space-between" align="middle">
      <el-col :span="8">
        单程:
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.newFlightTimes"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="compony" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in airSizeList"
            :key="index"
            :label="item.name"
            :value="item.type">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "",
      flightTimes: "",
      compony: "",
      airSize: "",
      airSizeList: [
        {name: "大", type: "L"},
        {name: "中", type: "M"},
        {name: "小", type: "S"}
      ]
    }
  },

  mounted() {

  },

  props: {
    data: {
      type: Object,
       default: function(){
        return {}
      }
    }

  },

  methods: {
    // 选择机场时触发
    handleAirport(value) {
      const arr = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      })
      // 触发修改机票列表的方法
      this.$emit("setDataList", arr);
    },

    // 选择时间时触发
    handleFlightTimes(value) {
      console.log('handleFlightTimes:', value);
      const from = +value.split(",")[0];
      const to = +value.split(",")[1];

      const arr = this.data.flights.filter(v => {
        // 开始时的小时数字
        const start = +v.dep_time.split(':')[0];
        return from < start && to > start;
      })
      // 触发修改机票列表的方法
      this.$emit("setDataList", arr);
    },

    // 选择航空公司时触发
    handleCompany(value) {
      const arr = this.data.flights.filter(v => {
        return v.airline_name === value;
      })
      // 触发修改机票列表的方法
      this.$emit("setDataList", arr);
    },

    // 选择机型时触发
    handleAirSize(value) {
      const arr = this.data.flights.filter(v => {
        return v.plane_size === value;
      })
      // 触发修改机票列表的方法
      this.$emit("setDataList", arr);
    },

    //撤销条件时触发
    handleFiltersCancel(value) {
      this.airport = "",
      this.flightTimes = "",
      this.compony = "",
      this.airSize = "",
      this.$emit("setDataList", this.data.flights);
    }
  }
}
</script>

<style lang="less" scoped>
  .filters{
    margin-bottom: 20px;
  }

  .filters-top div .el-select{
    margin-left: 10px;
  }

  .filter-cancel{
    margin-top: 10px;
  }
</style>
