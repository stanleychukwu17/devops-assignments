#!/bin/bash

set -euo pipefail

# collects the current name of the directory
correct_directory=$(pwd | grep -o "7-terraform-test-code$")

# checks to see if we are in the right directory
if  [ "${correct_directory}" != "7-terraform-test-code" ]; then
    echo "You are not in the correct directory"
    exit 1
fi

# create the resources using terraform
terraform init
terraform apply -auto-approve

# wait while the resources are created and the ec2 instance is ready
sleep 60

# get the public ip address of the ec2 instance
ec2_public_ip=$(terraform output -json | jq -r '.ec2_public_ip_address.value')

# make a request to the ec2 instance
http_status=$(echo "${ec2_public_ip}" | xargs -I {} curl -s -o /dev/null -w "%{http_code}" http://{}:8080)

# checks if the request was successful
if [ "${http_status}" != "200" ]; then
    echo "The request was not successful - returned status code: ${http_status}"
    exit 1
fi

# everything is fine
echo "everything is fine with i.p ${ec2_public_ip}"

# destroy the resources
terraform destroy -auto-approve