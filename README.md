# 🎨 서울 문화행사 정보 웹사이트

서울문화포털에서 제공하는 문화행사 정보 api를 활용한 웹 사이트

공연/행사명, 장소, 날짜, 이용대상, 이용요금, 프로그램 등의 정보를 제공

<img width="834" alt="스크린샷 2024-08-20 오후 4 41 28" src="https://github.com/user-attachments/assets/8b40900b-7d2d-42ee-898a-18a096ae9ae7">
<img width="334" alt="스크린샷 2024-08-20 오후 4 41 52" src="https://github.com/user-attachments/assets/16627491-a29e-4314-aa25-b50e557a3e40">
<img width="808" alt="스크린샷 2024-08-20 오후 4 36 52" src="https://github.com/user-attachments/assets/5dce954f-5c5a-4a3d-a542-cd9792182717">


<br/><br/>

## ✅ 주요기능

### 1️⃣ 카테고리 검색

- 선택한 카테고리에 해당하는 행사 정보를 제공

### 2️⃣ 공연/행사명 또는 날짜 검색

- 공연/행사명 또는 특정날짜에 해당하는 행사 정보 검색 가능

### 3️⃣ 상세내용 모달

- 리스트를 누르면 상세내용 모달 출력
- 공연/행사명, 장소, 날짜, 이용대상, 이용요금 등의 정보를 확인 가능
- 더보기 클릭하면 행사를 진행하는 홈페이지로 이동

### 4️⃣ 페이지네이션

- 한 페이지에 9개의 행사 정보를 출력할 수 있게 전체 리스트를 페이지로 나눔


<br/><br/>

## ✅ 기획서

[https://www.figma.com/design/J9oUrEd1J8vJpYIzZuFGnM/%EC%95%BD%EC%8B%9D%EA%B8%B0%ED%9A%8D%EC%84%9C--api%ED%99%9C%EC%9A%A9-%EC%9B%B9%EA%B0%9C%EB%B0%9C-(Copy)?node-id=0-1&t=fbSYGXLT39USQCem-0](https://www.figma.com/design/J9oUrEd1J8vJpYIzZuFGnM/%EC%95%BD%EC%8B%9D%EA%B8%B0%ED%9A%8D%EC%84%9C--api%ED%99%9C%EC%9A%A9-%EC%9B%B9%EA%B0%9C%EB%B0%9C-(Copy)?node-id=0-1&t=fbSYGXLT39USQCem-0)

<br/><br/>

## ✅ 고쳐야할 부분

- 메뉴바를 닫은 상태에서 화면 크기를 달리 했을 때는 문제 없음
- but 작아진 화면의 메뉴바를 펼친 상태에서 화면을 넓게 했을 때 카테고리 디자인이 합쳐짐.

<img width="356" alt="스크린샷 2024-08-13 오후 6 19 14" src="https://github.com/user-attachments/assets/6cb52375-99bc-4d0f-8324-d4deefd646c7">
<img width="759" alt="스크린샷 2024-08-13 오후 5 52 20" src="https://github.com/user-attachments/assets/aa9c58d2-f955-4697-9266-deaf20ac30d4">



⇒ 사이즈에 따라 css  변경 

```jsx
@media (max-width: 999px) {
  nav {
    display: none;
  }
  nav.on {
    display: block;
  }
  nav button img {
    display: none;
  }
  nav button.on {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 1.2rem;
  }
}
```

---

- 윈도우 크기에 따라 페이지네이션 groupSize 변경 (10 → 5)


<img width="657" alt="스크린샷 2024-08-20 오후 4 36 24" src="https://github.com/user-attachments/assets/64a0197a-f977-4168-9f31-b5bd05feee98">

<img width="466" alt="스크린샷 2024-08-20 오후 4 36 34" src="https://github.com/user-attachments/assets/a3ef3835-4073-4de7-b2a6-300d8aeac9f5">

<br/><br/>

=> 윈도우 크기가 resize 될 때 넓이에 따라 groupSize 변경
```jsx
window.addEventListener("resize", () => {
  groupSize = window.innerWidth < 1000 ? 5 : 10;
  pagination();
});
```
