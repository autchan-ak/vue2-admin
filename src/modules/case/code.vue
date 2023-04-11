<!-- 代码块 -->
<template>
  <div class="code">
    <el-form :model="form" inline label-width="100">
      <el-form-item label="语言类型">
        <el-select
          v-model="form.language"
          size="mini"
          filterable
          placeholder="语言类型"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可编辑">
        <el-switch v-model="form.readonly" :active-value="false" :inactive-value="true"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="codeView(true)">查 看</el-button>
      </el-form-item>
    </el-form>
    <prism-code
      class="prism-code"
      :code="form"
      @change="codeChanged"
      @close="codeView(false)"
    />
  </div>
</template>

<script>
export default {
  name: "",
  components: {
  },
  data() {
    return {
      code: "",
      codeData: {},
      form: {
        code: "",
        lineNumbers: true,
        language: "js",
        readonly: false,
        detailed: false,
      },
      options: [
        { value: "js", label: "JavaScript" },
        { value: "haml", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "json", label: "JSON" },
        { value: "sql", label: "SQL" },
        { value: "vue", label: "Vue" },
        { value: "java", label: "Java" },
        { value: "markdown", label: "md" },
        { value: "python", label: "Python" },
        { value: "php", label: "PHP" },
        { value: "c", label: "C" },
        { value: "git", label: "Git" },
        { value: "powershell", label: "Shell" },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},

  methods: {
    codeChanged(code) {
      console.log(code);
    },
    codeView(v) {
      this.$set(this.form, "detailed", v);
    },
   
  },
};
</script>

<style lang="scss" scoped>
.code {
  height: 100%;
  .prism-code {
    min-width: 100%;
    min-height: calc(100% - 100px);
  }
}
</style>
