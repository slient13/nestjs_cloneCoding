# 개요
본 강의를 진행하면서 무엇을 하였는지를 기록하는 문서이다. 후에 어떠한 과정을 거치며 학습에 임했는지를 파악할 수 있도록 도우며, 유사시 복구를 위해 사용된다.

[log](#log) 내 각 섹션은 위에 있을 수록 최신 변경사항이며, 각 색션 내 내용은 아래로 향할 수록 최신 변경사항이다.

# log
## 1.2 Services
- `app.controller.ts/getCustom()` 함수 내 내용을 `app.services.ts/AppService`로 분리.
- 주소창에 `/custom`을 추가로 붙여 `custom string`이라는 문자가 출력됨을 확인.
- `app.controller.ts`, `app.services.ts` 파일을 제거하고 `app.module.ts/@Module` 내 내용을 비움.
- **commit** 수행

## 1.1 Controllers
- `src/app.controller.ts` 파일 내 `/custom` 이라는 get 통신에 대응하여 `custom string`이라는 문자열을 반환하는 함수 지정.
- 주소창에 `/custom`을 추가로 붙여 `custom string`이라는 문자가 출력됨을 확인.

## 1.0 overview
- spec 파일 제거
- 명령 `npm run start:dev` 실행
- `localhost:3000` 접속 -> `Hello World!` 라는 글씨 확인.