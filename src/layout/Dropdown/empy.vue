<template>
    <div class="empy">
        <div class="empy-box">
            <svg-icon :icon="type" class="empy-icon" />
        </div>
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type: String,
            default: 'news',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['flag', 'news','horn'].indexOf(value) !== -1
            }
        },
        text:{
            type: String,
            default: '你没有新的消息'
        },
    },
}
</script>

<style scoped>
.empy{
    width: 100%;
    padding-top: 50px;
    text-align: center;
    box-sizing: border-box;
}
.empy-box{
    width: 40px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.empy-icon{
    fill: currentColor;
    color: #DAE0E5;
    width: 85px;
}
.empy p{
    color: #8C8C8C;
    font-size: 14px;
    width: 100%;
    user-select: none;
}
</style>