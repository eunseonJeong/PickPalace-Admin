import { SignUp } from "@clerk/nextjs";

export default function Page() {
  /*
  아래에 SignUp 컴포넌트는 아까 Clerk 사이트에서 Clerk Application 만들 때
  선택했던 UI 기반으로 컴포넌트를 만든 것입니다.
  */
  return <SignUp />;
}