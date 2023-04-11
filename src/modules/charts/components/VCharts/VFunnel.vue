<!-- 漏斗图 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">漏斗图</span>
      <div class="mg-top">
        <ve-funnel :data="funnelData" height="370px" :settings="funnelSettings"></ve-funnel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funnelSettings: {
        sequence: ["微信", "支付宝", "余额"], // 顺序
        itemStyle: { opacity: 0.9 }, // 透明度
        label: { formatter: "{b}({c}%)" },
      },
      funnelData: {
        columns: ["name", "proportion"],
        rows: [
          { name: "支付宝", proportion: 35 },
          { name: "微信", proportion: 39 },
          { name: "余额", proportion: 26 },
        ],
      },
    };
  },
};
</script>
