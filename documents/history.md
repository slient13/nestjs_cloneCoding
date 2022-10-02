- [개요](#개요)
- [log](#log)
  - [1.0 overview](#10-overview)
  - [1.1 Controllers](#11-controllers)
  - [1.2 Services](#12-services)
  - [2.0 Movies Controller](#20-movies-controller)
  - [2.1 More Routes](#21-more-routes)
  - [2.2 movie service part 1](#22-movie-service-part-1)
  - [2.3 movie service part 2](#23-movie-service-part-2)
  - [2.4 DTOs and validation part 1](#24-dtos-and-validation-part-1)
  - [2.5 DTOs and validation part 2](#25-dtos-and-validation-part-2)
  - [2.6 Modules and dependency injection](#26-modules-and-dependency-injection)
  - [2.7 Express on nestjs](#27-express-on-nestjs)
  - [3.0 introduction to testing in nest](#30-introduction-to-testing-in-nest)
  - [3.1 your first unit test](#31-your-first-unit-test)
  - [3.2 testing getall and getone](#32-testing-getall-and-getone)
  - [3.3 testing delete and create](#33-testing-delete-and-create)
  - [3.4 testing update](#34-testing-update)

# 개요
본 강의를 진행하면서 무엇을 하였는지를 기록하는 문서이다. 어떠한 과정을 거치며 학습에 임했는지를 파악할 수 있도록 도우며, 유사시 복구를 위해 사용된다.

# log
## 1.0 overview
- spec 파일 제거
- 명령 `npm run start:dev` 실행
- `localhost:3000` 접속 -> `Hello World!` 라는 글씨 확인.

## 1.1 Controllers
- `src/app.controller.ts` 파일 내 `/custom` 이라는 get 통신에 대응하여 `custom string`이라는 문자열을 반환하는 함수 지정.
- 주소창에 `/custom`을 추가로 붙여 `custom string`이라는 문자가 출력됨을 확인.

## 1.2 Services
- `app.controller.ts/getCustom()` 함수 내 내용을 `app.services.ts/AppService`로 분리.
- 주소창에 `/custom`을 추가로 붙여 `custom string`이라는 문자가 출력됨을 확인.
- `app.controller.ts`, `app.services.ts` 파일을 제거하고 `app.module.ts/@Module` 내 내용을 비움.
- **commit** 수행

## 2.0 Movies Controller
- **nest cli**의 `nest generate controller`(약칭: `nest g co`) 명령을 이용해 `movies`라고 하는 이름을 가진 컨트롤러 생성.
- 파일 변경 확인
  - 생성 파일: `movies/{ movies.controller.ts, movies.controller.spec.ts }`
  - 생성 클래스: `movies.controller.ts/MoviesController`
  - 파일 내용 변경: `app.module.ts`에 자동으로 import 되었으며 `app.module.ts/@Module.controller`에 자동으로 추가됨.
- 파일 제거 { 대상: movies/controller.spec.ts, 사유: "당장은 필요 없음" }

- 수정: `movies.controller.ts/MoviesController` 
  - 추가: `@Get() getAll()` 
- 실행 확인. `기대 출력: "This will return all movies"`
  - { url: "/", 결과: 404 에러 }
  - { url: "/movies", 결과: 성공 }
- `movies.controller.ts` 수정
  - `@Controller()` 안의 값이 `'movies'`로 되어 있는 것 확인. 이를 제거.
- 실행 확인. `기대 출력: "This will return all movies"`
  - { url: "/", 결과: 성공 }

- 수정: `movies.controller.ts/MoviesController` 
  - 추가: `@Get("/:id") getOne()` 
- 실행 확인. `기대 출력: "This will return one movie"`
  - { url: "/1", 결과: 성공 }

- 수정: `movies.controller.ts/MoviesController` 
  - `@Get("/:id") getOne()` -> `@Get("/:id") getOne(@Param('id') id: string)` 
    - 목적: `id`로 입력된 숫자값을 추출해 받아오기 위함.
- 실행 확인.
  - { url: "/1", 기대 출력: "This will return one movie with the id: 1", 결과: 성공 }
  - { url: "/33", 기대 출력: "This will return one movie with the id: 33", 결과: 성공 }

- 수정: `movies.controller.ts/MoviesController` 
  - 추가: `@Post() create()`
  - 추가: `@Delete("/:id") delete(@Param('id') id: string)`
  - 추가: `@Patch("/:id") patch(@Param('id') id: string)`

## 2.1 More Routes
- 수정: `movies.controller.ts/MoviesController` 
  - `@Post()`, `@Patch(':/id')`가 수식하는 함수에 `@Body()` 인수 추가. 
    - 입력값을 확인할 수 있도록 내용 수정.
  - `@Get('/search') search()` 추가
- 실행 확인:
  - { 입력: "/search", 결과: `search` 부분이 id로 인식되어 `/:id`에 매핑되어버림 }
    - 해결책: `@Get("/search")`를 `@Get("/:id")` 보다 위로 옮김.
    - 재실행 결과: 성공
- 수정: `movies.controller.ts/MoviesController` 
  - `@Get('/search')`의 인수로 `@Query("year")` 추가. 
    - 이를 확인할 수 있도록 내용 수정.

## 2.2 movie service part 1
- CLI: `nest generate service movices`
  - 파일 생성: `movies/movies.service.ts`, `movies/movies.service.spec.ts`
- 파일 생성: `movies/entities/movie.entity.ts` // `Movie` 클래스 정의.
- 생성자 추가: `movies/movies.controller.ts` / `constructor(private readonly moviesService: MoviesService)`
- 메서드 분리: `movies/movies.controller.ts` -> `movies/movies.service.ts` / `create()`, `getAll()`, `getOne()`, `deleteOne()`
- 확인: **insomnia**를 통해 메모리 환경에서 DB처럼 동작함을 확인. (서버 재시작 시 초기화 확인)

## 2.3 movie service part 2
- 메서드 분리: `movies/movies.controller.ts` -> `movies/movies.service.ts` / `update()`

## 2.4 DTOs and validation part 1
- 파일 생성: `movies/dto/create-movie.dto.ts` // 입력 파일 유형을 정의. `CreateMovieDTO` 정의 
  - `CreateMovieDTO`의 각 속성에 대해 `class-validator`의 검증용 decorator를 추가.
- `main.ts` 파일에 검증용 파이프 추가: `app.useGlobalPipes(new ValidationPipe());`
  - `ValidationPipe`의 입력으로 옵션 추가
    - `whitelist: true` 옵션 추가 // **검증용 decorator**가 포함되지 않은, 즉 **DTO**에 정의되지 않은 속성이 무시됨.
    - `forbidNonWhiteListed: true` 옵션 추가 // **검증용 decorator**가 포함되지 않은, 즉 **DTO**에 정의되지 않은 속성이 입력으로 들어올 시 예외를 발생함.
    - `transform: true` 옵션 추가 // 입력을 받아 처리하는 함수가 `string`이 아닌 유형을 인수로 받는 경우 변환을 시도.

## 2.5 DTOs and validation part 2
- 파일 생성: `movies/dto/update-movie.dto.ts` // 입력 파일 유형을 정의. `UpdateMovieDTO` 정의
  - `CreateMovieDTO`와 유사하지만 각 속성의 자료형이 `undefined`를 수용할 수 있도록 함. (`title?: string`과 같이)
- `UpdateMovieDTO`를 `updateDate`들의 자료 유형으로 대치
- 확인: 에러 발생. 단순히 typescript에서 대응 속성을 변환시키는 것으로는 해결되지 않음.
- `UpdateMovieDTO`의 모든 속성에 대해 `class-validator/@IsOptional()` 옵션을 추가.
- 확인: 옵션을 생략해도 오류가 발생하지 않으며, 기대한 동작을 함.
- `UpdateMovieDTO`가 `@nestjs/mapped-type/PartialType(CreateMovieDTO)`을 상속받도록 수정하고 내용을 전부 지움
- 확인: 옵션을 생략해도 오류가 발생하지 않으며, 기대한 동작을 함.

## 2.6 Modules and dependency injection
- 명령어 입력: `nest generate module movies`
  - 파일 생성: `movies/movies.module.ts`
  - `app.module.ts/@Module{ imports }`가 `MoviesModule`이 됨.
- 이동: `app.module.ts/@Module{ controllers, providers }` -> `movies/movides.module.ts/@Module{ controllers, providers }`
- 변경: `movies/movies.controller.ts/@controller()` -> `@controller(movies)` // 이제 movies 관련된 기능은 `/movies/`에서 동작함.
- 명령어 입력: `nest generate conroller app`
- 이동: `app/app.controller.ts` -> `app.controller.ts`
- 수정: `app.controller.ts`
  - 진입점을 루트 노드로 수정(비워줌)
  - `@Get()`에 대해 적당한 문자열을 반환하는 함수 연결.
- 명령어 입력: `nest generate provider app`

## 2.7 Express on nestjs
- 수정사항 없음.

## 3.0 introduction to testing in nest
- 수정사항 없음.

## 3.1 your first unit test
- 수정: `movies/movies.service.spec.ts`
  - 추가: `it("= 4", () => expect(2+3).toEqual(4) )`
- jest 실행. 결과: 실패
  - 수정: `it("= 4", () => expect(2+2).toEqual(4) )`
- jest 실행. 결과: 성공
  - 제거: `it("= 4", ...)`

## 3.2 testing getall and getone
- 수정: `movies/movies.service.spec.ts`
  - describe 추가: **getAll**
    - it 추가: **should return an array**
      - `const result = service.getAll()`
      - `expect(result).toBeInstanceOf(Array)`
- jest 실행. 결과: 성공
수정: `movies/movies.service.spec.ts`
  - describe 추가: **getOne**
    - 임시 데이터 생성 코드 추가
    - it 추가: `id = 1`인 데이터를 조회했을 때 결과가 존재하면 성공, 존재하지 않으면 실패.
    - it 추가: `id = -1`인 데이터를 조회했을 때 예외가 발생하면 성공, 그렇지 않으면 실패.
- jest 실행. 결과: 성공

## 3.3 testing delete and create
- 수정: `movies/movies.service.spec.ts`
  - describe 추가: **deleteOne**
    - it 추가: `id = 1`인 데이터를 삭제했을 때 데이터 목록의 길이가 줄어있으면 성공, 존재하지 않으면 실패.
    - it 추가: `id = -1`인 데이터를 삭제했을 때 예외가 발생하면 성공, 그렇지 않으면 실패.
  - describe 추가: **create**
    - it 추가: `CreateMoviesDTO` 규격에 맞춘 입력을 넣었을 때 총 목록 숫자가 1 증가하면 성공, 그렇지 않으면 실패.
- jest 실행. 결과: 성공
- 수정: `movies/movies.service.spec.ts`
  - describe 추가: **create**
    - it 추가 시도: `CreateMoviesDTO` 규격에 맞지 않는 입력을 테스트 케이스로 넣으려고 시도. -> typescript에서 비정상적인 입력 자체를 오류로 감지해서 항시 실패가 발생.

## 3.4 testing update
- 수정: `movies/movies.service.spec.ts`
  - describe 추가: **update**
    - it 추가: `CreateMoviesDTO`의 모든 데이터를 제공했을 때 모든 데이터가 변경되면 성공, 아니면 실패.
    - it 추가: `CreateMoviesDTO.title`에 해당하는 데이터만 제공했을 때 `title`만 변경되면 성공, 변경되지 않거나 다른 것도 변경되면 실패.
    - it 추가: `CreateMoviesDTO.year`에 해당하는 데이터만 제공했을 때 `year`만 변경되면 성공, 변경되지 않거나 다른 것도 변경되면 실패.
    - it 추가: `CreateMoviesDTO.genres`에 해당하는 데이터만 제공했을 때 `genres`만 변경되면 성공, 변경되지 않거나 다른 것도 변경되면 실패.
- jest 실행. 결과: 성공
- 수정: `movies/movies.service.spec.ts`
  - describe 추가: **update**
    - it 추가: `id = -1`인 대상을 변경하려고 시도했을 때 `NotFoundException`이 발생하면 성공, 아니면 실패.
- jest 실행. 결과: 성공
- 명령: `npm run test:cov`
  - `movies/movies.service.spec.ts` 파일에 의해 `movies/movies.service.ts`에 정의된 모든 함수가 테스트됨을 확인.