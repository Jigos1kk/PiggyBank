const axios = require('axios');

const API_URL = process.env.API_URL;

class ApiService {
  /**
   * Создает HTTP клиент с базовой конфигурацией
   */
  static createClient() {
    return axios.create({
      baseURL: API_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Регистрирует пользователя через API
   */
  static async registerUser(userData) {
    const client = this.createClient();
    
    try {
      const response = await client.post('/user/add', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      
      return {
        success: false,
        error: {
          status: error.response?.status,
          message: error.response?.data?.message || 'Ошибка соединения с сервером',
          details: error.response?.data,
        },
      };
    }
  }
}

module.exports = ApiService;