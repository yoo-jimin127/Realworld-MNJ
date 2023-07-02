import { atom } from 'recoil';

/** 로그인 여부 */
export const loginState = atom({
  key: 'loginState',
  // TODO : 새로고침 시 로그인 여부 변경 방지를 위해 토큰 값 저장 여부로 default값 셋팅하는 로직 추가
  default: false,
});

/** user 정보 관리 */
export const userState = atom({
  key: 'userState',
  default: {
    username: '',
    email: '',
    password: '',
    image: '',
    bio: '',
  },
});
