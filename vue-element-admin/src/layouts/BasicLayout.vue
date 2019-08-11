<template>
    <el-container>
        <el-aside width="200px">
            <div class="logo">
                <img :src="logo">
                <span>{{ TITLE }}</span>
            </div>
            <sidebar />
        </el-aside>
        <el-container>
            <el-header></el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Sidebar from "components/Sidebar";
import logo from "assets/logo.jpg";
import { TITLE } from "@/constants.js";

export default {
    name: "BasicLayout",
    components: {
        Sidebar
    },
    data() {
        return {
            TITLE,
            logo
        };
    }
};
</script>

<style lang="less" scoped>
@import "../themes/default.less";
.el-container {
    width: 100%;
    height: 100%;
}
.el-aside {
    background-color: @bg-color-lever1;
}
.logo {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 22px;
    background-color: @bg-color-lever3;
    img {
        width: 50px;
        vertical-align: -10px;
        margin-right: 8px;
    }
}
.el-header {
    background-color: @bg-color-lever2;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-main {
    color: #333;
}
</style>


