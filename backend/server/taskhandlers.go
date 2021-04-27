package server

import (
    "github.com/gin-gonic/gin"

    "net/http"
)

func (s *Server) getAllTasks() gin.HandlerFunc {
    return func(c *gin.Context) {
        tasks, err := s.taskService.GetAll()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, tasks)
    }
}
