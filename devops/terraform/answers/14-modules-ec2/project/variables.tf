# =====================
# root module variables
# =====================
variable "access_key" {
  # default value added in terraform.tfvars
  description = "the access key for them man"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  # default value added in terraform.tfvars
  description = "the secret key for them man"
  type        = string
  sensitive   = true
}


# =====================
# ec2 variables
# =====================
variable "ami" {
  description = "The AMI to use for the instance"
  type        = string
  default     = "ami-0c2b8ca1dad456f8a"
}

variable "instance_type" {
  description = "The type of instance to start"
  type        = string
  default     = "t3.micro"
}

variable "instance_count" {
  description = "The number of instances to create"
  type        = number
  default     = 2
}

variable "public_ip" {
  description = "Assign a public IP address"
  type        = bool
  default     = true
}