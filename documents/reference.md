# 목차
- [목차](#목차)
- [개요](#개요)
- [NestJS 개요](#nestjs-개요)
  - [기본 구조](#기본-구조)
    - [기본 파일](#기본-파일)
  - [object](#object)
  - [decorator](#decorator)
- [package](#package)
  - [script](#script)
    - [test](#test)
- [기타 정보](#기타-정보)
  - [관련 용어나 기법](#관련-용어나-기법)
    - [dependency injection](#dependency-injection)
  - [insumnia](#insumnia)
  - [RESTful API](#restful-api)
  - [fastify](#fastify)
  - [jest](#jest)
    - [$.spec.ts](#spects)
      - [describe](#describe)
      - [it](#it)
        - [test-function](#test-function)
      - [beforeEach](#beforeeach)
      - [afterEach](#aftereach)
      - [beforeAll](#beforeall)
      - [afterAll](#afterall)
    - [test/app.e2e-spec.ts](#testappe2e-spects)
    - [참고](#참고)
- [기타 라이브러리](#기타-라이브러리)
  - [nestcli](#nestcli)
  - [@nestjs/mapped-types](#nestjsmapped-types)
  - [class-validator](#class-validator)
    - [@IsString()](#isstring)
    - [@IsNumber()](#isnumber)
    - [IsOptional()](#isoptional)
  - [class-transformer](#class-transformer)

# 개요
본 강의를 진행하면서 정리한 내용이나 기타 참고 자료를 기재한 문서이다.

# NestJS 개요
## 기본 구조
### 기본 파일
- main.ts // **NestJS**의 진입점 역할을 해주는 파일. 반드시 `main.ts`라는 명칭을 가지고 존재해야 한다.
- app.module.ts // 애플리케이션 루트 모듈.
  - `@Module`
    - `controller` // url을 가져오고 함수를 실행하는 함수. **express**의 라우터와 같은 존재. 기본적으로 `AppController`를 이용한다.
- app.controller.ts // 애플리케이션의 동작을 담당하는 모듈. 해당 파일 내에서는 오로지 url 입력과 그에 대응되는 함수를 호출하는 코드만 포함하고, 구체적인 구현은 `app.service.ts` 등 다른 파일로 분리하는 것을 권장한다.
  - `@Controller($entryPoint) $AppController` // controller 역할을 하는 클래스. `$entryPorint`의 값에 따라 대응되는 시작점이 결정된다. 비워져 있으면 루트 경로에 대응된다.
- app.service.ts // 애플리케이션의 구체적인 동작 구현을 담당하는 모듈.

## object
- `@nestjs/common`
  - `ValidationPipe($option, ...` // 검증용 파이프. app 동작 중 검증에 걸린 요소가 존재할 시 예외를 발생시키며 그 사유를 출력함.
    - `$opiton`
      - `whitelist: boolean` // true 일 시 검증용 decorator가 붙어있지 않은 모든 속성에 대한 입력은 무시된다. 단 그런 입력이 포함되어도 예외를 발생시키지는 않는다.
      - `forbidNonWhiteListed: boolean` // `whitelist: true`의 강화형으로, 검증용 decorator가 붙어있지 않은 입력이 발생하면 예외를 발생시킨다.
      - `transform: boolean` // 만약 요청을 처리하는 함수의 입력이 문자열이 아닌 경우(숫자 등) 자동으로 변환을 시도한다.

## decorator
- `@nestjs/common`
  - `@Module($moduleObject)` // 모듈을 구성하는 각 요소를 명시해주는 decorator
    - $moduleObject: `{ imports: , controllers: , provider: }`
  - `@Get($url)` // get 요청에 대응하는 함수를 지정하는 decorator.
    - `@Query('$key')` // 주소창에 `?` 이후 오는 질의 문장 중에서 `$key`에 해당하는 것의 값을 추출해 다음 인수에 반영한다.
    - `@Req()` // **express**의 `request` 객체를 받아 다음 인수에 대입한다. 단, 이는 **fastify**와의 호환성을 해치므로 (느려지므로) 권장하지 않는다. 
    - `@Res()` // **express**의 `response` 객체를 받아 다음 인수에 대입한다. 단, 이는 **fastify**와의 호환성을 해치므로 권장하지 않는다.
  - `@Get("$path/:$id")` // get 요청에 대응하는 특수한 형태로, `:$id` 부분이 임의의 문자열에 모두 대응한다. 해당 부분의 내용이 다른 서로 다른 get 요청에 대해서도 동일한 함수를 호출하며, 대신 그 때 `$id`에 대응된 값은 `@Param('$id')`로 추출해낼 수 있다.
    - `@Param('$id')` // `@Get('/:$id')`를 사용한 경우, 다음의 인수를 해당 id 값으로 대응하도록 지정한다.
  - `@Post($url)` // post 요청에 대응하는 함수를 지정하는 decorator. 이외의 특성은 `@Get($url)`과 동일하다.
    - `@Body()` // `post` 요청에 포함된 `request.body` 데이터를 추출하여 다음 인수에 반영한다.
  - `@Put($url)` // put 요청에 대응하는 함수를 지정하는 decorator. 이외의 특성은 `@Post($url)`과 동일하다.
  - `@Patch($url)` // patch 요청에 대응하는 함수를 지정하는 decorator. 이외의 특성은 `@Post($url)`과 동일하다.
  - `@Delete($url)` // delete 요청에 대응하는 함수를 지정하는 decorator. 이외의 특성은 `@Post($url)`과 동일하다.

# package
## script
### test
- test // 일반적인 jest 실행
- test:watch // `jest --watch`를 실행함. 상호작용 모드로 테스트 실행
- test:cov // `jest --coverage`를 실행함
- test:debug // 유닛 테스팅을 할 때 사용.
- test:e2e // end-to-end 테스팅을 할 때 사용.

# 기타 정보
## 관련 용어나 기법
### dependency injection
한글로 번역하면 **의존관계 주입**이라고 부를 수 있는 것으로, 의존 관계가 컴파일 시점이 아닌 런타인 시점에 확정되도록 하여 결합도를 낮추는 방법이다. 

예를 들어 `A class`가 있고, 그것과 의존 관계가 설정될 수 있는 `B, C class`가 있다고 할 때 기존에 `B class` 였던 것이 `C class`로 변경된다면 `A class` 내부에서 이에 대한 변경 사항을 반영해주어야 한다. 하지만 이는 결합도가 높아지므로 좋은 방법이 아니다. 

때문에 이를 해결하기 위해 `A class`는 `B class`를 직접 import 해서 사용하는 대신 `B class`를 포함하는 포괄적인 인터페이스만을 취한다. 그리고 구체적인 구현은 상위 코드에서 `B class`를 입력으로 넣어줌으로써 전달한다. 이렇게 하면 만약 `B class`가 아닌 `C class`를 할당해야 하는 경우에도 `A class`는 건들지 않고서도 상위 코드에서 입력값만 바꿔주는 것으로 쉽게 해결할 수 있게 된다. 

**nestjs**에서는 `@Module`, `@controller`, `@injectable` 에서 볼 수 있는데, **nestjs**는 `@Module{ provider }`에 할당된 클래스를 자동으로 `@Module{ controller }`의 생성자로 넣어준다. 덕분에 `@controller`는 실 동작 구현과 분리되어 일종의 인터페이스처럼 동작할 수 있게 되며, 동일한 인터페이스를 가지고 있다면 `@injectable`으로 정의된 구현 파일이 통째로 교채되어도 `@controller`를 수정할 필요가 없다.

## insumnia
웹 통신을 인위적으로 시도해볼 수 있는 프로그램. get 뿐만 아니라 post, delete, put, patch 등 다양한 통신 시도를 테스트해볼 수 있다. 무료로 제공됨.

## RESTful API
- get: 데이터를 질의할 때 사용한다. `id`를 지정하냐 안하냐에 따라 특정 자료만 추출하거나 전체 자료를 추출하거나 한다. url을 사용하며, 그 내용이 공개되고 북마크 형태로 저장될 수 있다.
- post: 데이터를 서버에 전송할 때 사용한다. 전송 내용은 헤더에 숨겨지며, 북마크할 수 없다. 이하 3개도 동일한 특성을 지닌다.
- put: 서버의 데이터를 수정할 때 사용한다. 변경할 레코드의 모든 속성값을 전부 새로 지정해준다. 생략된 속성은 지워진다.
- patch: 서버의 데이터를 수정할 때 사용한다. 변경할 레코드의 특정 속성값만 제공하며, 나머지는 기존 값을 사용한다.
- delete: 서버의 데이터를 삭제할 때 사용한다.

## fastify
**express**와 유사하지만 2배의 속도로 구동되는 프레임워크이다. **nestjs**는 이 두개의 프레임워크 위에서 구동될 수 있다.

## jest
javascript 환경에서 테스트를 지원하는 라이브러리이다. javascript 뿐만 아나라, typescript, babel, node.js, react, angular, ...와 같은 javascript-family 환경에서 모두 테스트를 지원해준다. 

### $.spec.ts
**jest**를 이용한 unit test 에서 실행할 테스트 목록을 정의한 파일.

#### describe
```ts
describe($test_group_name: string, () => {
  describe($sub_test_group_name: string, () => { $sub_test_contents_list })
  ...
  it($test_case_name: string, () => { $test_contents })
  ...
})
```

테스트 그룹을 명시한 파일. 다른 `describe`를 하위 그룹으로 포함할 수도 있다.

#### it
`it($test_case_name: string, () -> { $test_contents })`

특정 모듈에 대한 개별 유닛 테스트를 지정한 것. `$test_function`의 결과물에 따라 테스트 성공 여부를 판단한다.

`it.todo($message)` // 테스트 해야 하는 항목을 메모할 때 사용한다. 별도의 테스트를 수행하지는 않지만 출력창에서 연필 모양으로 표시된다.

##### test-function
- `expect($test_target)` // 테스트하고자 하는 값을 지정한다. 이는 보통 함수의 결과값으로 지정한다.
- `expect($test_target).toEqual($expect_value)` // `$test_target === $expect_value`이면 성공, 아니면 실패한다.
- `expect($test_target).toBeLessThan($value)` // `$test_target < $value`이면 성공, 아니면 실패한다.
- `expect($test_target).toBeDefined()` // `$test_target !== undefined`이면 성공, 아니면 실패한다.
- `expect($test_target).toBeInstanceOf($target)` // `$test_target`이 `$target`의 instance 이면 성공, 아니면 실패한다.

#### beforeEach
`describe` 내 각각의 `it`들을 테스트하기 전 실행하는 동작을 지정한다.

#### afterEach
`describe` 내 각각의 `it`들을 테스트 한 후 실행하는 동작을 지정한다.

#### beforeAll
`describe` 내 `it`들의 테스트를 시작하기 전에 지정한 함수를 먼저 실행한다. 테스트용 임시 데이터를 생성하는 코드 등이 들어간다.

#### afterAll
`describe` 내 `it`들의 테스트를 완료한 후 지정한 함수를 실행한다. `beforeAll`로 생성한 임시 데이터를 테스트 종료 후 제거할 때 등 사용한다.


### test/app.e2e-spec.ts
**end to end test**를 위해 사용되는 파일으로 nestjs 프로젝트 생성 시 `test` 파일 아래 기본 제공된다. `npm run test:e2e` 명령을 통해 해당 파일에 정의된 **e2e test case**를 확인할 수 있다.

`describe`, `it` 등은 `$.spec.ts`와 동일하다. 

### 참고
test 시 생성되는 **app**은 디버그나 서비스용으로 생성한 어플리케이션과 전혀 다른 객체이다. 때문에 만약 `main.ts`에서 **app**에 별도의 파이프라인을 연결해두었다면 테스트 환경에서도 이를 연결해주어야만 동일한 결과를 볼 수 있다. 

그 외 기본 코드는 매 **it**마다 새로 앱을 생성하도록 설정되어 있는데, 이것이 필요치 않다면 `beforeEach -> beforeAll`으로 바꿔주는 것으로 효율을 챙길 수 있다.

# 기타 라이브러리
## nestcli
cli 환경에서 nest.js 코딩을 편리하게 하는 몇몇 기능들을 제공하는 cli 라이브러리.

## @nestjs/mapped-types
**nestjs**에서 타입을 변환시키고 사용할 수 있게 해주는 패키지

## class-validator
클래스의 각 속성에 대한 유효성 검증을 제공해주는 다양한 기능을 가진 라이브러리. 각 확인용 `decorator`는 조건이 맞는지 확인하고 만약 맞지 않는 경우가 존재하면 그 경우를 모았다가 예외를 발생시키며 그 내용을 메시지로 모아 출력한다. 기타 자세한 내용은 다음 링크 참고.

[class-validator github repository](https://github.com/typestack/class-validator)

### @IsString()
다음 줄에 나오는 인수가 `string` 유형인지 확인해준다.

- `@IsString({ each: true })` // 다음 줄이 배열 유형인 경우 각각의 원소에 대해 검사하도록 한다.

### @IsNumber()
다음 줄에 나오는 인수가 `number` 유형인지 확인해준다.

### IsOptional()
다음의 수식되는 속성은 생략될 수 있도록 지정.

## class-transformer

