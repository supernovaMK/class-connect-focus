# 수업 도우미 서비스

**수업 도우미 서비스**는 온라인 및 오프라인 수업 진행 중 필요한 기능들을 통합적으로 제공하여  
수업의 효율성과 참여도를 높이는 데 도움을 주는 플랫폼입니다.

줌(Zoom)과 같은 온라인 강의는 물론, 오프라인 수업에서도 활용할 수 있으며  
출석 관리, 수업 자료 제공, 실시간 퀴즈 및 설문 출제, 그리고 학생 응답 현황 확인까지  
하나의 화면에서 간편하게 수행할 수 있습니다.

별도의 도구나 복잡한 메뉴 전환 없이, 직관적인 인터페이스를 통해  
수업자는 수업 집중도와 참여율을 높이고, 수강생은 몰입감 있는 학습 경험을 할 수 있습니다.


# URL : https://class-connect-focus.lovable.app/

# 📌 사용자 페르소나 정의 (수업 도우미 서비스)

## 🧑‍🏫 페르소나 1 – 대학교 교수

### 열정적인 강의자 - 이지현 교수 (45세)

- **직업:** 대학교 미디어학과 교수  
- **라이프스타일:**  
  - 주 3회 온라인 강의 진행  
  - 보조 자료 활용에 적극적  
  - 학생 참여를 중요시함  
- **목표:**  
  - 실시간 퀴즈, 설문 등을 활용해 참여 유도  
  - 수업 중 출석 및 반응 즉시 확인  
- **니즈:**  
  - 하나의 화면에서 모든 기능 사용 가능  
  - 메뉴 이동 없이 직관적으로 퀴즈/설문/출석 관리  
- **페인 포인트:**  
  - 복잡한 UI  
  - 출석/참여 확인의 번거로움  
  - Zoom, 카카오톡, 구글폼 등 플랫폼 분산 문제

#### 🧩 사용자 시나리오

- **상황:** 온라인 수업 중 학생의 몰입도 확인 필요  
- **시나리오 흐름:**  
  1. 수업 도우미 접속 → 수업 시작  
  2. 15분 후 퀴즈 블록 클릭 → 즉시 문제 출제  
  3. 응답 실시간 확인 → 정답 해설  
  4. 출석 블록으로 결석자 확인 → 메시지 발송  

#### ✅ 사용자 스토리

> “교수로서, 저는 수업 중 학생들의 반응을 실시간으로 확인하고 싶습니다.  
> 그래서 수업의 몰입도를 높이고 교육 효과를 향상시킬 수 있습니다.”

#### ✔️ 인수 조건

- **Given:** 교수는 수업 도우미에 접속함  
- **When:** 퀴즈 또는 설문 블록을 사용함  
- **Then:** 학생 응답은 5초 이내 시각화되어야 함

---

## 👩‍🎓 페르소나 2 – 대학교 재학생

### 능동적인 수강생 - 김보민 (21세)

- **직업:** 디자인학과 3학년 재학생  
- **라이프스타일:**  
  - 온라인 수업 + 팀플 병행  
  - 노트북/태블릿 병용  
- **목표:**  
  - 출석/퀴즈/설문을 제때 제출  
  - 수업 흐름에 집중  
- **니즈:**  
  - 채팅, 퀴즈, 설문 참여를 한 화면에서 처리  
  - 퀴즈 결과를 실시간으로 확인  
- **페인 포인트:**  
  - 창 전환 많음 → 줌+구글폼+카톡 전환 피로  
  - 집중도 저하

#### 🧩 사용자 시나리오

- **상황:** 수업 중 갑작스런 퀴즈, 여러 창 전환으로 혼란  
- **시나리오 흐름:**  
  1. 수업 도우미 접속 후 ‘수업 참여’  
  2. 채팅/자료/퀴즈 블록이 동시에 화면에 배치  
  3. 퀴즈 응답 후 ‘제출’ → 결과 즉시 확인  
  4. 출석/퀴즈 내역 자동 저장

#### ✅ 사용자 스토리

> “학생으로서, 저는 수업 중 여러 화면을 전환하지 않고  
> 하나의 화면에서 퀴즈, 채팅, 자료 확인을 하고 싶습니다.  
> 그래야 수업에 더 몰입할 수 있어요.”

#### ✔️ 인수 조건

- **Given:** 학생이 수업 화면에 접속함  
- **When:** 퀴즈가 활성화됨  
- **Then:** 별도 페이지 이동 없이 응답할 수 있어야 함

---

## 🔧 핵심 기능 블록 구조

| 블록 이름        | 주요 기능                                | 사용 주체     |
|------------------|--------------------------------------------|----------------|
| 실시간 채팅       | 질문 응답, 학생 간 소통                    | 학생, 교수     |
| 퀴즈             | 단답형/객관식 문제 출제 및 응답 확인        | 교수, 학생     |
| 설문             | 의견 수렴, 선택형 응답                     | 교수, 학생     |
| 출석 확인        | 출석 상태 실시간 확인, 기록                | 교수           |
| 자료 공유        | 강의자료 업로드 및 자료 화면 내 표시         | 교수           |
| 참여 내역        | 퀴즈/출석/설문 결과 조회                   | 학생           |

---

## 💡 핵심 가치 제안

- **집중 몰입형 UI**: 메뉴 없이 블록 단위로 기능 구성  
- **실시간 상호작용**: 참여형 수업을 위한 퀴즈, 설문, 채팅 통합  
- **간편한 수업 운영**: 수업자와 수강생 모두 직관적인 UX 제공
