<template>
    <el-menu 
        mode="vertical" 
        default-active="2" 
        @open="handleOpen" 
        @close="handleClose"
        background-color="#0d5ab1"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {};
    },
    methods: {
        handleOpen() {},
        handleClose() {}
    }
};
</script>

<style lang="less" scoped>
@import "../../themes/default.less";
.el-menu {
    border-right: solid 1px @bg-color-lever2;
}
.el-submenu__title i,
.el-menu-item i {
    color: @font-color-default;
}
.el-menu-item.is-active i {
    color: #ffd04b;
}
</style>

