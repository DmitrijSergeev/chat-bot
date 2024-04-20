import {instance} from "@/common/api/api";

export type RegisterResType = {
    msg: string;
    status: StatusRegister;
};
export type StatusRegister = "AWAITING" | "EXISTS" | "OK";

export type ProfileResType = {
    id: number;
    email: string;
    has_access: null | boolean;
    has_used_demo: null | boolean;
    access_expiry_moment: Date | string | null;
    avito_accounts: AvitoAccountType[];
    vk_accounts: VkAccountType[];
    is_admin: boolean;
};
export type VkAccountType = {
    id: number;
    user_id: number;
};
export type AvitoAccountType = {
    id: number;
    user_id: number;
    token_expires: number;
};
type AuthEndpointsType = {
    reg: "user/reg";
    login: "user/token";
    profile: "user/profile";
    changePass: "user/change_password";
    resetPass: "user/request_password_reset";
    setNewPass: "user/set_new_password";
    confirmReg: "user/confirm_reg";
    reconfirmReg: "user/reconfirm_reg";
    requestDemo: "user/request_demo";
};

const authEndpoints: AuthEndpointsType = {
    reg: "user/reg",
    login: "user/token",
    profile: "user/profile",
    changePass: "user/change_password",
    resetPass: "user/request_password_reset",
    setNewPass: "user/set_new_password",
    confirmReg: "user/confirm_reg",
    requestDemo: "user/request_demo",
    reconfirmReg: "user/reconfirm_reg",
};

export const authAPI = {
    profile: (token: { token: string }) => {
        return instance.get<ProfileResType>(authEndpoints.profile, {
            headers: { Authorization: `Bearer ${token.token}` },
        });
    },
}