output "public_ip" {
  value = aws_instance.my_vm.public_ip
  description = "the public ip of the ec2 instance"
  depends_on = [ aws_instance.my_vm ]
}