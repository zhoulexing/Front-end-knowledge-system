<template>
    <div class="header">
        <el-input class="header-input" v-model="value" placeholder="搜索" prefix-icon="el-icon-search"/>
        <div class="header-btn" :click="goSearch">搜索</div>
    </div>
</template>

<script>
    export default {
        name: "Desktop",
        data() {
            return {
                value: ""
            }
        },
        methods: {
            goSearch() {
                console.log(this.value);
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {
        display: flex;
        flex-direction: row;
    }
    .header-input {
        flex: 1;
    }
    .header-btn {
        line-height: 36px;
        margin-left: 10px;
        width: 50px;
        cursor: pointer;
        &:hover {
            color: blue;
        }
    }
</style>

