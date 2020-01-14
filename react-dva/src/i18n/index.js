import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
// import zh from "react-intl/locale-data/zh";
import zh_CN from "./zh_CN";
import en_US from "./en_US";

addLocaleData(en);
// addLocaleData(zh);

export const mappings = {
    // ZH_CN: "zh",
    EN_US: "en"
};
export const i18n = {};
// i18n[mappings.ZH_CN] = zh_CN;
i18n[mappings.EN_US] = en_US;




