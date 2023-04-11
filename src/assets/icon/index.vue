<template>
  <span>
    <i v-if="show" :class="iconName" />
    <svg v-else :class="svgClass">
      <use :xlink:href="iconName" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    icon: {
      type: String,
      // required: true,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    iconName() {
      if (this.icon.indexOf("el-icon") != -1) {
        return this.icon;
      } else if (this.icon.indexOf("svg-icon-") != -1) {
        return `#icon-${this.icon.slice(9)}`;
      }
      return `#icon-${this.icon}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
    show() {
      if (this.icon.indexOf("el-icon") != -1) {
        return true;
      }
      return false;
    },
  },
  watch: {},
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
i{
  vertical-align: text-bottom !important;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
