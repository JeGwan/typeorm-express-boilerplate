# express TypeORM TypeScript boilerplate

## 프로젝트 구조

### `./src`

모든 소스코드들의 루트 디렉토리

### `./src/public`

퍼블릭으로 서브해야하는 파일들의 루트 디렉토리

### `./src/routers`

라우터들이 담겨있는 디렉토리

### `./src/schema`

typeorm 으로 정의된 엔티티들이 담겨있는 디렉토리

### ormconfig.js (git으로 추적되지 않음)

typeorm은 해당 파일로 연결 db 형식과 스키마 정의등을 찾는다.

```js
module.exports = {
  name: "default",
  type: "postgres",
  url: "postgres://postgres:password@domain.com:5432/dbname", // 이건 연결하려고 하는 형식에 맞게 쓰면된다.
  entities: ["src/schema/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  synchronize: true,
  logging: ["query", "error" /*"schema"*/],
};
```

## To Do More

1. open api 를 적용하면서 동시에 필수 인자 발리데이터를 달 수는 없을까?
   https://github.com/cdimascio/express-openapi-validator

2. Request 가 정의 되어있는 것을 상속받아서 따로 내가 앱에서 쓰는 특별한 변수명을 타입으로 지정할 순 없을까?
   ex. auth
