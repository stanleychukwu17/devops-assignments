resource "aws_instance" "my_vm" {
  ami                         = var.ami
  instance_type               = var.instance_type
  count                       = var.instance_count
  associate_public_ip_address = var.public_ip

  tags = {
    Name = "My EC2 instance"
  }
}