<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.src" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{product.name}}</text><br>
			<text class="title2">{{product.subTitle}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{product.price}}</text>
				<text class="m-price">¥{{product.originalPrice}}</text>
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>销量: {{product.sale}}</text>
				<text>库存: {{product.stock}}</text>
				<text>浏览量: {{product.productView || 798}} </text>
			</view>
		</view>

		<!--  分享 -->
		<view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>

		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b" @click="toggleAttr">
				<text class="tit">商品参数</text>
				<view class="con">
					<text class="con t-r">查看</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b" @click="toggleCoupon('show')">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text v-for="item in promotionTipList" :key="item">{{item}}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text v-for="item in serviceList" :key="item">{{item}} ·</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>({{evaluatedQuantity}})</text>
				<text class="tip">好评率 {{favorableRate}}%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">{{name}}</text>
					<text class="con">{{comment}}</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 品牌信息 -->
		<view class="brand-info">
			<view class="d-header">
				<text>品牌信息</text>
			</view>
			<view class="brand-box" @click="navToBrandDetail()">
				<view class="image-wrapper">
					<image :src="brand.logo" class="loaded" mode="aspectFit"></image>
				</view>
				<view class="title">
					<text>{{brand.name}}</text>
					<text>品牌首字母：{{brand.firstLetter}}</text>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="addToCart">加入购物车</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="product.pic"></image>
					<view class="right">
						<text class="price">¥{{product.price}}</text>
						<text class="stock">库存：{{product.stock}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>
		<!-- 属性-模态层弹窗 -->
		<view class="popup spec" :class="attrClass" @touchmove.stop.prevent="stopPrevent" @click="toggleAttr">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content no-padding" @click.stop="stopPrevent">
				<view class="c-list">
					<view v-for="item in attrList" class="c-row b-b" :key="item.key">
						<text class="tit">{{item.key}}</text>
						<view class="con">
							<text class="con t-r">{{item.value}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 优惠券面板 -->
		<view class="mask" :class="couponState===0 ? 'none' : couponState===1 ? 'show' : ''" @click="toggleCoupon">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click="addCoupon(item)">
					<view class="con">
						<view class="left">
							<text class="title">{{item.name}}</text>
							<text class="time">有效期至{{item.endTime | formatDateTime}}</text>
						</view>
						<view class="right">
							<text class="price">{{item.amount}}</text>
							<text>满{{item.minPoint}}可用</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">{{item.useType | formatCouponUseType}}</text>
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
	import share from '@/components/share';
	import {
		fetchProductDetail
	} from '@/api/product.js';
	import {
		addCartItem
	} from '@/api/cart.js';
	import {
		fetchProductCouponList,
		addMemberCoupon
	} from '@/api/coupon.js';
	import {
		createReadHistory
	} from '@/api/memberReadHistory.js';
	import {
		createProductCollection,
		deleteProductCollection,
		productCollectionDetail
	} from '@/api/memberProductCollection.js';
	import {
		mapState
	} from 'vuex';
	import {
		formatDate
	} from '@/utils/date';
	const defaultServiceList = [{
		id: 1,
		name: "无忧退货"
	}, {
		id: 2,
		name: "快速退款"
	}, {
		id: 3,
		name: "免费包邮"
	}];
	const defaultShareList = [{
			type: 1,
			icon: '/static/temp/share_wechat.png',
			text: '微信好友'
		},
		{
			type: 2,
			icon: '/static/temp/share_moment.png',
			text: '朋友圈'
		},
		{
			type: 3,
			icon: '/static/temp/share_qq.png',
			text: 'QQ好友'
		},
		{
			type: 4,
			icon: '/static/temp/share_qqzone.png',
			text: 'QQ空间'
		}
	]
	export default {
		components: {
			share
		},
		data() {
			return {
				specClass: 'none',
				attrClass: 'none',
				specSelected: [],
				favorite: false,
				shareList: [],
				imgList: [],
				desc: '',
				specList: [],
				specChildList: [],
				product: {},
				brand: {},
				serviceList: [],
				skuStockList: [],
				attrList: [],
				promotionTipList: [],
				couponState: 0,
				couponList: [],
				favorableRate: 100,
				evaluatedQuantity: 1,
				name: "renoYuan",
				comment: "这个商品真心不错，值得购买!"
			};
		},
		async onLoad(options) {
			let id = options.id;
			this.shareList = defaultShareList;
			this.loadData(id);
		},
		computed: {
			...mapState(['hasLogin'])
		},
		filters: {
			formatDateTime(time) {
				if (time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatCouponUseType(useType) {
				if (useType == 0) {
					return "全场通用";
				} else if (useType == 1) {
					return "指定分类商品可用";
				} else if (useType == 2) {
					return "指定商品可用";
				}
				return null;
			},
		},
		methods: {
			async loadData(id) {
				fetchProductDetail(id).then(response => {
					this.product = response.data.product;
					this.skuStockList = response.data.skuStockList;
					this.brand = response.data.brand;
					this.initImgList();
					this.initServiceList();
					this.initSpecList(response.data);
					this.initAttrList(response.data);
					this.initPromotionTipList(response.data);
					this.initProductDesc();
					this.handleReadHistory();
					this.initProductCollection();
				});
			},
			
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			//属性弹窗开关
			toggleAttr() {
				if (this.attrClass === 'show') {
					this.attrClass = 'hide';
					setTimeout(() => {
						this.attrClass = 'none';
					}, 250);
				} else if (this.attrClass === 'none') {
					this.attrClass = 'show';
				}
			},
			//优惠券弹窗开关
			toggleCoupon(type) {
				fetchProductCouponList(this.product.id).then(response => {
					this.couponList = response.data;
					if(this.couponList==null||this.couponList.length==0){
						uni.showToast({
							title:"暂无可领优惠券",
							icon:"none"
						})
						return;
					}
					let timer = type === 'show' ? 10 : 300;
					let state = type === 'show' ? 1 : 0;
					this.couponState = 2;
					setTimeout(() => {
						this.couponState = state;
					}, timer)
				});
			},
			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
					}
				})
				this.changeSpecInfo();

			},
			//领取优惠券
			addCoupon(coupon) {
				this.toggleCoupon();
				addMemberCoupon(coupon.id).then(response => {
					uni.showToast({
						title: '领取优惠券成功！',
						duration: 2000
					});
				});
			},
			//分享
			share() {
				this.$refs.share.toggleMask();
			},
			//收藏
			toFavorite() {
				if (!this.checkForLogin()) {
					return;
				}
				if (this.favorite) {
					//取消收藏
					deleteProductCollection({
						productId: this.product.id
					}).then(response => {
						uni.showToast({
							title: "取消收藏成功！",
							icon: 'none'
						});
						this.favorite = !this.favorite;
					});
				} else {
					//收藏
					let productCollection = {
						productId: this.product.id,
						productName: this.product.name,
						productPic: this.product.pic,
						productPrice: this.product.price,
						productSubTitle: this.product.subTitle
					}
					createProductCollection(productCollection).then(response => {
						uni.showToast({
							title: "收藏成功！",
							icon: 'none'
						});
						this.favorite = !this.favorite;
					});
				}
			},
			buy() {
				uni.showToast({
					title: "暂时只支持从购物车下单！",
					icon: 'none'
				});
			},
			stopPrevent() {},
			
			//设置头图信息
			initImgList() {
				let tempPics = this.product.albumPics.split(',');
				tempPics.unshift(this.product.pic);
				for (let item of tempPics) {
					if (item != null && item != '') {
						this.imgList.push({
							src: item
						});
					}
				}
			},
			//设置服务信息
			initServiceList() {
				for (let item of defaultServiceList) {
					if (this.product.serviceIds.indexOf(item.id) != -1) {
						this.serviceList.push(item.name);
					}
				}
			},
			//设置商品规格
			initSpecList(data) {
				for (let i = 0; i < data.productAttributeList.length; i++) {
					let item = data.productAttributeList[i];
					if (item.type == 0) {
						this.specList.push({
							id: item.id,
							name: item.name
						});
						if (item.handAddStatus == 1) {
							//支持手动新增的
							let valueList = data.productAttributeValueList;
							let filterValueList = valueList.filter(value => value.productAttributeId == item.id);
							let inputList = filterValueList[0].value.split(',');
							for (let j = 0; j < inputList.length; j++) {
								this.specChildList.push({
									pid: item.id,
									pname: item.name,
									name: inputList[j]
								});
							}
						} else if (item.handAddStatus == 0) {
							//不支持手动新增的
							let inputList = item.inputList.split(',');
							for (let j = 0; j < inputList.length; j++) {
								this.specChildList.push({
									pid: item.id,
									pname: item.name,
									name: inputList[j]
								});
							}
						}
					}
					console.log("this.specList",this.specList);
					console.log("this.specChildList",this.specChildList);
				}
				
				let availAbleSpecSet = new Set();
				for (let i = 0; i < this.skuStockList.length; i++) {
					let spDataArr = JSON.parse(this.skuStockList[i].spData);
					for (let j = 0; j < spDataArr.length; j++) {
						availAbleSpecSet.add(spDataArr[j].value);
					}
				}
				
				// 根据商品sku筛选出可用规格
				this.specChildList = this.specChildList.filter(item => {
					return availAbleSpecSet.has(item.name)
				});
				// 规格 默认选中第一条
				this.specList.forEach(item => {
					for (let cItem of this.specChildList) {
						if (cItem.pid === item.id) {
							this.$set(cItem, 'selected', true);
							this.specSelected.push(cItem);
							this.changeSpecInfo();
							break;
						}
					}
				})
			},
			
			//设置商品参数
			initAttrList(data) {
				for (let item of data.productAttributeList) {
					if (item.type == 1) {
						let valueList = data.productAttributeValueList;
						let filterValueList = valueList.filter(value => value.productAttributeId == item.id);
						let value = filterValueList[0].value;
						this.attrList.push({
							key: item.name,
							value: value
						});
					}
				}
			},
			
			//设置促销活动信息
			initPromotionTipList(data) {
				let promotionType = this.product.promotionType;
				if (promotionType == 0) {
					this.promotionTipList.push("暂无优惠");
				} else if (promotionType == 1) {
					this.promotionTipList.push("单品优惠");
				} else if (promotionType == 2) {
					this.promotionTipList.push("会员优惠");
				} else if (promotionType == 3) {
					this.promotionTipList.push("多买优惠");
					for (let item of data.productLadderList) {
						this.promotionTipList.push("满" + item.count + "件打" + item.discount * 10 + "折");
					}
				} else if (promotionType == 4) {
					this.promotionTipList.push("满减优惠");
					for (let item of data.productFullReductionList) {
						this.promotionTipList.push("满" + item.fullPrice + "元减" + item.reducePrice + "元");
					}
				} else if (promotionType == 5) {
					this.promotionTipList.push("限时优惠");
				}
			},
			
			//初始化商品详情信息
			initProductDesc() {
				let rawhtml = this.product.detailMobileHtml;
				let tempNode = document.createElement('div');
				tempNode.innerHTML = rawhtml;
				let imgs = tempNode.getElementsByTagName('img');
				for (let i = 0; i < imgs.length; i++) {
					imgs[i].style.width = '100%';
					imgs[i].style.height = 'auto';
					imgs[i].style.display = 'block';
				}
				this.desc = tempNode.innerHTML;
			},
			//处理创建浏览记录
			handleReadHistory() {
				if (this.hasLogin) {
					let data = {
						productId: this.product.id,
						productName: this.product.name,
						productPic: this.product.pic,
						productPrice: this.product.price,
						productSubTitle: this.product.subTitle,
					}
					createReadHistory(data);
				}
			},
			//当商品规格改变时，修改商品信息
			changeSpecInfo() {
				let skuStock = this.getSkuStock();
				if (skuStock != null) {
					this.product.originalPrice = skuStock.price;
					if (this.product.promotionType == 1) {
						//单品优惠使用促销价
						this.product.price = skuStock.promotionPrice;
					} else {
						this.product.price = skuStock.price;
					}
					this.product.stock = skuStock.stock;
				}
			},
			//获取当前选中商品的SKU
			getSkuStock() {
				for (let i = 0; i < this.skuStockList.length; i++) {
					let spDataArr = JSON.parse(this.skuStockList[i].spData);
					let availAbleSpecSet = new Map();
					for (let j = 0; j < spDataArr.length; j++) {
						availAbleSpecSet.set(spDataArr[j].key, spDataArr[j].value);
					}
					let correctCount = 0;
					for (let item of this.specSelected) {
						let value = availAbleSpecSet.get(item.pname);
						if (value != null && value == item.name) {
							correctCount++;
						}
					}
					if (correctCount == this.specSelected.length) {
						return this.skuStockList[i];
					}
				}
				return null;
			},
			//将商品加入到购物车
			addToCart() {
				if (!this.checkForLogin()) {
					return;
				}
				let productSkuStock = this.getSkuStock();
				let cartItem = {
					price: this.product.price,
					productAttr: productSkuStock.spData,
					productBrand: this.product.brandName,
					productCategoryId: this.product.productCategoryId,
					productId: this.product.id,
					productName: this.product.name,
					productPic: this.product.pic,
					productSkuCode: productSkuStock.skuCode,
					productSkuId: productSkuStock.id,
					productSn: this.product.productSn,
					productSubTitle: this.product.subTitle,
					quantity: 1
				};
				addCartItem(cartItem).then(response => {
					uni.showToast({
						title: response.message,
						duration: 1500
					})
				});
			},
			//检查登录状态并弹出登录框
			checkForLogin() {
				if (!this.hasLogin) {
					uni.showModal({
						title: '提示',
						content: '你还没登录，是否要登录？',
						confirmText: '去登录',
						cancelText: '取消',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return false;
				} else {
					return true;
				}
			},
			//初始化收藏状态
			initProductCollection() {
				if (this.hasLogin) {
					productCollectionDetail({
						productId: this.product.id
					}).then(response => {
						this.favorite = response.data != null;
					});
				}
			},
			//跳转到品牌详情页
			navToBrandDetail(){
				let id = this.brand.id;
				uni.navigateTo({
					url: `/pages/brand/brandDetail?id=${id}`
				})
			},
		},

	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	@import '@/scss/product.scss';
</style>
