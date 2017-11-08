### Main objective to be acheived :
Whenever we want to build a scalable web based application , we follow the CAP theorem . CAP theorem states that at a time we can maintain
any two of the three parameters pf Consistency, Availability , Partition . One way of achieving Availabilty is makin sure data is available 
i.e. read and write operations to database is not compromised even when a server goes down. 
That is excatly what we are trying to achieve here , impelementing the policy of data sharding by storing data on multiple servers so that 
connection to database in maintained at all times. The steps required for that process has been discussed in details here . 

Before going to the details  of components needed for the complete process , I would like to discuss the advantage of using MongoDB for 
this purpose.  
MongoDB the leading NoSQL database available today since we can start using it in our projects without having to worry about table schemas, 
while delivering extremely fast performance and lots of useful features.  When running a scalable, highly-available MongoDB cluster, 
we need to have the knowledge of how replica set works. 
### Replica set-  Refers to a group of mongod instances that hold the same data. 
The purpose of replication is to ensure high availability, in case one of the servers goes down. This reference deployment supports one or 
three replica sets. In the case of three replica sets, the reference deployment launches three servers in three different Availability Zones 
(if the region supports it).Usually using three replica sets (Primary, Secondary0, Secondary1) is recommended . All clients typically 
interact with the primary node for read and write operations.All secondaries actively replicate data off of the current primary member so 
that if it fails, one of them will be able to take over quite seamlessly as the new primary. They do this by examining the primary member's
oplog, a file that contains a log of every single write query performed against the server. It is possible to choose a secondary node as a
preference during read operations, but write operations always go to the primary node and get replicated asynchronously in the secondary 
nodes. If we choose a secondary node for read operations, we need to watch out for stale data, because the secondary node may not be in 
sync with the primary node.

### Replica Set Members
The most minimal replica set setup must have at least three healthy members to operate. One member will serve as the primary, another as 
the secondary, and the third as an arbiter.
Arbiters are members that participate in elections in order to break ties and do not actually replicate any data. If a replica set has an 
even number of members, we must add an arbiter member to act as a tie-breaker, otherwise, when the primary member fails or steps down, 
a new primary will not be elected!
