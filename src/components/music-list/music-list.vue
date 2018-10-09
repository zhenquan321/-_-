<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="material-icons">chevron_left</i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
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
        </div>
        <div class="title">

        </div>
    </div>
</template>
 <script>
import Scroll from '@/base/scroll/scroll';
import SongList from '@/base/song-list/song-list';
import Loading from '@/base/loading/loading';
import { prefixStyle } from '@/assets/js/dom';
import { mapActions } from 'vuex';
// import { sheetMixin } from '@/assets/js/mixin';

// 顶部保留高度
const RESERVED_HEIGHT = 40;
// 兼容性CSS transform属性
const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');

export default {
    // mixins: [sheetMixin],
    props: {
        bgImage: {
            type: String,
            default: ''
        },
        creatorName: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        },
        rank: {
            type: Boolean,
            default: false
        },
        // 是否是歌单里的
        isDisc: {
            type: Boolean,
            default: false
        },
        isFavorite: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImage});`;
        }
    },
    data() {
        return {
            scrollY: 0,
            recommends: [],
            selGood: {}
        };
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
      
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    },
    methods: {
        // handlePlayList(playList, bottomEnable = true) {
        //     const bottom = playList.length > 0 && bottomEnable ? '60px' : '';
        //     this.$refs.list.$el.style.bottom = bottom;
        //     this.$refs.list.refresh();
        // },
        /**
         * @function scroll - 列表滚动时
         * @param {Object} - 滚动到的新位置
         * */
        scroll(pos) {
            this.scrollY = pos.y;
        },
        /**
         * @function back - 返回上一页
         * */
        back() {
            this.$router.back();
        },
        /**
         * @function selectItem -
         * @param {Object} item - 点击的歌曲对象
         * @param {Number} index - 歌曲索引号
         */
        selectItem(item, index) {
            if (item.isPay) {
                this.setPopup('付费歌曲不能播放');
                return;
            }
            this.selectPlay({
                list: this.songs,
                index
            });
        },
        /**
         * @function random - 设置随机播放列表中全部歌曲
         */
        random() {
            this.randomPlay({
                list: this.songs
            });
        },
        toggleFavorite() {
            this.$emit('favoriteChange');
        },
        //获取产品数据
        getData(){
            this.selGood = JSON.parse(localStorage.getItem('selGood'));
            console.log(this.selGood);
            this.recommends = {};
        },
        ...mapActions(['selectPlay', 'randomPlay', 'setPopup'])
    },
    watch: {
        scrollY(newY) {
            const translateY = Math.max(this.minTranslateY, newY);
            let zIndex = 0;
            let scale = 1;
            let blur = 0;
            // 滚动bg-layer
            this.$refs.layer.style[
                transform
            ] = `translate3d(0, ${translateY}px, 0)`;

            const percent = Math.abs(newY / this.imageHeight);
            // 在最顶部下拉, 放大图片
            if (newY > 0) {
                scale = 1 + percent;
                zIndex = 10;
            } else {
                // 上拉高斯模糊(iOS)
                blur = Math.min(20 * percent, 20);
            }
            this.$refs.filter.style[backdrop] = `blur(${blur})`;
            // 上拉超过顶部
            if (newY < this.minTranslateY) {
                zIndex = 10;
                // 图片高度缩小
                this.$refs.bgImage.style.paddingTop = 0;
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
                // 随机播放按钮隐藏
                this.$refs.playBtn.style.display = 'none';
                this.$refs.favorBtn.style.display = 'none';
            } else {
                // 图片恢复原来大小
                this.$refs.bgImage.style.paddingTop = '70%';
                this.$refs.bgImage.style.height = 0;
                // 随机播放按钮显示
                this.$refs.playBtn.style.display = '';
                this.$refs.favorBtn.style.display = '';
            }
            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style[transform] = `scale(${scale})`;
        }
    },
    components: {
        Scroll,
        SongList,
        Loading
    }
};
</script>

 <style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.music-list {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
}
.back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    .material-icons {
        font-size: 36px;
        padding-top: 4px;
        color: #666;
        @include extend-click;
    }
}
.title {
    @include no-wrap;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 44px;
    font-size: $font-size-large;
    color: $font-color-666;
    margin: 0;
    background-color: $color-text-white;
}
.bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    -webkit-transform-origin: top;
    transform-origin: top;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 44px;
    background-position: center;
}
.play-wrapper {
    position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
    display: flex;
    justify-content: center;
    .favor,
    .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .material-icons {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: 44px;
            color: #666;
        }
        .text {
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
        }
    }
}
.filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
}
.list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
        background-color: $color-highlight-background;
    }
    .pad {
        padding: 20px 15px;
    }
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
