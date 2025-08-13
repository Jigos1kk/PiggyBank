<template>
  <div class="signup-container">
    <form @submit.prevent="submitForm" class="signup-form">
      <h2>Регистрация</h2>
      <div class="form-group">
        <label for="login">Логин</label>
        <input
          id="login"
          v-model="login"
          type="text"
          placeholder="Введите логин"
          autocomplete="username"
          :class="{ error: errors.login }"
        />
        <span v-if="errors.login" class="error-msg">{{ errors.login }}</span>
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          autocomplete="new-password"
          :class="{ error: errors.password }"
        />
        <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Подтверждение пароля</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          autocomplete="new-password"
          :class="{ error: errors.confirmPassword }"
        />
        <span v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</span>
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? "Регистрация..." : "Зарегистрироваться" }}
      </button>

      <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>
      <div v-if="serverError" class="error-msg">{{ serverError }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignPage",
  data() {
    return {
      login: "",
      password: "",
      confirmPassword: "",
      errors: {},
      loading: false,
      successMessage: "",
      serverError: ""
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.login) this.errors.login = "Логин обязателен";
      if (!this.password) this.errors.password = "Пароль обязателен";
      else if (this.password.length < 6)
        this.errors.password = "Минимум 6 символов";
      if (this.confirmPassword !== this.password)
        this.errors.confirmPassword = "Пароли не совпадают";
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      this.successMessage = "";
      this.serverError = "";
      if (!this.validate()) return;

      this.loading = true;
      try {
        await this.$axios.post("/sign/up", {
          login: this.login,
          password: this.password
        });
        this.successMessage = "Регистрация успешна!";
        this.login = this.password = this.confirmPassword = "";
      } catch (err) {
        console.log(err)
        this.serverError = err.response?.data?.error || "Ошибка регистрации";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f8fb;
}
.signup-form {
  background: #fff;
  padding: 2.2rem 2rem 2rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  max-width: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.signup-form h2 {
  margin-bottom: .4rem;
  font-size: 1.7rem;
  font-weight: 500;
  letter-spacing: -.5px;
  color: #222b45;
  text-align: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: .35rem;
}
label {
  color: #607087;
  font-size: 1rem;
  font-weight: 400;
}
input {
  border: 1.5px solid #e2e8f0;
  border-radius: 0.45rem;
  padding: 0.65rem 1rem;
  font-size: 1.08rem;
  color: #222b45;
  outline: none;
  background: #f8fafc;
  transition: border-color 0.2s;
}
input:focus {
  border-color: #5179f3;
  background: #fff;
}
input.error {
  border-color: #eb2f2f;
}
.submit-btn {
  padding: 0.78rem 0;
  background: linear-gradient(90deg,#5179f3,#3c54bb);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.17rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: box-shadow .18s;
  box-shadow: 0 1.5px 10px rgba(81,121,243,.10);
}
.submit-btn:disabled {
  opacity: .7;
  pointer-events: none;
}
.error-msg {
  color: #eb2f2f;
  font-size: 0.98rem;
  margin-top: 0.1rem;
}
.success-msg {
  color: #219469;
  font-size: 1.05rem;
  margin-top: .35rem;
  text-align: center;
}
</style>