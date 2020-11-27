import Enum from './index';

export default class Env {
    public static WEAPP = new Enum('weapp', '微信小程序');
	public static ALIPAY = new Enum('alipay', '支付宝小程序');
	public static H5 = new Enum('h5', 'h5');
	public static SWAN = new Enum('swan', '百度小程序');
	public static QQ = new Enum('qq', 'QQ小程序');
}