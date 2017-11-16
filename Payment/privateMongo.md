## Modifications to make Mongo instance private:

Delete the earlier mongo instances from AWS and launch three new EC2 instances named MongoP1, MongoP2 and MongoP3.

- They have been linked with VPC and security group as discussed in "MongoReplicaSetOnAWS" file.
- While establihing connection, i.e. when we are setting the hostname, this time we use the private ip address instead of uisng the public ips. i.e. sudo bash -c 'echo db1.example.com > /etc/hostname && hostname -F /etc/hostname' here db1.example.com will be replaced with the private ip address , thus our instances will not be accessed from outside.
- The same steps will be repeated three times for the three instances, making the changes in hostname.
- The rest of the steps are same as described in the last file where all the steps have been discussed in detail.
- Also we have to make the neccessary changes in the conection to database where initially we had set the path for connecting to local mongo database .
- Instead we have to set the ip address of the primary and secondary replica sets , give the name of replica set and the name of database to be used.
