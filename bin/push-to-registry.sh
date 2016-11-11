#!/usr/bin/env bash

$(aws ecr get-login --region us-east-1)

docker build -t sees-earth .
docker tag sees-earth:latest 541790730179.dkr.ecr.us-east-1.amazonaws.com/sees-earth:latest
docker push 541790730179.dkr.ecr.us-east-1.amazonaws.com/sees-earth:latest
