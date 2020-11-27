import Taro from "@tarojs/taro";

/**
 * 提示与加载工具类
 *
 * @author zlx
 */
export default class Tips {
    static isLoading = false;

    /**
     * 信息提示
     */
    static toast(title: string, onHide?: () => void) {
        Taro.showToast({
            title,
            icon: "none",
            mask: true,
            duration: 1500,
        });
        if (onHide) {
            setTimeout(() => {
                onHide();
            }, 500);
        }
    }

    /**
     * 弹出加载提示
     */
    static loading(title = "加载中", force = false) {
        if (this.isLoading && !force) {
            return;
        }
        this.isLoading = true;
        if (Taro.showLoading) {
            Taro.showLoading({
                title,
                mask: true,
            });
        } else {
            Taro.showNavigationBarLoading();
        }
    }

    /**
     * 加载完毕
     */
    static loaded() {
        let duration = 0;
        if (this.isLoading) {
            this.isLoading = false;
            if (Taro.hideLoading) {
                Taro.hideLoading();
            } else {
                Taro.hideNavigationBarLoading();
            }
            duration = 500;
        }
        return new Promise((resolve) => setTimeout(resolve, duration));
    }

    /**
     * 弹出提示框
     */
    static success(title, duration = 1500) {
        Taro.showToast({
            title: title,
            icon: "success",
            mask: true,
            duration: duration,
        });
        if (duration > 0) {
            return new Promise((resolve) => setTimeout(resolve, duration));
        }
    }
}
