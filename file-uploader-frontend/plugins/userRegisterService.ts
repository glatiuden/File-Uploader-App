import http from './axios';

class UserRegisterService {
    signUp(regInfo: any) {
        return http.post("/api/auth/signup", regInfo);
    }
}

export default new UserRegisterService();
