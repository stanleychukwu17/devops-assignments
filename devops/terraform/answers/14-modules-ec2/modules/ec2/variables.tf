variable "ami" {
  description = "The AMI to use for the instance"
  type        = string
}

variable "instance_type" {
  description = "The type of instance to start"
  type        = string
}

variable "instance_count" {
  description = "The number of instances to create"
  type        = number
}

variable "public_ip" {
  description = "Assign a public IP address"
  type        = bool
}