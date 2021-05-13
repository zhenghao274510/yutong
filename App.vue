<script>
export default {
	onLaunch: function() {
		console.log("App Launch");
		const updateManager = uni.getUpdateManager();

		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate);
		});

		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: "更新提示",
				content: "新版本已经准备好，是否重启应用？",
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});

		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		});
	},
	onShow: function() {
		console.log("App Show");
	},
	onHide: function() {
		console.log("App Hide");
	}
};
</script>

<style lang="less">
/*每个页面公共css */
@import url("@/common/css/common.css");
@import url("@/common/css/icon.css");
@import url("@/common/css/ani.css");
.pageContent {
	padding: 20upx;
}
.lazyload {
	position: relative;
	&.lazypic {
		&:after {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: url("./static/logo.png") no-repeat;
			opacity: 0.3;
		}
	}

	image {
		position: relative;
		z-index: 1;
		opacity: 0;
	}

	&.loaded image {
		transition: 0.7s;
		opacity: 1 !important;
	}
}
.main-wrap {
	opacity: 0;
	transition: 0.2s;
	&.show {
		opacity: 1;
	}
}
@font-face {
	font-family: "iconfont";
	src: url("./static/iconfont/iconfont.ttf");
}

.iconfont {
	font-family: "iconfont" !important;
	font-size: 32upx;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-jian:before {
	content: "\e62b";
}

.icon-jia:before {
	content: "\e62c";
}
.icon-08:before {
	content: "\e609";
}

.icon-quanbu:before {
	content: "\e650";
}

.icon-shangjiantou:before {
	content: "\eb6d";
}

.icon-changyongicon-:before {
	content: "\e613";
}

.icon-search:before {
	content: "\e725";
}

.icon-xiajiantou:before {
	content: "\e63f";
}
</style>
