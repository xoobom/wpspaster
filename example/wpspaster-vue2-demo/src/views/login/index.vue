<template>
  <div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">
            登录
          </h3>
        </div>

        <el-form-item prop="username">
          <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" autocomplete="on" />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
              @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
          登录
        </el-button>

        <div style="position:relative">
          <div class="right">
            <el-button type="text" @click="showDialog=true">
              其他登录方式
            </el-button>
            <el-button type="text" @click="showResetPassword=true">
              忘记密码？
            </el-button>
          </div>
        </div>
      </el-form>
    </div>

    <el-dialog title="其他登录方式" :visible.sync="showDialog" width="500px">
      <social-sign />
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="showResetPassword" width="500px" @close="resetPasswordClose">
      <el-form ref="resetPasswordForm" :model="resetPasswordForm" label-width="55px">
        <template v-if="!showNewPassword">
          <el-form-item>
            <el-input v-model="resetPasswordForm.usename" placeholder="账号" style="width:350px" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="resetPasswordForm.phone" placeholder="手机号码" style="width:350px" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="resetPasswordForm.code" placeholder="短信验证码" style="width:120px" />
            <el-button class="ml15" @click="getCode">
              <span v-if="!showCount">获取验证码</span>
              <span v-if="showCount">{{ timeCount }}s后重新获取</span>
            </el-button>
          </el-form-item>
        </template>
        <el-form-item v-if="showNewPassword">
          <el-input v-model="resetPasswordForm.newPassword" placeholder="新密码" style="width:350px" />
        </el-form-item>
        <el-form-item v-if="showNewPassword">
          <el-button type="primary" style="width:350px;" @click="confirmFunc">
            确定
          </el-button>
        </el-form-item>
        <el-form-item v-if="!showNewPassword">
          <el-button type="primary" style="width:350px;" @click="resetFunc">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';

export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      showResetPassword: false,
      resetPasswordForm: {
        username: '',
        phone: '',
        code: '',
        newPassword: '',
      },
      timeCount: null,
      timer: null,
      showCount: false,
      showNewPassword: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  destroyed() {
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z');
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    getCode() {
      const timeCount = 60;
      if (!this.timer) {
        this.timeCount = timeCount;
        this.showCount = true;
        this.timer = setInterval(() => {
          if (this.timeCount > 0 && this.timeCount <= timeCount) {
            this.timeCount--;
          } else {
            this.showCount = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //重置
    resetFunc() {
      this.showNewPassword = true;
    },
    //确定
    confirmFunc() {
    },
    //重置密码弹窗关闭
    resetPasswordClose() {
      this.showNewPassword = false;
      this.timeCount = null;
      this.resetPasswordForm = {
        username: '',
        phone: '',
        code: '',
        newPassword: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
