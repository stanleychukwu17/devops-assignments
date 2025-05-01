output "public_ip" {
  value = module.my_ec2.public_ip
  description = "the public ip of the ec2 instance"
  depends_on = [module.my_ec2]
}