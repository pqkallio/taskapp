package services

import (
    "tasks-backend/db"

    "database/sql"
    "log"
    "time"
)

type TaskService struct {
    DB *db.Connection
}

type Task struct {
    ID uint `json:"id"`
    Title string `json:"title"`
    Content string `json:"content"`
    Created time.Time `json:"created"`
    Done *time.Time `json:"done"`
}

func (s *TaskService) GetAll() ([]Task, error) {
    stmt := `SELECT ID, Title, Content, Created, Done FROM Note`

    var rows *sql.Rows
    var err error

    if rows, err = s.DB.Query(stmt); err != nil {
        return nil, err
    }

    defer rows.Close()

    tasks := []Task{}

    for rows.Next() {
        var task Task
        var id uint
        var title string
        var content string
        var created string
        var done string

        err = rows.Scan(&id, &title, &content, &created, &done)
        if err != nil {
            log.Printf("error scanning database row: %s", err.Error())
        }

        creationTime, err := time.Parse(time.RFC3339, created)
        if err != nil {
            return nil, err
        }

        task = Task{ID: id, Title: title, Content: content, Created: creationTime}

        if doneTime, err := time.Parse(time.RFC3339, done); err == nil {
            task.Done = &doneTime
        }

        tasks = append(tasks, task)
    }

    return tasks, nil
}
