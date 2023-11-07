To run a project use a Docker container:

1. Build the docker image

```
sudo docker build -t digitil/rhvoice-rest -f Dockerfile .
```

1. Run a container

```
sudo docker run --name rhvoice -p 8081:8080 digitil/rhvoice-rest -d
```