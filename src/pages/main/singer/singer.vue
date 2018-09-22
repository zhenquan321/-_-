<template>
    <div class="singer" ref="singer">
        <div class="classification">
            <div class="CFheader">
                <ul>
                    <li @click="selectTypeFun(item)" v-for="(item, index) in Producttypes" :key="index" v-bind:class="{ active: selectType.cate_id==item.cate_id }" >{{item.cate_name}}</li>
                </ul>
            </div>
            <div class="CFtype">
                <mu-row gutter v-if="!noProducttypes2">
                    <mu-col  width="25" >
                        <div  class="fenlei">
                            <ul>
                                <li @click="selectTypeFun2(item)" v-for="(item, index) in Producttypes2" :key="index" v-bind:class="{ active: selectType2.cate_id==item.cate_id }">{{item.cate_name}}</li>
                            </ul>
                        </div>
                    </mu-col>
                    <mu-col class="CFlist"  width="75" >
                        <ul class="list">
                            <li @click="selectProduct(item)" v-for="(item, index) in ProductList" class="item" :key="index">
                                <div class="icon">
                                    <img width="64" height="64" v-lazy="item.image_url" alt="discItem">
                                </div>
                                <div class="text">
                                    <h2 class="name" v-html="item.goods_name"></h2>
                                    <mu-row gutter class="jiageCard">
                                        <mu-col class="left" width="60" tablet="60" desktop="15">
                                            <p class="desc1" ><span v-show="item.group_price!=item.market_price">￥</span>{{item.group_price!=item.market_price?item.market_price:""}}</p>
                                            <p class="desc2"><span>￥{{item.group_price}}</span></p>
                                        </mu-col>
                                        <mu-col class="center" width="40" tablet="60" desktop="35">
                                             <span class="addGm"><span> <i class="iconfont" >&#xe6df;</i></span></span>
                                        </mu-col>
                                    </mu-row>
                                </div>
                            </li>
                        </ul>
                    </mu-col>
                </mu-row>
                <mu-row gutter v-if="noProducttypes2">
                    <mu-col class="CFlist"  width="100" style="padding: 0 15px">
                        <ul class="list">
                            <li @click="selectProduct(item)" v-for="(item, index) in ProductList" class="item" :key="index">
                                <div class="icon">
                                    <img width="64" height="64" v-lazy="item.image_url" alt="discItem">
                                </div>
                                <div class="text">
                                    <h2 class="name" v-html="item.goods_name"></h2>
                                    <mu-row gutter class="jiageCard">
                                        <mu-col class="left" width="60" tablet="60" desktop="15">
                                            <p class="desc1" ><span v-show="item.group_price!=item.market_price">￥</span>{{item.group_price!=item.market_price?item.market_price:""}}</p>
                                            <p class="desc2"><span>￥{{item.group_price}}</span></p>
                                        </mu-col>
                                        <mu-col class="center" width="40" tablet="60" desktop="35">
                                             <span class="addGm"><span> <i class="iconfont" >&#xe6df;</i></span></span>
                                        </mu-col>
                                    </mu-row>
                                </div>
                            </li>
                        </ul>
                    </mu-col>
                </mu-row>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { ERR_OK } from '@/api/config';
