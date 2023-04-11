<!-- AutchanList -->
<template>
  <div class="AutchanList">
    <slot name="seach"></slot>
  </div>
</template>

<script>
export default {
  name: "AutchanList",
  props: {
    getUserInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
