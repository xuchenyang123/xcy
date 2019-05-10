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
  [USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },
  [TIEZI_INFO](state, {content}) {
    state.tieziInfo.push(content);
  },
  [DELETE_TIEZI_INFO](state, {number, obj}) {
    state.tieziInfo.splice(number, 1);
    for (let i = 0; i < obj.length; i++) {
      let index = state.liuYanInfo.indexOf(obj[i]);
      state.liuYanInfo.splice(index, 1);
    }
  },
  [SEND_LIU_YAN](state, {liuYanInfo}) {
    state.liuYanInfo.push(liuYanInfo);
  },
  [DELETE_LIU_YAN](state, {number}) {
    // console.log(typeof number);
    state.liuYanInfo.splice(number, 1);
  },
  [TEACHER_INFO](state, {teacherInfo}) {
    state.teacherInfo = teacherInfo;
  },
  [PROGRESS_INFO](state, {data}) {
    state.progressInfo.push(data);
  },
  [JOIN_PROGRESSES](state, {idOne, currentTarget}) {
    state.myProgress.push({[idOne]: []});
    for (let i = 0; i < state.myProgress.length; i++) {
      for (let key in state.myProgress[i]) {
        if (key === idOne) {
          state.myProgress[i][key].push(currentTarget);
          state.myProgress.splice(i+1,1);
        }
      }
    }
  },
  [FIND_PROGRESS](state,{data}) {
    state.findProgress.push(data);
  },
  [WORK_MYSELF](state,{data}) {
    state.workMyself = data;
  },
  [ANSWER](state,{answers}){
    state.answer.push(answers);
  },
  [RATE](state,{index,rate}){
    state.answer[index].feedContent = rate;
  },
  [TEACHER_LOGIN_OUT](state){
    state.teacherInfo = {};
  }
}
