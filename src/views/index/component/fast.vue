<template>
    <div class="Fast">
        <div class="Fast-list">
            <div class="Fast-list-top">
                <svg-icon icon="ship" class="Fast-list-top-icon icon-ship" />
            </div>
            <div class="Fast-list-bottom">
                待发货
            </div>
        </div>
        <div class="Fast-list">
            <div class="Fast-list-top">
                <svg-icon icon="refund" class="Fast-list-top-icon icon-refund" />
            </div>
            <div class="Fast-list-bottom">
                待退款
            </div>
        </div>
        <div class="Fast-list">
            <div class="Fast-list-top">
                <svg-icon icon="shelves" class="Fast-list-top-icon icon-shelves" />
            </div>
            <div class="Fast-list-bottom">
                商品上架
            </div>
        </div>
        <div class="Fast-list">
            <div class="Fast-list-top">
                <svg-icon icon="feedback" class="Fast-list-top-icon icon-feedback"  />
            </div>
            <div class="Fast-list-bottom">
                意见反馈
            </div>
        </div>
        <div class="Fast-list">
            <div class="Fast-list-top">
                <svg-icon icon="finance" class="Fast-list-top-icon icon-finance" />
            </div>
            <div class="Fast-list-bottom">
                财务
            </div>
        </div>
        <div class="Fast-list">
            <div class="Fast-list-top">
                <svg-icon icon="analysis" class="Fast-list-top-icon icon-analysis" />
            </div>
            <div class="Fast-list-bottom">
                数据分析
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"FastBox",
}
</script>
<style scoped>
.Fast{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.Fast-list{
    width: 33%;
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    margin-bottom: 15px;
    border-radius: 5px;
}
.Fast-list:hover{
    background: #16B3FD;
    color: #ffffff;

}
.Fast-list:hover .Fast-list-top-icon{
    color: #ffffff !important;
}
.Fast-list:hover .Fast-list-bottom{
    color: #ffffff !important;
}
.Fast-list-top{
    width: 100%;
    display: flex;
    justify-content: center;
}
.Fast-list-top-icon{
    width: 20px;
    height: 20px;
    fill: currentColor;
}
.Fast-list-bottom{
    font-size: 12px;
    color: #3F495E;
    text-align: center;
}
.icon-ship{
    color: #18FD6C;
}
.icon-refund{
    color: #F85E1F;
}
.icon-feedback{
    font-weight: bolder;
    color: #FE4B60;
}
.icon-shelves{
    color: #18A2FD;
}
.icon-finance{
   color: #09F8BA;   
}
.icon-analysis{
    color: #952BFD;
}
</style>