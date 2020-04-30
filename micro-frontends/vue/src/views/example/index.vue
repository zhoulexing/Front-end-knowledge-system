<template>
    <div>
        <div :click="goSearch" class="example">example</div>
        <a-button type="primary">Primary</a-button>
    </div>
</template>

<script>
export default {
    name: "Example",
    components: {

    },
    data() {
        return {
            value: "lingtong"
        };
    },
    methods: {
        goSearch() {
            console.log(this.value);
        }
    }
};
</script>

<style lang="less" scoped>
    .example {
        color: red;
    }
</style>
