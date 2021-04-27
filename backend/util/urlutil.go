package util

import (
    "errors"
    "strconv"
    "strings"
)

type ParsedURL struct {
    Host string
    Port uint16
}

func ParseHostAndPort(url string) (*ParsedURL, error) {
    parsedURL := ParsedURL{}

    protocolStripped := strings.Split(url, "://")
    if len(protocolStripped) > 2 {
        return nil, errors.New("malformed URL")
    }

    url_ := protocolStripped[0]
    if len(protocolStripped) == 2 {
        url_ = protocolStripped[1]
    }

    hostAndPort := strings.Split(url_, ":")
    if len(hostAndPort) != 2 {
        return nil, errors.New("the URL does not contain both host and port")
    }

    if port, err := strconv.ParseUint(hostAndPort[1], 10, 16); err != nil {
        return nil, errors.New("the port could not be parsed")
    } else {
        parsedURL.Port = uint16(port)
    }

    parsedURL.Host = hostAndPort[0]

    return &parsedURL, nil
}
