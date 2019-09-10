 #!/bin/bash
 glide install
 go run main.go & cd ui-client;npm start && fg