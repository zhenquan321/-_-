<template>
    <div class="mine">
        <scroll :data="discList" class="mine-content">
            <div class="userCard">
                <mu-row gutter>
                    <mu-col class="left" width="25" tablet="60" desktop="15">
                        <img src="http://img5.duitang.com/uploads/item/201506/14/20150614205903_85zCv.jpeg"  alt="">
                    </mu-col>
                    <mu-col class="center" width="60" tablet="60" desktop="35">
                        <h4>用户名</h4>
                        <h5>ID:18468644186</h5>
                    </mu-col>
                    <mu-col class="right" width="15" tablet="60" desktop="35">
                        <i class="iconfont">&#xe801;</i>
                    </mu-col>
                </mu-row>
            </div>
            <div class="myOrderList">
                <h2>我的订单</h2>
                <mu-flexbox  disableRipple>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont" >&#xe936;</i>待付款
                        </span>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont">&#xe88a;</i>待发货
                        </span>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont">&#xe886;</i>待收货
                        </span>
                    </mu-flexbox-item>
                    <mu-flexbox-item class="flex-demo">
                        <span class="tab-link"  @click="enterHistory">
                            <i class="iconfont"  style="font-size: 23px;padding-top: 4px;">&#xe83d;</i>已完成
                        </span>
                    </mu-flexbox-item>
                </mu-flexbox>

            </div>
            <div class="tabListCard">
                <mu-list>
                    <mu-list-item>
                        <mu-row gutter class="ListItem">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe611;</i>
                            </mu-col>
                            <mu-col class="center" width="50" tablet="60" desktop="35">
                                伊甸卡余额
                            </mu-col>
                            <mu-col class="right" width="35" tablet="60" desktop="35" style="color:#33cbb4">
                                ￥15555.52
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                    <mu-list-item disableRipple @click="enterFavoriteSongs">
                        <mu-row gutter class="ListItem" @click="enterHistory">
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe70c;</i>
                            </mu-col>
                            <mu-col class="center" width="75" tablet="60" desktop="35">
                                地址管理
                            </mu-col>
                            <mu-col class="right" width="10" tablet="60" desktop="35">
                                <i class="iconfont">&#xe62f;</i>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                      <mu-list-item disableRipple @click="enterFavoriteSongs">
                        <mu-row gutter class="ListItem" >
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe6fc;</i>
                            </mu-col>
                            <mu-col class="center" width="75" tablet="60" desktop="35">
                                站内消息
                            </mu-col>
                            <mu-col class="right" width="10" tablet="60" desktop="35">
                                <i class="iconfont">&#xe62f;</i>
                            </mu-col>
                        </mu-row>
                    </mu-list-item>
                      <mu-list-item disableRipple @click="enterFavoriteSongs">
                        <mu-row gutter class="ListItem" >
                            <mu-col class="left" width="15" tablet="60" desktop="15">
                                <i class="iconfont">&#xe6ff;</i>
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
                                <i class="iconfont">&#xe90f;</i>
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

    box-shadow: $box-shadow;
    border-radius: 8px;
    margin: 3%;
    .tab-link{
        display: inline-block;
        width: 100%;
        text-align: center;
        color: $font-color-666;
        font-size: 12px;
        margin-top: 4px;
        margin-bottom: 10px;
        .iconfont{
            font-size: 30px;
            display: block;
            height: 36px;
            color:  $auxiliary-color;
            background: linear-gradient(135deg, #fddcab, #0008ff);
            -webkit-background-clip: text;
            color: transparent;
        }
    }
}
.userCard{
    background: -webkit-linear-gradient(0deg,#5583fe, #5077e9); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(0deg, #5583fe, #5077e9); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(0deg, #5583fe, #5077e9); /* Firefox 3.6 - 15 */
    background: linear-gradient(0deg, #5583fe, #5077e9); /* 标准的语法 */
    box-shadow: $box-shadow;
    border-radius: 8px;
    margin: 3%;
    padding: 30px;
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
            font-size: 26px;
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
    box-shadow: $box-shadow;
    border-radius: 8px;
    margin: 3%;
}

.ListItem{
    .left{
        text-align: center;
        i{
            font-size: 22px;
            color: #b3b9cf;
        }
    }
    .center{
        text-align: left;
        line-height: 34px;
        color: #666;
    }
    .right{
        line-height: 34px;
        text-align: right;
        i{
            font-size: 13px;
            color: #999;
        }
    }
}
</style>
