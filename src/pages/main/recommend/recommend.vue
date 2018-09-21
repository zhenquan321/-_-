<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-show="!recommends.length" class="slider-wrapper">
                    <div class="slider-content">
                    </div>
                </div>
                <!-- 注意此处, 必须有v-if, 否则获取不到数据使得slider的DOM出错-->
                <div v-if="recommends.length" class="slider-wrapper">
                    <div class="slider-content">
                        <slider ref="slider">
                            <div v-for="(item,index) in recommends" :key="index">
                                <!-- <a :href="item.linkUrl"> -->
                                    <img @load="loadImage" :src="item.image_url" alt="slider-img">
                                <!-- </a> -->
                            </div>
                        </slider>
                    </div>
                </div>
                <div class="linkCard">
                    <mu-flexbox>
                        <mu-flexbox-item class="flex-demo">
                            <span class="tab-link">
                                <img class="iconImg" src="~@/assets/image/icon/icon2.png"><span>伊甸套餐</span>
                            </span>
                        </mu-flexbox-item>
                        <mu-flexbox-item class="flex-demo">
                            <span class="tab-link">
                                <img class="iconImg" src="~@/assets/image/icon/icon4.png"><span>本周新菜</span>
                            </span>
                        </mu-flexbox-item>
                        <mu-flexbox-item class="flex-demo">
                            <span class="tab-link">
                                <img class="iconImg" src="~@/assets/image/icon/icon3.png"><span>农场咨询</span>
                            </span>
                        </mu-flexbox-item>
                        <mu-flexbox-item class="flex-demo">
                            <span class="tab-link">
                                <img class="iconImg" src="~@/assets/image/icon/icon1.png"><span>关于我们</span>
                            </span>
                        </mu-flexbox-item>
                    </mu-flexbox>
                </div>
                <div class="recommend-list">
                    <div class="headerTitle">
                        <h1 class="HT-Title">精品推荐</h1>
                        <h4 class="HT-selBtn" @click="open('bottom')">
                            <span><i class="iconfont" >&#xeb04;</i><i class="iconfont">&#xeb05;</i> <span >排序</span></span>
                        </h4>
                    </div>
                    <ul class="list">
                        <li @click="selectItem(item)" v-for="(item, index) in discList" class="item" :key="index">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.image_url" alt="discItem">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.goods_name"></h2>
                                <p class="desc" >￥{{item.group_price}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recommend-list">
                    <div class="headerTitle">
                        <h1 class="HT-Title">最新上架</h1>
                        <!-- <h4 class="HT-selBtn" @click="open('bottom')">
                            <span><i class="iconfont" >&#xeb04;</i><i class="iconfont">&#xeb05;</i> <span >排序</span></span>
                        </h4> -->
                    </div>
                    <ul class="list">
                        <li @click="selectItem(item)" v-for="(item, index) in discListNew" class="item" :key="index">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.image_url" alt="discItem">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.goods_name"></h2>
                                <p class="desc" >￥{{item.group_price}}</p>
                            </div>
                        </li>
                    </ul>
                    <div style="height:60px"></div>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')" style="width:100%">
            <mu-paper class="demo-menu">
                <mu-menu>
                <mu-menu-item @click="selPXlei(2,0)" title="价格从低到高"/>
                <mu-menu-item @click="selPXlei(2,1)" title="价格从高到低"/>
                <mu-menu-item @click="selPXlei(1,0)" title="销量从低到高"/>
                <mu-menu-item @click="selPXlei(1,1)" title="销量从高到低"/>
                </mu-menu>
            </mu-paper>
        </mu-popup>
    </div>
</template>

<script>
/**
 * @requires Slider - UI组件
 * @requires getRecommend - 公共方法
 * @requires ERR_OK - 配置常量
 */
import Loading from '@/base/loading/loading';
import Scroll from '@/base/scroll/scroll';
import Slider from '@/base/slider/slider';
import { getRecommend, getDiscList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import { mapMutations } from 'vuex';
import { createList } from '@/assets/js/list';

export default {

    data() {
        return {
            recommends: [],
            discList: [],
            discListNew: [],
            bottomPopup: false,
            seltype: 0,
            sortType: 1,
            size: 20,
            is_new: 0
        };
    },
    created() {
        // 获取Slider内容
        this._getRecommend();
        // 获取歌单列表
        this._getDiscList();
        this._getDiscList(1);
    },
    activated() {
        setTimeout(() => {
            this.$refs.slider && this.$refs.slider.refresh();
        }, 20);
    },
    components: {
        Slider,
        Scroll,
        Loading
    },
    methods: {
        // 点击进入详情
        selectItem(item) {
            const formatItem = createList(item).format();
            this.$router.push({
                path: `/main/recommend/${formatItem.id}`
            });
            this.setDisc(formatItem);
        },
        handlePlayList(playList, bottomEnable = true) {
            const bottom = playList.length > 0 && bottomEnable ? '60px' : '';
            this.$refs.recommend.style.bottom = bottom;
            this.$refs.scroll.refresh();
        },
        /**
         * @private
         * @function _getRecommend - 获取Slider数据
         * */
        async _getRecommend() {
            try {
                const res = await getRecommend();
                if (res.result === ERR_OK) {
                    this.recommends = res.banner;
                }
            } catch (err) {
                throw err;
            }
        },
        /**
         * @private
         * @function _getDiscList - 获取推荐数据
         * */
        async _getDiscList(isnew) {
            const isnew2 = isnew || this.is_new;
            try {
                const res = await getDiscList(isnew2, this.seltype, this.sortType, this.size);
                if (res.result === ERR_OK) {
                    if (isnew) {
                        this.discListNew = res.goods;
                    } else {
                        this.discList = res.goods;
                    }
                }
            } catch (err) {
                throw err;
            }
        },
        selPXlei(num, num2) {
            this.seltype = num;
            this.sortType = num2;
            this._getDiscList();
            this.close();
        },
        open() {
            this.bottomPopup = true;
        },
        close() {
            this.bottomPopup = false;
        },
        loadImage() {
            if (!this.checkLoaded) {
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                }, 20);
                this.checkLoaded = true;
            }
        },
        ...mapMutations({ setDisc: 'SET_DISC' })
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.recommend {
    position: absolute;
    width: 100%;
    top: 44px;
    bottom: 0;
    background-color: $color-background;
}
.recommend-content {
    height: 100%;
    overflow: hidden;
}
.slider-wrapper {
    position: relative;
    // width: 94%;
    height: 0;
    padding-top: 40%;
    overflow: hidden;
    // margin: 3%;
    // border-radius: 12px;
    // box-shadow: $box-shadow;
    .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .slider-group{
            height: 100%;
        }
        .slider{
            // border-radius: 12px;
            overflow: hidden;
            height: 100%;
            .slider-item{
                height: 100%;
                img{
                    height: 100%;
                }
            }
        }
    }
}
.recommend-list {
    background-color: #fff;
    .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
    }
    .list {
        // background-color: #fff;
        // margin: 0 3%;
        // border-radius: 12px;
        // box-shadow: $box-shadow-s;
        :last-child{
            border: 0;
        }
        padding-top: 7px;
    }
    .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        margin: 0 15px 5px;
        padding: 10px;
        border-bottom: 1px solid #efefef;
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
            padding-left: 15px;
            .name {
                margin-bottom: 10px;
                color: $color-text;
            }
            .desc {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: $auxiliary-color;
                font-weight: 600;
            }
        }
    }
}
.loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
.linkCard{
    background-color: #fff;
    height: 90px;
    padding-top: 10px;
    // box-shadow: $box-shadow;
    // border-radius: 8px;
    // margin: 3%;
    .tab-link{
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 12px;
        margin-top: 4px;
        // background: linear-gradient(135deg,#28c6d6,#8e0000);
        -webkit-background-clip: text;
        color: transparent;
        .iconImg{
            width: 44px;
            height: 44px;
        }
        span{
            display: block;
            color: #333;
        }
    }
}

.demo-popup-bottom {
  width: 100%;
}
</style>
