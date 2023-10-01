import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class AuthService {
  static async register(registration: any): Promise<any> {
    try {
      const response = await axios.post<any>(
        `${BASE_URL}/auth/register`,
        registration
      );
      const authData = response.data;
      AuthService.setAccessToken(authData.token);
      return authData; //.user;
    } catch (error) {
      console.error("Error registering user: ", error);
      throw new Error("Error registering user");
    }
  }

  static async forgotPassword(email: string): Promise<any> {
    try {
      const response = await axios.post<any>(
        `${BASE_URL}/auth/forgot-password`,
        { email }
      );
      return response;
    } catch (error) {
      console.error("Error send email: ", error);
      throw new Error("Error send email");
    }
  }

  static async changePassword(password: string, token: string): Promise<any> {
    try {
      const response = await axios.post<any>(
        `${BASE_URL}/auth/change-password`,
        { password, token }
      );
      return response;
    } catch (error) {
      console.error("Error change password: ", error);
      throw new Error("Error change password");
    }
  }

  static async login(any: any): Promise<any> {
    const response = await axios.post<any>(`${BASE_URL}/auth/login`, any);
    const authData = response.data;
    AuthService.setAccessToken(authData.token);
    return authData; //.user;
  }

  static async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    try {
      const response = await axios.post<{ token: string }>(
        `${BASE_URL}/auth/refresh-token`,
        { refreshToken }
      );
      const newToken = response.data.token;
      localStorage.setItem("accessToken", "newToken");
      return "newToken";
    } catch (error) {
      console.error(error);
      throw new Error("Failed to refresh token");
    }
  }

  static async newsletter({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<string> {
    try {
      const response = await axios.post(`${BASE_URL}/newsletter`, {
        email,
        name,
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error subscribing to newsletter: ", error);
      throw new Error("Error subscribing to newsletter");
    }
  }

  static async update(data: any): Promise<any> {
    const accessToken = AuthService.getAccessToken();
    if (!accessToken) {
      throw new Error("Token not found");
    }

    const response = await axios.put<any>(
      `${BASE_URL}/users/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const authData = response.data;
    AuthService.setAccessToken(authData.token);
    return authData; //.user;
  }

  static async delete(id: any): Promise<any> {
    const accessToken = AuthService.getAccessToken();
    if (!accessToken) {
      throw new Error("Token not found");
    }

    const response = await axios.delete<any>(`${BASE_URL}/users:${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const authData = response.data;
    AuthService.setAccessToken(authData.token);
    return authData; //.user;
  }

  static async logout(): Promise<void> {
    AuthService.removeAccessToken();
  }

  static async isLoggedIn(): Promise<boolean> {
    const accessToken = AuthService.getAccessToken();
    if (!accessToken) {
      return false;
    }
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async checkTokenValidity() {
    const token = AuthService.getAccessToken();
    if (!token) {
      return false;
    }

    try {
      const response = await axios.get(`${BASE_URL}/auth/check-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  private static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  private static setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  private static removeAccessToken(): void {
    const accessToken = AuthService.getAccessToken();
    if (!accessToken) {
      return;
    }
    localStorage.removeItem("accessToken");
  }
}
