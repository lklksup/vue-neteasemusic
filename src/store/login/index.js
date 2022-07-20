import {reqCellPhoneByCode, reqCellPhoneByPassword,reqDetail,reqLogout} from '@/api'
import {setCookie,getCookie,removeCookie} from '@/utils/cookie'
import { setUserId,getUserId,removeUserId } from '@/utils/userId'
const state={
    code:0,
    cookie:getCookie(),
    userId:getUserId(),
    userInfo:{},
}
const mutations={
    updateToken(state,cookie){
        setCookie(cookie);
        state.cookie = cookie;
    },
    updateUserInfo(state,userId){
        setUserId(userId);
        state.userId = userId;
    },
    getUserInfo(state,userInfo){
        state.userInfo = userInfo;
    },
    exit(state){
        state.userInfo = {};
        state.userId = "";
        state.token = "";
        removeCookie();
        removeUserId();
    }
}
const actions={
    //二维码更新Token
    updateToken({commit},cookie){
        commit('updateToken',cookie);
    },
    //手机验证码更新Token
    async updateTokenWithCode({commit},{phone,code}){
        try{
            let result = await reqCellPhoneByCode(phone,code);  
            if(result.code == 200){
                commit('updateToken',result.cookie);
                commit('updateUserInfo',result.profile);
            }       
        }catch(error){
            alert(error);
        }
    },
    //密码更新Token
    async updateTokenWithPassword({commit},{phone,password}){
        try {
            let result = await reqCellPhoneByPassword(phone,password);    
            if(result.code == 200){
                commit('updateToken',result.cookie);
                commit('updateUserInfo',result.account.id);
            }
        } catch (error) {
            alert(error);
        }
        
    },
    //获取用户信息
    async getUserInfo({commit},id){
        let result = await reqDetail(id,localStorage.getItem('COOKIE'));
        commit('getUserInfo',result);
    },
    //退出登录
    async exit({commit}){
        await reqLogout();
        commit('exit');
    }
}
const getters={

}

export default{
    state,
    mutations,
    actions,
    getters
}