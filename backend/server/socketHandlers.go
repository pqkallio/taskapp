package server

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

type closeHandlerFunc func(int, string) error

func (s *Server) closeHandler(id string) closeHandlerFunc {
	return func(code int, text string) error {
		wsConn := s.wsConnections[id]
		if wsConn != nil {
			log.Printf("Closing connection to %s: %d / %s", id, code, text)
			_ = wsConn.Close()
			delete(s.wsConnections, id)
		}

		return nil
	}
}

func (s *Server) initSocket() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := uuid.NewString()

		ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			_ = c.Error(err)
			return
		}

		ws.SetCloseHandler(s.closeHandler(id))
		s.wsConnections[id] = ws
		log.Printf("New ws connection to %s with id %s", c.ClientIP(), id)
	}
}
