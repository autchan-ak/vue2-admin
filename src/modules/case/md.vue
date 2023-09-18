<!-- md编辑器 -->
<template>
    <div>
        <h1>预览模式</h1>
        <MdEditor v-model="content" mode="preview" height="250" />
        <h1>编辑与预览模式</h1>
        <MdEditor v-model="content" mode="editable" :height="300" />
        <h1>纯编辑模式</h1>
        <MdEditor v-model="content" mode="edit" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            html:"<h1>啥也不是</h1>",
            content:`#  markdown 编辑器 \n\n -  使用 v-md-editor \n\n[查看文档](https://ckang1229.gitee.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D)`,
        };
    },
    computed: {

    },
    watch: {

    },
    created() {
      
    },
    mounted() {
        
    },

    methods: {
     
    }
};
</script>

<style lang="scss" scoped>

</style>
