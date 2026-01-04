#!/bin/bash

set -euo pipefail

# collects the current name of the directory
correct_directory=$(pwd | grep -o "7-terraform-test-code$")

# checks to see if we are in the right directory
if  [ "${correct_directory}" != "7-terraform-test-code" ]; then
    echo "You are not in the correct directory"
    exit 1
fi

# we create a function that will be used to destroy already created resources
function destroy_resources() {
    terraform destroy -auto-approve
}

# create the resources using terraform
terraform init
terraform apply -auto-approve

# get the public ip address of the ec2 instance
ec2_public_ip=$(terraform output -json | jq -r '.ec2_public_ip_address.value')

echo "waiting for ec2 instance to be ready ..."

timeout=300 # represents 300seconds, approx 5mins
interval=10 # will delay each while loop by 10s
elapsed=0 # will be used to track when the elapsed time > timeout

while [ $elapsed -lt $timeout ]; do
    http_status=$(echo "$ec2_public_ip" | xargs -I {} curl -s -o /dev/null -w "%{http_code}" http://{}:8080 || echo "000")

    if [ "$http_status" == "200" ]; then
        echo "App is ready! Status: $http_status"
        break
    else
        echo "App is not ready yet. Status: $http_status"
        sleep $interval
        elapsed=$((elapsed + interval))
    fi
done

# make a request to the ec2 instance
http_status=$(echo "${ec2_public_ip}" | xargs -I {} curl -s -o /dev/null -w "%{http_code}" http://{}:8080 || echo "000")

# checks if the request was successful
if [ "${http_status}" != "200" ]; then
    echo "Timeout: App never became ready."
    destroy_resources
    exit 1
fi

# everything is fine
echo "App is running on http://${ec2_public_ip}:8080"
destroy_resources # destroy the resources