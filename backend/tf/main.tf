# aws ami
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# aws vpc
resource "aws_vpc" "cloud" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true
}

# internet
resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.cloud.id
}

# vpc route table
resource "aws_default_route_table" "route_table" {
  default_route_table_id = aws_vpc.cloud.default_route_table_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
}

# aws subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.cloud.id
  cidr_block              = var.subnet
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true
}

# aws network access
resource "aws_security_group" "allow_defaults" {
  name        = "allow-defaults"
  description = "Allow Defaults"
  vpc_id      = aws_vpc.cloud.id

  # ssh
  ingress {
    description = "SSH"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
  }

  # tcp
  ingress {
    description = "HTTP"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
  }

  # jupyter-notebook
  ingress {
    description = "HTTP"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
  }

  # default rule
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# aws ssh key
resource "aws_key_pair" "ssh_key" {
  key_name   = var.aws_key_pair_name
  public_key = file("~/.ssh/id_rsa.pub")
}

# aws instance - ono server
resource "aws_instance" "ono_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type_main
  user_data                   = file("./setup.sh")
  key_name                    = aws_key_pair.ssh_key.key_name
  subnet_id                   = aws_subnet.public_subnet.id
  security_groups             = [aws_security_group.allow_defaults.id]
  associate_public_ip_address = true

  root_block_device {
    delete_on_termination = false
    volume_size           = 50
    volume_type           = "gp2"
  }

  provisioner "file" {
    source      = "../rhvoice-docker"
    destination = "/tmp/rhvoice-docker"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/id_rsa")
      host        = self.public_ip
    }
  }

  depends_on = [
    aws_vpc.cloud,
    aws_subnet.public_subnet
  ]
}

