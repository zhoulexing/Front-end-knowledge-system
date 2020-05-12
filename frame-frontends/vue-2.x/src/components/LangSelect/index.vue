<template>
    <el-dropdown trigger="click" @command="setLanguage">
        <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
            <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: "LangSelect",
    computed: {
        language() {
            return this.$store.getters.language;
        }
    },
    methods: {
        setLanguage(lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch('setLanguage', lang);
            this.$message({
                message: 'Switch Language Success',
                type: 'success'
            });
        }
    }
}
</script>

<style lang="less">
    .el-dropdown-link:hover {
        cursor: pointer;
    }
</style>


