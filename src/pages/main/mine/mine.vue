<template>
    <div class="mine">
        <scroll :data="discList" class="mine-content">
            <div class="userCard">
                <!-- <div class="setting">
                    <i class="iconfont">&#xe70f;</i>
                </div> -->
                <mu-row gutter>
                    <mu-col class="left" width="25" tablet="60" desktop="15">
                        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2344988148,518557205&fm=26&gp=0.jpg"  alt="">
                    </mu-col>
                    <mu-col class="center" width="60" tablet="60" desktop="35">
                        <h4>用户名</h4>
                        <h5>ID:18468644186</h5>
                    </mu-col>
                    <mu-col class="right" width="15" tablet="60" desktop="35">

                    </mu-col>
                </mu-row>
            </div>
            <div class="myOrderList">
                <!-- <h2>我的订单</h2> -->
                <mu-flexbox  disableRipple>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont" >&#xe641;</i>待付款
                        </span>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont">&#xe647;</i>待发货
                        </span>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont">&#xe642;</i>待收货
                        </span>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont"  style="font-size: 23px;padding-top: 4px;">&#xe640;</i>已完成
                        </span>
                    </mu-flexbox-item>
                </mu-flexbox>

            </div>
            <div class="tabListCard">
                <mu-list>
                    <mu-list-item>
                        <mu-row gutter class="ListItem" style="border-bottom: 1px solid #EBEBEB;">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe62b;</i>
                            </mu-col>
                            <mu-col class="center" width="50" tablet="60" desktop="35">
                                伊甸卡余额
                            </mu-col>
                            <mu-col class="right" width="35" tablet="60" desktop="35" style="color:#ff5757">
                                ￥15555.52
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                    <mu-list-item disableRipple @click="enterFavoriteSongs"  >
                        <mu-row gutter class="ListItem" @click="enterHistory" style="border-bottom: 1px solid #EBEBEB;">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe662;</i>
                            </mu-col>
                            <mu-col class="center" width="75" tablet="60" desktop="35">
                                地址管理
                            </mu-col>
                            <mu-col class="right" width="10" tablet="60" desktop="35">
                                <i class="iconfont">&#xe62f;</i>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                      <mu-list-item disableRipple @click="enterFavoriteSongs"  >
                        <mu-row gutter class="ListItem" style="border-bottom: 1px solid #EBEBEB;">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe665;</i>
                            </mu-col>
                            <mu-col class="center" width="75" tablet="60" desktop="35">
                                站内消息
                            </mu-col>
                            <mu-col class="right" width="10" tablet="60" desktop="35">
                                <i class="iconfont">&#xe62f;</i>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                      <mu-list-item disableRipple @click="enterFavoriteSongs" >
                        <mu-row gutter class="ListItem"  style="border-bottom: 1px solid #EBEBEB;">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe65c;</i>
                            </mu-col>
                            <mu-col class="center" width="75" tablet="60" desktop="35">
                                授权手机号
                            </mu-col>
                            <mu-col class="right" width="10" tablet="60" desktop="35">
                                <i class="iconfont">&#xe62f;</i>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                      <mu-list-item disableRipple @click="enterFavoriteSongs">
                        <mu-row gutter class="ListItem">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe627;</i>
                            </mu-col>
                            <mu-col class="center" width="75" tablet="60" desktop="35">
                                切换商家
                            </mu-col>
                            <mu-col class="right" width="10" tablet="60" desktop="35">
                                <i class="iconfont">&#xe62f;</i>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                </mu-list>
            </div>
            <!-- <div>
                <mu-list class="option-list">
                    <mu-list-item title="最近收听" disableRipple @click="enterHistory">
                        <mu-icon slot="left" value="history" />
                    </mu-list-item>
                    <mu-list-item title="收藏歌曲" disableRipple @click="enterFavoriteSongs">
                        <mu-icon slot="left" value="favorite" />
                    </mu-list-item>
                </mu-list>
                <mu-sub-header class="title">收藏歌单</mu-sub-header>
                <ul class="list">
                    <li @click="selectItem(item)" v-for="(item, index) in favoriteListList" class="item" :key="index">
                        <div class="icon">
                            <img width="60" height="60" v-lazy="item.image" alt="discItem">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creatorName"></h2>
                            <p class="desc" v-html="item.name"></p>
                        </div>
                    </li>
                </ul>
            </div> -->
        </scroll>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import Scroll from '@/base/scroll/scroll';

export default {
    components: {
        Scroll
    },
    data() {
        return {
            discList: []
        };
    },
    computed: {
        ...mapGetters(['favoriteListList'])
    },
    methods: {
        enterHistory() {
            this.$router.push('/main/mine/history');
        },
        enterFavoriteSongs() {
            this.$router.push('/main/mine/favorite_song');
        },
        // 点击歌单进入详情
        selectItem(item) {
            this.$router.push(`/main/mine/favorite_sheet/${item.id}`);
            this.setDisc(item);
        },
        ...mapMutations({ setDisc: 'SET_DISC' })
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';
.mine {
    background-color: #f4f4f4;
    position: absolute;
    width: 100%;
    top: 44px;
    bottom: 0;
    .mine-content {
        height: 100%;
        overflow: hidden;
        .option-list,
        .title {
            background-color: #fff;
        }
    }
}
.list {
    padding-top: 15px;
    .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        margin: 0 15px 10px;
        padding: 10px;
        background-color: $color-background;
        .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
                margin-bottom: 10px;
                color: $color-text;
            }
            .desc {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: $color-text-d;
            }
        }
    }
}
.myOrderList{
    h2{
        border-bottom: 1px dashed #d8d8d8;
        padding: 8px 15px 6px;
        color: #666;
        font-weight: 600;
    }
    background-color: #fff;
    // box-shadow: $box-shadow;
    // border-radius: 8px;
    // margin: 3%;
    .tab-link{
        display: inline-block;
        width: 100%;
        text-align: center;
        color: $font-color-666;
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 10px;
        .iconfont{
            font-size: 30px;
            display: block;
            height: 36px;
            color:  $auxiliary-color;
            background: linear-gradient(135deg,  #ae9a47, #44c050);
            -webkit-background-clip: text;
            color: transparent;
        }
    }
}
.userCard{
    @include bg-image('beijing');
    background-size:100%;
    height: 144px;
    box-shadow: $box-shadow;
    padding: 30px;
    padding-top: 55px;
    .left{
        img{
            width: 100%;
            border-radius: 50%;
            border: 2px solid #fff;
        }
    }
    .center{
        h4{
            color: #fff;
            font-size: 20px;
            margin-top: 5px;
        }
        h5{
            color: rgba(255, 255, 255, 0.7);
        }
    }
    .right{
        color: rgba(255, 255, 255, 0.7);
        padding-top: 6%;
    }
}
.tabListCard{
    background-color: #fff;
    margin-top: 10px;
    // box-shadow: $box-shadow;
    // border-radius: 8px;
    // margin: 3%;
}
.mu-item{
    padding: 0px 16px !important;
}
.mu-list{
    padding: 0;
}
.ListItem{
    height: 48px;
    margin-bottom: 0px!important;
    .left{
        text-align: center;
        position: relative;
        top: 6px;
        i{
            font-size: 22px;
            color: #A2A2A2;
        }
    }
    .center{
        text-align: left;
        line-height: 46px;
        color: #666;
        margin-left: -25px;
    }
    .right{
        line-height: 46px;
        text-align: right;
        i{
            font-size: 13px;
            color: #999;
        }
    }
}
</style>
