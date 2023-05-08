# Issue-Tracker

Проектът за управление на задачи е уеб приложение, което помага на екипите да управляват своите проекти и да следят статуса на задачите им. Системата позволява на потребителите да организират и следят напредъка на задачите в проекта, да назначават задачи на членовете на екипа и да следят статуса на задачите.

## Класове

### Потребители

Потребител (User) представлява потребител в системата. Той има следните атрибути:

- `name`: името на потребителя
- `email`: имейл адресът на потребителя
- `hashed_password`: криптираната парола на потребителя

### Проекти

 Проект (Project) представлява проект в системата. Той има следните атрибути:
- `project_key`: индентификатор на проекта
- `name`: името на проекта
- `description`: описание на проекта
- `creation_date`: дата на създаване на проекта
- `lead_user_id`: идентификатор на потребителя, който е лидер на проекта

### Задачи

 Задача (Task) представлява задача в системата. Той има следните атрибути:
- `task_key`: индентификатор на задачата
- `title`: заглавие на задачата
- `description`: описание на задачата
- `priority`: приоритет на задачата
- `due_date`: дата на изпълнение на задачата
- `status`: статус на задачата (напр. "изчакваща", "в процес на изпълнение", "завършена" и т.н.)
- `project_id`: идентификатор на проекта, където е свързана задачата
- `assignee_id`: идентификатор на потребителя, на когото е назначена задачата

<img width="830" alt="Screenshot 2023-04-18 at 23 22 46" src="/Users/rachevav/Desktop/Screenshot 2023-05-08 at 8.52.33.png">


# Как да стартираме

Това е Node.js приложение, което използва PostgreSQL за своята база данни.

## Изисквания

За да стартирате това приложение, ви е необходимо:

- Node.js инсталиран на вашия компютър. Можете да изтеглите и инсталирате Node.js от [официалния уебсайт](https://nodejs.org).
- Docker инсталиран на вашия компютър. Можете да изтеглите и инсталирате Docker от [официалния уебсайт](https://www.docker.com).

## Инсталация

1. Клонирайте хранилището на локалния ви компютър:

   ```shell
   git clone https://github.com/VeronikaIR/Issue-Tracker
   ```

2. Отидете в директорията на проекта:

   ```shell
   cd Issue-Tracker
   ```

3. Инсталирайте зависимостите на проекта:

   ```shell
   npm install
   ```

## Настройка на базата данни

Това приложение използва PostgreSQL като база данни. За да стартирате PostgreSQL като Docker контейнер, използвайте следната команда:

```shell
docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres postgres
```

Това ще създаде Docker контейнер с името `postgres`, работещ на порт `5432`, като използва потребителско име `postgres` и парола `postgres`.

Конфигурацията на базата данни се намира във файлът `database.js`. Можете да модифицирате този файл, за да посочите вашите собствени настройки за базата данни.

## Стартиране на приложението

За да стартирате приложението, отидете в директорията на проекта в терминала и стартирайте командата:

```shell
node index.js
```

Това ще зареди всички миграции и ще стартира приложението.

