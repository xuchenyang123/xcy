import {
  USER_INFO,
  TIEZI_INFO,
  DELETE_TIEZI_INFO,
  SEND_LIU_YAN,
  DELETE_LIU_YAN,
  TEACHER_INFO,
  PROGRESS_INFO,
  JOIN_PROGRESSES,
  FIND_PROGRESS,
  WORK_MYSELF,
  ANSWER,
  RATE,
  TEACHER_LOGIN_OUT
} from './mutation-types'
export default {
  //用户信息
  syncMessage({commit},userInfo){
    commit(USER_INFO,{userInfo});
  },
  //帖子内容
  tieziInfo({commit},content){
    commit(TIEZI_INFO,{content});
  },
  //删除帖子
  deleteTieZi({commit},{number,obj}){
    commit(DELETE_TIEZI_INFO,{number,obj});
  },
  //发表留言
  sendLiuYan({commit},liuYanInfo){
    commit(SEND_LIU_YAN,{liuYanInfo});
  },
  //删除留言
  deleteLiuYan({commit},{number}){
    commit(DELETE_LIU_YAN,{number});
  },

  /**
   * 自动登录,获取用户信息
   */
  // async reqUserInfo({commit}){
  //   const result = await automaticLogin();
  //   console.log(result);
  //   if(200 === result.success_code){
  //     commit(USER_INFO,{userInfo:result.data});
  //   }
  // },
  //教师信息
  teacherMessage({commit},teacherInfo){
    commit(TEACHER_INFO,{teacherInfo});
  },
  //课程信息
  progressMessage({commit},data){
    commit(PROGRESS_INFO,{data});
  },
  //加入课程
  joinProgresses({commit},{idOne,currentTarget}){
    commit(JOIN_PROGRESSES,{idOne,currentTarget});
  },
  //查看自己加入的课程
  findPogress({commit},{data}){
    // console.log(data);
    commit(FIND_PROGRESS,{data})
  },
  //我的作业
  workMyself({commit},{data}){
    commit(WORK_MYSELF,{data})
  },
  //作业批阅-->answer
  answer({commit},{answers}){
    commit(ANSWER,{answers})
  },
  //评分
  rate({commit},{index,rate}){
    console.log(index, rate);
    commit(RATE,{index,rate})
  },
  //退出登录
  teacherLoginOut({commit}){
    commit(TEACHER_LOGIN_OUT)
  }
}
