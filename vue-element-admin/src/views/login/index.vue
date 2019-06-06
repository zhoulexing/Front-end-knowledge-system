<template>
    <div class="login-container">
        <el-form ref="loginForm" class="login-form" auto-complete="on" :rules="loginRules" :model="loginForm">
            <div class="form-title">
                <div>{{ $t("login.title") }}</div>
            </div>
            <el-form-item prop="username">
                <el-input 
                    type="text"
                    :placeholder="$t('login.username')"
                    v-model="loginForm.username"
                    auto-complete="on"
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input 
                    type="password"
                    :placeholder="$t('login.password')"
                    v-model="loginForm.password"
                    auto-complete="on"
                />
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin">{{ $t('login.logIn') }}</el-button>
        </el-form>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if(value === "") {
                callback(this.$t('login.message'));
            } else {
                callback();
            }
        };

        return {
            loginForm: {
                username: "admin",
                password: "123456"
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', message: this.$t('login.message') }]
            },
        }
    },

    computed: mapState({
        loading: state => state.global.loading,
        success: state => state.login.success
    }),

    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if(valid) {
                    this.$store.dispatch("doLogin",  { loginForm: this.loginForm, that: this });
                }
            });
        }
    },
}
</script>


<style lang="less" scoped>
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .login-form {
        width: 300px;
    }
    .form-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
</style>



