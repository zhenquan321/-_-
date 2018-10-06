<template>
    <div class="ShoppingCart" ref="singer">
        <div class="ShoppingCart">
            <div class="noGoods">
                <div class="ShoppingCartIcon">
                    <i class="iconfont">&#xe656;</i>
                </div>
               
                <p>您的购物车空空如也~</p>
                <router-link tag="div" class="tab-item" to="/main/singer">
                    <mu-raised-button  label="去逛逛" class="demo-raised-button" backgroundColor="#44c050"/>
                </router-link>
            </div>
            <div class="goodsLsits">
                <div class="header"></div>
                <div class="list">
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
            
        </keep-alive>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    components: {

    },
    created() {
    },
    methods: {

    }
};
</script>

<style lang="scss">
@import '~@/assets/scss/variable.scss';
.ShoppingCart{
    background-color: $color-background;
    min-height: calc(100vh - 88px);
}
.noGoods{
    text-align:center;
    p{
        color: #999;
        font-size: 16px;
        margin: 30px 0;
    }
}
.ShoppingCartIcon{
    margin-top: 90px;
    display: inline-block;
    text-align: center;
    width: 160px;
    height: 160px;
    background-color: #fff;
    border-radius: 50%;
    padding-top: 11px;
    box-shadow:0 0px 10px #e2e4da;
    i{
        font-size: 100px;
        color: #999;

    }
}
</style>
