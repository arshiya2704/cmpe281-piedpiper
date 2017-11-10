## Steps to setup mongo replica set :

Set up VPC named bonAppetite with public and private subnets, assign the ip addresses.
Create the security group , open the ports HTTP, SSH and MongoDB(port no: 27017).
Set up three EC2 instances named Mongo1 , Mongo2, Mongo3 of Ubuntu AMI, and connect it with the VPC created and the assign it to the security group made.
Allocate three elastic ips and associate each with each of the three instances created, thus exposing the public ips.
Since my setup is runnning on windows machine, I have used the Putty for coonecting it to the instances .
Using the private key pairs generated in pem format and which has been stored in ppk format uisng puttygen, I opened the connection the three instances created .
Now , in each of the instance opened , we have to perform these following steps for setting up mongo replica set:
Set the Hostname

sudo bash -c 'echo ec2-13-56-167-227.us-west-1.compute.amazonaws.com > /etc/hostname && hostname -F /etc/hostname'

sudo bash -c 'echo ec2-52-8-218-103.us-west-1.compute.amazonaws.com > /etc/hostname && hostname -F /etc/hostname'

sudo bash -c 'echo ec2-52-52-227-144.us-west-1.compute.amazonaws.com > /etc/hostname && hostname -F /etc/hostname'

Adding the MongoDB Repository

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

After successfully importing the key, we will see

gpg: Total number processed: 1 gpg: imported: 1 (RSA: 1)

adding the MongoDB repository details so apt will know where to download the packages from:

echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org- 3.2.list

updating the packages list

sudo apt-get update

installing the MongoDB package

sudo apt-get install -y mongodb-org

We'll create a unit file to manage the MongoDB service. Create a configuration file named mongodb.service

sudo nano /etc/systemd/system/mongodb.service

using nano as editor , we add the following lines :

[Unit] Description=High-performance, schema-free document-oriented database After=network.target

[Service] User=mongodb ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install] WantedBy=multi-user.target

configuring MongoDB to operate in replica set mode, as well as allow remote access to the server

sudo nano /etc/mongod.conf

we have to find and remove the following line entirely:

bindIp: 127.0.0.1

Next we find: #replication:

replication: replSetName: "example-replica-set

restarting MongoDB to apply the changes:

sudo service mongod restart

starting the newly created service with systemctl

sudo systemctl start mongodb

using systemctl to check that the service has started properly

sudo systemctl status mongodb

step to enable automatic starting of MongoDB when the system starts

sudo systemctl enable mongodb

## Main purpose :

I would also like to discuss the advantage of using MongoDB for this purpose.
MongoDB is an open source, NoSQL database that provides support for JSON-styled, document-oriented storage systems. Its flexible data model enables you to store data of any structure, and it provides full index support, sharding, and replication.

## Replica set- Refers to a group of mongod instances that hold the same data.

The purpose of replication is to ensure high availability, in case one of the servers goes down. This reference deployment supports one or three replica sets. In the case of three replica sets, the reference deployment launches three servers in three different Availability Zones (if the region supports it).Usually using three replica sets (Primary, Secondary0, Secondary1) is recommended . All clients typically interact with the primary node for read and write operations.All secondaries actively replicate data off of the current primary member so that if it fails, one of them will be able to take over quite seamlessly as the new primary. They do this by examining the primary member's oplog, a file that contains a log of every single write query performed against the server. It is possible to choose a secondary node as a preference during read operations, but write operations always go to the primary node and get replicated asynchronously in the secondary nodes. If we choose a secondary node for read operations, we need to watch out for stale data, because the secondary node may not be in sync with the primary node.

## Replica Set Members

The most minimal replica set setup must have at least three healthy members to operate. One member will serve as the primary, another as the secondary, and the third as an arbiter. Arbiters are members that participate in elections in order to break ties and do not actually replicate any data. If a replica set has an even number of members, we must add an arbiter member to act as a tie-breaker, otherwise, when the primary member fails or steps down, a new primary will not be elected!

AWS components that are deployed and configured as part of this reference deployment:

A VPC configured with public and private subnets.
In the public subnets, NAT gateways to allow outbound Internet connectivity for resources (MongoDB instances) in the private subnets.
In the public subnets, bastion hosts with Elastic IP addresses to allow inbound Secure Shell (SSH) access.
Security groups to enable communication within the VPC and to restrict access to only necessary protocols and ports.
In the private subnets, a customizable MongoDB cluster with the option of running standalone or in replica sets .
