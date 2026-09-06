# Git Flow & Collaboration Standards

В этом проекте мы придерживаемся строгих стандартов RS School.

## Навигация

- [1. Naming Convention: Ветки](#1-naming-convention-ветки)
- [2. Commit Convention (Рабочие коммиты)](#2-commit-convention-рабочие-коммиты)
- [3. Pull Request Title & Squash Commit](#3-pull-request-title--squash-commit)
- [4. Pull Request Template](#4-pull-request-template)

## 1. Naming Convention: Ветки

Мы используем иерархическую систему веток и префикс `RSS-SE` (RS School Swagger Editor) для связи с Trello.

### Иерархия веток:

1. `main` — продакшен.
2. `develop` — основная ветка разработки (интеграция фич).
3. `feature/NAME` — ветка для крупной фичи (Epic). Создается от `develop`. Ментор проверяет эту ветку перед вливанием в `develop`.
4. `story/RSS-SE-ID_description` — ветка для конкретной задачи (Story/Task) в рамках фичи. Создается от `feature/NAME` и вливается обратно в `feature/NAME`.

**Формат рабочих веток:**
`story/RSS-SE-ID_description`

- **RSS-SE-ID**: ID задачи из доски (например, `RSS-SE-25`).
- **RSS-CORE-00**: Если у задачи нет ID, используем `RSS-CORE-00`.
- **\_description**: Описание задачи.
  - **Стиль:** `camelCase` (слитное написание, каждое слово с большой буквы, кроме первого).
  - **Грамматика:** Imperative Mood + Present Tense (как в коммитах).
  - _Пример:_ ✅`addLoginLayout`, а не ❌`addingLoginLayout` или ❌`added-login-layout`.

**Примеры:**

- ✅ `feature/auth` (Глобальная фича)
- ✅ `story/RSS-SE-14_addLoginLayout` (Задача №14: Добавить верстку логина, вливается в `feature/auth`)
- ✅ `story/RSS-SE-05_fixHeaderResponsive` (Фикс №5: Починить адаптив хедера, вливается в `feature/auth`)
- ✅ `story/RSS-CORE-00_initProjectStructure` (Инициализация структуры)

---

## 2. Commit Convention (Рабочие коммиты)

Названия обычных коммитов внутри ветки должны быть согласно [RS School Guideline](https://rs.school/ru/docs/git-convention).

### Основные правила:

1. **Только нижний регистр** для типа (`feat`, `fix`, `refactor`...).
2. **Present Tense** ("add feature", NOT "added feature").
3. **Imperative Mood** ("move cursor to...", NOT "moves cursor to...").
4. **No Period:** Не ставьте точку в конце заголовка.

### Типы коммитов и примеры:

#### `init:`

Используется для начала проекта или таска.

- `init: start project setup`

#### `feat:`

Реализованная новая функциональность.

- `feat: add basic page layout`
- `feat: implement request to API`

#### `fix:`

Исправление ошибки в ранее реализованной функциональности.

- `fix: implement correct loading data`
- `fix: relayout header for firefox`

#### `refactor:`

Улучшение кода без смены логики.

- `refactor: change structure of the project`
- `refactor: rename vars for better readability`

#### `docs:`

Изменения в документации.

- `docs: update readme with additional information`

#### `style:`

Изменения стиля (пробелы, форматирование).

- `style: format code with prettier`

#### `chore:`

Конфиги, сборка.

- `chore: add .editorconfig file`

#### `test:`

Тестирование

- `test: coverage game widget with unit tests`

---

## 3. Pull Request Title & Squash Commit

При завершении задачи (Слияние Story -> Feature) мы используем стратегию **Squash & Merge**.
При вливании проверенной фичи (Feature -> Develop) используем **Merge commit**.

**Название вашего Pull Request (при вливании в Feature)** должно строго соответствовать следующему формату:

**Формат:**
`type: RSS-SE-ID description`

_(GitHub автоматически добавит номер PR `(#ID)` в конец заголовка финального коммита)_

**Правила:**

1. **Если есть задача в Trello:** Используем реальный ID (например `RSS-SE-25`).
2. **Если задачи нет (глобальный фикс/настройка):** Используем `RSS-CORE-00`.

**Примеры (как называть PR):**

- ✅ `feat: RSS-SE-25 implement login form logic`
  _(В истории станет: `feat: RSS-SE-25 implement login form logic (#26)`)_
- ✅ `fix: RSS-SE-12 fix header styles on mobile`
- ✅ `docs: RSS-CORE-00 update git flow documentation`
- ✅ `chore: RSS-CORE-00 setup eslint and prettier`

⚠️ **Важно:** Описание (`description`) должно быть кратким, на английском языке и в повелительном наклонении (Imperative mood).

### Описание (Body) Squash-коммита

При слиянии (Merge) GitHub автоматически предлагает список всех коммитов ветки в качестве описания.
**Мы НЕ оставляем этот список.**

**Как правильно:**

1. Удалите список промежуточных коммитов (`feat:...`, `fix:...`, `chore:...`...).
2. Оставьте краткий маркированный список реально сделанных изменений (можно взять из Summary вашего PR и изменить под стиль).

**Пример хорошего описания:**

```text
- Create LoginForm component
- Add API service for auth
- Update global styles
```

---

## 4. Pull Request Template

Каждый PR должен иметь подробное описание. Используйте этот шаблон, который также автоматически подтягивается из `.github/pull_request_template.md`:

```markdown
# 📋 Trello Task ID

- [ ] **RSS-SE-##** (Task ID / Trello Card)
- [ ] **No ID** (Global fix or chore)

# ⚡️ Summary

_Write a short report on the work done here. What problem does this PR solve?_

# 🛠 Type of change

- [ ] `feat` (New feature)
- [ ] `fix` (Bug fix)
- [ ] `refactor` (Code improvement / Refactoring without changing logic)
- [ ] `style` (Formatting, CSS)
- [ ] `docs` (Documentation)
- [ ] `chore` (Configs, Build)
- [ ] `test` (Testing)

# 📷 Screenshots / GIFs

_REQUIRED for UI changes. Attach images or GIFs here. If no UI changes, delete this section._
```