import { mapMutations } from 'vuex';
import { GoodsCateLists, GoodsCateNclists, Goodslists } from '@/api/classification';
// const HOT_NAME = '热门';
// const HOT_SINGER_LEN = 10;
export default {
    // mixins: [playListMixin],
    data() {
        return {
            Producttypes: [],
            Producttypes2: [],
            ProductList: [],
            selectType: '',
            selectType2: '',
            discList: [],
            noProducttypes2: false
        };
    },
    components: {

    },
    created() {
        this._GoodsCateLists();
    },
    methods: {
        // handlePlayList(playList, bottomEnable = true) {
        //     const bottom = playList.length > 0 && bottomEnable ? '60px' : '';
        //     this.$refs.singer.style.bottom = bottom;
        //     this.$refs.list.refresh();
        // },
        /**
         * @function selectProduct - 点击歌手进入歌手详情页
         * @param {Object} data - 歌手数据对象
        */
        selectProduct(data) {
            // 切换到详情页面
            this.$router.push({
                path: `/main/productDetailsPage/${data.goods_id}`
            });
            // 将数据放入Vuex
            this.setSinger(data);
        },
        /**
         * @private
         * @function _getSingerList - 获取歌手数据
         * */
        // async _getSingerList() {
        //     try {
        //         const res = await getSingerList();
        //         if (res.code === ERR_OK) {
        //             this.singers = this._normalizeSinger(res.data.list);
        //         }
        //     } catch (err) {
        //         throw err;
        //     }
        // },
        // _normalizeSinger(list) {
        //     const map = {
        //         hot: {
        //             title: HOT_NAME,
        //             items: []
        //         }
        //     };
        //     list.forEach((item, index) => {
        //         // 前HOT_SINGER_LEN个歌手放在热门里面
        //         if (index < HOT_SINGER_LEN) {
        //             map.hot.items.push(
        //                 new Singer({
        //                     id: item.Fsinger_mid,
        //                     name: item.Fsinger_name
        //                 })
        //             );
        //         }
        //         // 获取索引
        //         const key = item.Findex;
        //         // 如果不存在这个索引, 则创建它
        //         if (!map[key]) {
        //             map[key] = {
        //                 title: key,
        //                 items: []
        //             };
        //         }
        //         // 将歌手放到对应索引里面
        //         map[key].items.push(
        //             new Singer({
        //                 id: item.Fsinger_mid,
        //                 name: item.Fsinger_name
        //             })
        //         );
        //     });
        //     // 为了得到有序列表, 需要处理map
        //     const hot = [];
        //     const ret = [];
        //     Object.values(map).forEach(item => {
        //         if (item.title.match(/[a-zA-Z]/)) {
        //             ret.push(item);
        //         } else if (item.title === HOT_NAME) {
        //             hot.push(item);
        //         }
        //     });
        //     // 对ret按照字母排序
        //     ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
        //     return hot.concat(ret);
        // },
        /**
         * @function mapMutations - Vuex方法映射
         * */
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        selectTypeFun(data) {
            this.selectType = data;
            this._GoodsCateNclists(this.selectType.cate_id);
        },
        selectTypeFun2(data) {
            this.selectType2 = data;
            const dataC = {
                ncp_cate_id: this.selectType2.cate_id
            };
            this._Goodslists(dataC);
        },
        /**
         * @private
         * @function _GoodsCateLists - 获取分类
         * */
        async _GoodsCateLists() {
            try {
                const res = await GoodsCateLists();
                if (res.result === ERR_OK) {
                    this.Producttypes = res.cates;
                    this.selectTypeFun(this.Producttypes[0]);
                }
            } catch (err) {
                throw err;
            }
        },
        /**
         * @private
         * @function _GoodsCateLists - 获取二级分类
         * */
        async _GoodsCateNclists(cid) {
            try {
                const res = await GoodsCateNclists(cid);
                if (res.result === ERR_OK) {
                    if (res.cates.length > 0) {
                        this.noProducttypes2 = false;
                        this.Producttypes2 = res.cates;
                        this.selectTypeFun2(this.Producttypes2[0]);
                    } else {
                        this.noProducttypes2 = true;
                        const dataC = {
                            cate_id: cid
                        };
                        this._Goodslists(dataC);
                    }
                }
            } catch (err) {
                throw err;
            }
        },
        /**
         * @private
         * @function _Goodslists - 获取产品
         * */
        async _Goodslists(cid) {
            try {
                const res = await Goodslists(cid);
                if (res.result === ERR_OK) {
                    this.ProductList = res.goods;
                }
            } catch (err) {
                throw err;
            }
        }
    }
};
</script>

<style lang="scss">
@import '~@/assets/scss/variable.scss';
.singer {
    position: absolute;
    top: 44px;
    bottom: 0;
    width: 100%;
}
.CFheader{
    height: 44px;
    background-color: $color-background;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
    padding: 0;
    ul{
        height: 43px;
        width: max-content;
        li{
            display: inline-block;
            height: 43px;
            line-height: 44px;
            color: #666;
            font-size: 15px;
            padding: 0 30px;
        }
        .active{
            color: $theme-color;
            // border:1px solid $theme-color;
            // background-color: #fff;
            font-weight: 600;
        }
    }
}
.CFtype{
    .fenlei{
        background-color: $color-background;
        border-right: 1px solid #efefef;
        ul{
            height: calc(100vh - 138px);
            overflow-y: scroll;
            li{
                height: 44px;
                line-height: 44px;
                border-bottom: 1px solid #efefef;
                font-size: 14px;
                color: #666666;
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .active{
                border-left:3px solid $theme-color;
                background-color: #fff;
            }
        }
    }
}
.CFlist {
    ul{
        height: calc(100vh - 138px);
        overflow-y: scroll;
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
        .addGm{
            border: 1px solid #C8C8C8!important;
            margin-top: 24px;
            span{
                top: -2px;
            }
        }
    }
    .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 10px 10px 10px 0;
        border-bottom: 1px solid #efefef;
        .icon {
            flex: 0 0 64px;
            width: 64px;
            height: 64px;
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
                margin-bottom: 2px;
                color: #333;
                font-size: 14px;
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
                text-decoration:line-through;
                height: 16px;
                margin-top: 8px;
            }
             .desc2 {
                font-size: 12px;
                color: #333333;
                position: relative;
                top: 3px;
                span{
                    color: #FF5757;
                    font-size: 16px;
                }
             }
        }
    }
}

</style>
