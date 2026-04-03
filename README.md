# Claude Buddy Showcase

Claude Code의 버디(companion) 시스템을 시뮬레이션하는 웹사이트입니다.

## 기능

- **내 버디 조회**: `~/.claude.json`의 `accountUuid`를 입력하면 실제 Claude Code에서 보이는 버디와 동일한 결과를 확인할 수 있습니다.
- **커스텀 미리보기**: 종(species), 희귀도(rarity), 눈(eye), 모자(hat), 반짝이(shiny) 등을 자유롭게 조합하여 미리볼 수 있습니다.
- **애니메이션**: Claude Code 터미널과 동일한 15스텝 idle 애니메이션을 재현합니다.
- **Shimmer 효과**: 반짝이(shiny) 버디에 원본 Claude Code의 GlimmerMessage 패턴을 참고한 shimmer 애니메이션을 적용합니다. (원본에서는 shiny 렌더링이 미구현 상태이므로, shimmer 스타일로 추정하여 적용)

모든 계산은 브라우저에서만 수행되며, 서버로 전송되지 않습니다.

## 작동 원리

Claude Code는 `hash(userId + salt)` → Mulberry32 PRNG → 트레이트 순차 롤링으로 버디를 결정합니다.

- **해시 함수**: wyhash ([bun-wyhash](https://www.npmjs.com/package/bun-wyhash))
- **PRNG**: Mulberry32
- **Salt**: 바이너리에 하드코딩된 고정값

자세한 내용은 [any-buddy HOW_IT_WORKS.md](https://github.com/cpaczek/any-buddy/blob/main/HOW_IT_WORKS.md)를 참고하세요.

## 개발

```bash
pnpm install
pnpm dev
```

## 기술 스택

Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
