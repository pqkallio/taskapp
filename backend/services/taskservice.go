package services

import (
	"fmt"
	"tasks-backend/db"

	"database/sql"
	"log"
	"time"
)

type TaskService struct {
	DB *db.Connection
}

type Task struct {
	ID      uint       `json:"id"`
	Title   string     `json:"title"`
	Content string     `json:"content"`
	Created time.Time  `json:"created"`
	Done    *time.Time `json:"done"`
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

func (s *TaskService) Create(task *Task) (*Task, error) {
	stmt := fmt.Sprintf(`INSERT INTO Note(title, content, created) VALUES ('%s', '%s', '%s') RETURNING id`, task.Title, task.Content, task.Created.Format(time.RFC3339))

	var id int64

	row, err := s.DB.QueryRow(stmt)
	if err != nil {
		return nil, err
	}

	err = row.Scan(&id)
	if err != nil {
		log.Printf("%s", err.Error())
	}

	task.ID = uint(id)

	return task, nil
}

func (s *TaskService) TaskDone(id uint) error {
	stmt := fmt.Sprintf(`UPDATE Note SET done = '%s' WHERE id = %d`, time.Now().Format(time.RFC3339), id)

	_, err := s.DB.Execute(stmt)

	return err
}
