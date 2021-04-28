package server

import (
	"tasks-backend/services"

	"github.com/gin-gonic/gin"

	"encoding/json"
	"net/http"
	"strconv"
	"time"
)

func (s *Server) getAllTasks() gin.HandlerFunc {
	return func(c *gin.Context) {
		tasks, err := s.taskService.GetAll()
		if err != nil {
			errorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, tasks)
	}
}

func (s *Server) createTask() gin.HandlerFunc {
	return func(c *gin.Context) {
		task := services.Task{}

		err := json.NewDecoder(c.Request.Body).Decode(&task)
		if err != nil {
			errorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		task.Created = time.Now()

		createdTask, err := s.taskService.Create(&task)
		if err != nil {
			errorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusCreated, createdTask)
	}
}

func (s *Server) taskDone() gin.HandlerFunc {
	return func(c *gin.Context) {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			errorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		err = s.taskService.TaskDone(uint(id))
		if err != nil {
			errorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{"id": id})
	}
}
