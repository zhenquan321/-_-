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
                                <img class="iconImg" src="~@/assets/image/icon/icon1.png"><span>走进伊甸</span>
                            </span>
                        </mu-flexbox-item>
                        <mu-flexbox-item class="flex-demo">
                            <router-link tag="span" class="tab-item" :to="{path:'/main/singer', query:{cid:'1'}}" @click.native="refresh">
                                <span class="tab-link">
                                    <img class="iconImg" src="~@/assets/image/icon/icon4.png"><span>伊甸食材</span>
                                </span>
                            </router-link>
                        </mu-flexbox-item>
                        <mu-flexbox-item class="flex-demo">
                            <router-link tag="span" class="tab-item" :to="{path:'/main/singer', query:{cid:'2'}}" @click.native="refresh"> 
                                <span class="tab-link">
                                    <img class="iconImg" src="~@/assets/image/icon/icon3.png"><span>伊甸客房</span>
                                </span>
                            </router-link>
                        </mu-flexbox-item>
                        <mu-flexbox-item class="flex-demo">
                            <router-link tag="span" class="tab-item" :to="{path:'/main/singer', query:{cid:'17'}}" @click.native="refresh">
                                <span class="tab-link">
                                    <img class="iconImg" src="~@/assets/image/icon/icon2.png"><span>伊甸套餐</span>
                                </span>
                            </router-link>
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
                                <img width="110" height="110" v-lazy="item.image_url" alt="discItem">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.goods_name"></h2>
                                <h3>已售{{item.sell_count}}件</h3>
                                <mu-row gutter class="jiageCard">
                                    <mu-col class="left" width="60" tablet="60" desktop="15">
                                        <p class="desc1">市场价：￥{{item.market_price}}</p>
                                        <p class="desc2">抢购价：<span>￥{{item.group_price}}</span></p>
                                    </mu-col>
                                    <mu-col class="center" width="40" tablet="60" desktop="35">
                                        <button>立即抢购</button>
                                    </mu-col>
                                </mu-row>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recommend-list">
                    <div class="headerTitle">
                        <h1 class="HT-Title">最新上架</h1>
                        <h4 class="HT-selBtn">
                            <router-link tag="span" class="tab-item" :to="{path:'/main/singer', query:{library_id:''}}">
                                <span><span >更多>></span></span>
                            </router-link>
                        </h4>
                    </div>
                        <mu-row gutter class="jiageCardLsit">
                            <mu-col class="jiageCard" id="ssawd" width="33"  @click="selectItem(item)" v-for="(item, index) in discListNew" v-if="index<6"  :key="index">
                                <div class="icon" >
                                    <img   v-lazy="item.image_url" alt="discItem">
                                </div>
                                <div class="text">
                                    <h2 class="name" v-html="item.goods_name"></h2>
                                </div>
                                <mu-row>
                                    <mu-col  width="66">
                                        <p class="desc1">￥{{item.market_price}}</p>
                                        <p class="desc2">￥{{item.group_price}}</p>
                                    </mu-col>
                                    <mu-col  width="33">
                                        <span class="addGm"><span> <i class="iconfont" >&#xe6df;</i></span></span>
                                    </mu-col>
                                </mu-row>
                            </mu-col>
                        </mu-row>
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
            localStorage.setItem('selGood', JSON.stringify(item))
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
        // 刷新页面
        refresh() {
            this.$router.go(0);  
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
                    // setTimeout(() => {
                    //     const dom = document.getElementsByClassName('icon');
                    //     for (let i = 0; i < dom.length; i += 1) {
                    //         const he = document.getElementById('ssawd').offsetHeight;
                    //         dom[i].style.height = he + 'px';
                    //     }
                    // }, 1000);
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
            flex: 0 0 110px;
            width: 110px;
            height: 110px!important;
            padding-right: 20px;
            img{
                height: 100%;
            }
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
                margin-bottom: 2px;
                color: #333;
                font-size: 16px;
            }
            h3{
                color: #666;
                font-size: 14px;
            }
            .desc1 {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: $auxiliary-color;
                font-size: 12px;
                color: #999999;
                // text-decoration:line-through
            }
             .desc2 {
                font-size: 12px;
                color: #333333;
                span{
                    color: #FF5757;
                    font-size: 18px;
                    font-weight: 600;

                }
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
.jiageCard{
    margin-top: 20px;
    .center {
        button{
            width: 78px;
            height: 28px;
            color: #fff;
            background-color: $auxiliary-color;
            border-radius:4px;
            margin-top: 10px;
            float: right;
            line-height: 28px;
        }
    }
}
.jiageCardLsit{
    padding: 5px;
    .jiageCard{
        padding: 3px;
        margin-top: 3px;
        .icon{
           min-height: 2.1rem;
           width: 2.1rem!important;
        }
    }
    img{
        width: 2.1rem;
        height:  2.1rem;

    }
    .text h2{
        font-size: 12px;
        color: #333333;
        margin-top: -2px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .desc1{
        font-size: 12px;
        color: #888888;
        text-decoration:line-through;
        line-height: 12px;
        margin-top: 4px;
    }
    .desc2{
        font-size: 14px;
        color: #FF5757;
    }

}
.demo-popup-bottom {
  width: 100%;
}
</style>
