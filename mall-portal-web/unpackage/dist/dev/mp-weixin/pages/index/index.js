"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home = require("../../api/home.js");
const utils_date = require("../../utils/date.js");
const common_assets = require("../../common/assets.js");
const uniLoadMore = () => "../../components/uni-load-more/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      titleNViewBackground: "",
      titleNViewBackgroundList: ["rgb(203, 87, 60)", "rgb(205, 215, 218)"],
      swiperCurrent: 0,
      swiperLength: 0,
      carouselList: [],
      goodsList: [],
      advertiseList: [],
      brandList: [],
      homeFlashPromotion: [],
      newProductList: [],
      hotProductList: [],
      recommendProductList: [],
      recommendParams: {
        pageNum: 1,
        pageSize: 4
      },
      loadingType: "more"
    };
  },
  onLoad() {
    this.loadData();
  },
  //下拉刷新
  onPullDownRefresh() {
    this.recommendParams.pageNum = 1;
    this.loadData();
  },
  //加载更多
  onReachBottom() {
    this.recommendParams.pageNum++;
    this.loadingType = "loading";
    api_home.fetchRecommendProductList(this.recommendParams).then((response) => {
      let addProductList = response.data;
      if (response.data.length === 0) {
        this.recommendParams.pageNum--;
        this.loadingType = "nomore";
      } else {
        this.recommendProductList = this.recommendProductList.concat(addProductList);
        this.loadingType = "more";
      }
    });
  },
  computed: {
    cutDownTime() {
      let endTime = new Date(this.homeFlashPromotion.endTime);
      let endDateTime = /* @__PURE__ */ new Date();
      let startDateTime = /* @__PURE__ */ new Date();
      endDateTime.setHours(endTime.getHours());
      endDateTime.setMinutes(endTime.getMinutes());
      endDateTime.setSeconds(endTime.getSeconds());
      let offsetTime = endDateTime.getTime() - startDateTime.getTime();
      let endHour = Math.floor(offsetTime / (60 * 60 * 1e3));
      let offsetMinute = offsetTime % (60 * 60 * 1e3);
      let endMinute = Math.floor(offsetMinute / (60 * 1e3));
      let offsetSecond = offsetTime % (60 * 1e3);
      let endSecond = Math.floor(offsetSecond / 1e3);
      return {
        endHour,
        endMinute,
        endSecond
      };
    }
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return utils_date.formatDate(date, "hh:mm:ss");
    }
  },
  methods: {
    /**
     * 加载数据
     */
    async loadData() {
      api_home.fetchContent().then((response) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:184", "onLoad", response.data);
        this.advertiseList = response.data.advertiseList;
        this.swiperLength = this.advertiseList.length;
        this.titleNViewBackground = this.titleNViewBackgroundList[0];
        this.brandList = response.data.brandList;
        this.homeFlashPromotion = response.data.homeFlashPromotion;
        this.newProductList = response.data.newProductList;
        this.hotProductList = response.data.hotProductList;
        api_home.fetchRecommendProductList(this.recommendParams).then((response2) => {
          this.recommendProductList = response2.data;
          common_vendor.index.stopPullDownRefresh();
        });
      });
    }
  },
  //轮播图切换修改背景色
  swiperChange(e) {
    const index = e.detail.current;
    this.swiperCurrent = index;
    common_vendor.index.__f__("log", "at pages/index/index.vue:204", "this.swiperCurren", this.swiperCurren);
    let changeIndex = index % this.titleNViewBackgroundList.length;
    this.titleNViewBackground = this.titleNViewBackgroundList[changeIndex];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.titleNViewBackground,
    b: common_vendor.f($data.advertiseList, (item, index, i0) => {
      return {
        a: item.pic,
        b: index,
        c: common_vendor.o(($event) => _ctx.navToAdvertisePage(item), index)
      };
    }),
    c: common_vendor.o((...args) => _ctx.swiperChange && _ctx.swiperChange(...args)),
    d: common_vendor.t($data.swiperCurrent + 1),
    e: common_vendor.t($data.swiperLength),
    f: common_assets._imports_0,
    g: common_assets._imports_1,
    h: common_assets._imports_2,
    i: common_assets._imports_3,
    j: common_assets._imports_4,
    k: common_vendor.o(($event) => _ctx.navToRecommendBrandPage()),
    l: common_vendor.f($data.brandList, (item, index, i0) => {
      return {
        a: item.logo,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.productCount),
        d: index,
        e: common_vendor.o(($event) => _ctx.navToBrandDetailPage(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
