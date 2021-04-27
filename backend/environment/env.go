package environment

import (
    "os"
)

func GetEnvVars(keys ...string) map[string]string {
    envVars := map[string]string{}

    for _, key := range(keys) {
        envVars[key] = os.Getenv(key)
    }

    return envVars
}
