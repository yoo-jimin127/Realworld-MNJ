import { atom, selector } from 'recoil';
import { getUserInfo } from '../apis';
import { UserInfo } from '../apis/types';

/** 로그인 여부 */
export const loginState = atom({
  key: 'loginState',
  // TODO : 새로고침 시 로그인 여부 변경 방지를 위해 토큰 값 저장 여부로 default값 셋팅하는 로직 추가
  default: !!localStorage.getItem('token'),
});

/** user 정보 selector */
const userStateSelector = selector<UserInfo>({
  key: 'userStateSelector',
  get: async ({ get }) => {
    const logined = get(loginState);
    console.log(logined);
    if (logined) {
      const { user } = await getUserInfo();
      return user;
    }

    return {
      email: '',
      token: '',
      username: '',
      bio: '',
      image: '',
    };
  },
});

/** user 정보 관리 */
export const userState = atom<UserInfo>({
  key: 'userState',
  default: userStateSelector,
});
