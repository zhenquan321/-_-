<template>
   <div class="tab">
        <router-link tag="div" class="tab-item demo-flat-button" to="/main/recommend">
            <span class="tab-link">
                <i class="iconfont">&#xe67c;</i><br />首页
            </span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/main/singer">
            <span class="tab-link"><i class="iconfont">&#xe96f;</i><br />分类</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/main/rank">
            <span class="tab-link"><i class="iconfont">&#xe678;</i><br />购物车</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/main/mine">
            <span class="tab-link"><i class="iconfont">&#xe687;</i><br />我的</span>
        </router-link>
    </div>
</template>
<script>
export default {

};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable';

.tab {
    position: relative;
    // z-index: 1;
    // top: 44px;
    // left: 0;
    // right: 0;
    display: flex;
    height: 50px;
    line-height: 16px;
    font-size: $font-size-medium;
    background-color: #fff;
    color:$font-color-999;
    box-shadow: 0 -1px 5px rgba(66, 66, 66, 0.1);
    padding-top: 10px;
}
.tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
        padding-bottom: 5px;
        color: $font-color-999;
        font-size: 12px;
        i{
            font-size: 22px;
        }
    }

    &.router-link-active {
        .tab-link {
            color: $theme-color;
            // border-bottom: 2px solid $theme-color;
        }
    }
}
</style>
