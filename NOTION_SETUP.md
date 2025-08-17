# Notion 데이터베이스 설정 가이드

## 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations) 페이지로 이동
2. "New integration" 클릭
3. Integration 이름 입력 (예: "Portfolio Site")
4. Associated workspace 선택
5. "Submit" 클릭
6. "Internal Integration Token" 복사 → `.env.local`의 `NOTION_TOKEN`에 붙여넣기

## 2. 노션 데이터베이스 생성

1. Notion에서 새 페이지 생성
2. "Table" 또는 "Database - Full page" 선택
3. 다음 속성(Properties) 추가:
   - **Name** (Title): 프로젝트 이름
   - **Description** (Text): 프로젝트 설명
   - **Role** (Text): 프로젝트에서의 역할 (예: "Frontend Developer", "Team Lead")
   - **Technologies** (Multi-select): 사용 기술 (예: React, Next.js, TypeScript)
   - **Image** (Files & media): 프로젝트 스크린샷
   - **Date** (Date): 프로젝트 진행 날짜

## 3. Integration과 데이터베이스 연결

1. 생성한 데이터베이스 페이지 우측 상단 "..." 메뉴 클릭
2. "Connections" 또는 "연결" 클릭
3. 생성한 Integration 검색 및 선택
4. "Confirm" 클릭

## 4. 데이터베이스 ID 찾기

### 방법 1: 브라우저 URL에서
1. Notion에서 데이터베이스 페이지 열기
2. 브라우저 주소창의 URL 확인
3. URL 형식: `https://www.notion.so/workspace-name/데이터베이스이름-{DATABASE_ID}?v=...`
4. DATABASE_ID 부분 복사 (32자리 문자열, 하이픈 제거)

### 방법 2: Share 링크에서
1. 데이터베이스 페이지에서 "Share" 클릭
2. "Copy link" 클릭
3. 링크 형식: `https://www.notion.so/{DATABASE_ID}?v=...`
4. DATABASE_ID 부분 복사

## 5. 환경 변수 설정

`.env.local` 파일 수정:
```
NOTION_TOKEN=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 6. 데이터베이스 ID 형식 확인

- 32자리 문자열이어야 함
- 하이픈(-) 제거 필요
- 예시:
  - URL에서: `7c07739b-c8fa-4469-a697-6e271bb2249c`
  - 환경변수에: `7c07739bc8fa4469a6976e271bb2249c`

## 문제 해결

### "Could not find database" 에러가 발생하는 경우:

1. **Integration 연결 확인**
   - 데이터베이스 페이지 → "..." → Connections에서 Integration이 연결되어 있는지 확인

2. **Database ID 확인**
   - 하이픈 제거했는지 확인
   - 32자리 문자열인지 확인

3. **권한 확인**
   - Integration이 "Read content" 권한을 가지고 있는지 확인
   - Workspace 관리자에게 권한 요청

4. **Token 확인**
   - Integration 페이지에서 토큰 재생성 후 다시 시도

## 샘플 데이터 추가

데이터베이스에 다음과 같은 샘플 프로젝트를 추가하세요:

1. **프로젝트 1**
   - Name: "전자상거래 플랫폼"
   - Description: "React와 Node.js를 활용한 풀스택 쇼핑몰 구축"
   - Role: "Frontend Developer"
   - Technologies: React, TypeScript, Node.js, PostgreSQL
   - Date: 2024-01-15

2. **프로젝트 2**
   - Name: "실시간 채팅 애플리케이션"
   - Description: "Socket.io를 활용한 실시간 메시징 시스템"
   - Role: "Full Stack Developer"
   - Technologies: Next.js, Socket.io, Redis, MongoDB
   - Date: 2024-03-20