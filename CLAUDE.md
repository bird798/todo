# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React + TypeScript TODO 앱. Vite + Tailwind CSS 기반.

## Commands

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (http://localhost:5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과물 미리보기
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 체크 (tsc --noEmit)
```

## Architecture

- `src/types/` — 공유 TypeScript 타입 (Todo, Priority, Filter 등)
- `src/hooks/` — 커스텀 훅. `useTodos`가 모든 상태와 CRUD 로직을 담당하며 localStorage에 영속성을 유지
- `src/components/` — 프레젠테이션 컴포넌트. 상태는 보유하지 않고 props를 통해 `useTodos`의 값을 받음
- `src/App.tsx` — 루트 컴포넌트. `useTodos`를 호출하고 컴포넌트에 props를 전달

상태는 `useTodos` 훅에서 단일 관리하며, 컴포넌트는 순수 프레젠테이션 역할만 합니다.
