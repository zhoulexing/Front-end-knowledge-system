let pages: string[] = [];
if(process.env.TARO_ENV === 'h5') {
	pages = [
		"pages/index/index",
		"pages/my/index",
		"pages/test/index"
	]
} else {
	pages = [
        "pages/index/index",
        "pages/my/index",
        "pages/test/index"
    ];
}

export default {
    pages: pages,
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black",
    },
    tabBar: {
        color: "#999999",
        selectedColor: "#4855a8",
        backgroundColor: "#fff",
        list: [
            {
                pagePath: "pages/index/index",
                iconPath: "assets/images/home_nor.png",
                selectedIconPath: "assets/images/home_sel.png",
                text: "首页",
            },
            {
                pagePath: "pages/my/index",
                iconPath: "assets/images/personal_nor.png",
                selectedIconPath: "assets/images/personal_sel.png",
                text: "个人中心",
            },
        ],
    },
};
