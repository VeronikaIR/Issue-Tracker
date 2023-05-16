-- Create CreateUserDto table
CREATE TABLE IF NOT EXISTS users
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL
);

-- Create CreateProjectDto table
CREATE TABLE IF NOT EXISTS projects
(
    id            SERIAL PRIMARY KEY,
    project_key   VARCHAR(255) NOT NULL,
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    creation_date TIMESTAMP    NOT NULL,
    lead_user_id  INTEGER      REFERENCES users (id) ON DELETE SET NULL
);

-- Create TaskDto table
CREATE TABLE IF NOT EXISTS tasks
(
    id          SERIAL PRIMARY KEY,
    task_key    VARCHAR(255) NOT NULL,
    title       VARCHAR(255) NOT NULL,
    description TEXT         NOT NULL,
    priority    TEXT         NOT NULL,
    due_date    TIMESTAMP,
    status      VARCHAR(255) NOT NULL,
    project_id  INTEGER REFERENCES projects (id) ON DELETE CASCADE,
    assignee_id INTEGER      REFERENCES users (id) ON DELETE SET NULL
);



