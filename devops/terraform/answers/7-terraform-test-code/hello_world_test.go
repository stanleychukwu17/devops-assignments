package test

import (
	"crypto/tls"
	"fmt"
	"testing"
	"time"
)

func TestTerraformHelloWorldExample(t *testing.T) {
	fmt.Println("Hello World")

	// retry-able errors in terraform testing
	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "../hello_world",
	})

	// cleanup resources with "terraform destroy" at the end of the test
	defer terraform.Destroy(t, terraformOptions)

	// provision the resources with "terraform init && terraform apply"
	terraform.InitAndApply(t, terraformOptions)

	// run "terraform output" to get the value of an output variable
	instanceURL := terraform.Output(t, terraformOptions, "ec2_public_ip_address")
	fmt.Println(instanceURL)

	// use the value of the output variable
	tlsConfig := tls.Config{}
	maxRetries := 30
	timeBetweenRetries := 10 * time.Second
	http_helper.HttpGetWithRetryWithCustomValidation(
		t, instanceURL, &tlsConfig, maxRetries, timeBetweenRetries, validate,
	)
}

func validate(status int, body string) bool {
	fmt.Println(body)
	return status == 200
}
