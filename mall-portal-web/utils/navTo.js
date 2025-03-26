export default function navTo(url) {
	if (url.indexOf("pages") != -1) {
		uni.navigateTo({
			url: url
		});
	}
	this.$api.msg(`跳转到${url}`);
}