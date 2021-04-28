package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Connection struct {
	Port     uint16
	Host     string
	Username string
	Password string
	DBName   string
}

func (c *Connection) Ping() error {
	conn, err := c.establishConnection()
	if err != nil {
		return err
	}

	defer conn.Close()

	err = conn.Ping()

	return err
}

func (c *Connection) Query(query string) (*sql.Rows, error) {
	conn, err := c.establishConnection()
	if err != nil {
		return nil, err
	}

	defer conn.Close()

	return conn.Query(query)
}

func (c *Connection) QueryRow(query string) (*sql.Row, error) {
	conn, err := c.establishConnection()
	if err != nil {
		return nil, err
	}

	defer conn.Close()

	return conn.QueryRow(query), nil
}

func (c *Connection) Execute(query string, args ...interface{}) (sql.Result, error) {
	conn, err := c.establishConnection()
	if err != nil {
		return nil, err
	}

	defer conn.Close()

	return conn.Exec(query, args...)
}

func (c *Connection) establishConnection() (*sql.DB, error) {
	connStr := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		c.Host,
		c.Port,
		c.Username,
		c.Password,
		c.DBName,
	)

	return sql.Open("postgres", connStr)
}
