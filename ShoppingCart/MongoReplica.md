step 1

mkdir replicaset1 replicaset2 replicaset3

step 2

START /B mongod --replSet shopping --logpath "rs1.log" --dbpath replicaset1 --port 27017
START /B mongod --replSet shopping --logpath "rs2.log" --dbpath replicaset2 --port 27018 
START /B mongod --replSet shopping --logpath "rs3.log" --dbpath replicaset3 --port 27019

step 3

- get inside a mongo instance using: 
mongo

step 4
rs.initiate({ _id : "shopping", members: [ { _id : 0, host : "localhost:27017" },{ _id : 1, host : "localhost:27018" },{ _id : 3, host : "localhost:27019" } ] })

step 5
- check the created replication sets and primary and secondary nodes 
rs.status()

step 6
- connect to the primary node of the replicaset
mongo --host shopping/localhost:27017,localhost:27018,localhost:27019
