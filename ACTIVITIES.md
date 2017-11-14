# BonAppétit
### Week 7 updates:

Arshiya:-
- Researched about how Mongo Replica Set can be deployed on AWS.
- Created 2 mongo replicas by using AWS EC2 instances with one arbiter, which switches the load if one node goes down.
- Connected the mongo instance with my local node server.
- Updated APIs for Payment module.
- Updated CFD.
- Updated Burntdown chart.
- Updated XP core value, Respect.

Nikita:-
- Learnt in detail how MongoDB can be deployed in AWS with the help of Ubuntu AMI . 
- Hence also learnt the steps of installing and using MongoDB in Ubuntu .
- In my AWS account, created a VPC, security group , and three EC2 instances . 
- Since the aim of project will be data sharding by making three copies of my mongo databaase , the three EC2 isntances are then linked   to the three mongo databases so that, one is primary where main data is stored and other two will be secondary where data will be       backed up.
- Then followed the necessary steps of settimg up the said connection between EC2 instances and databases keeping Mongo replica sets in   mind. 
- Did the necessary changes to set up the connection between by API and the mongo databases provided by AWS. 
- Tested by sending a request to the API and receiving the necessary response that my entires connection setup is working fine.
- Updated XP core value, Courage as maintained by our group this week. 

Jigar:-
- Created MongoDB replica sets locally
- Deployed 3 instances of mongodb to AWS 
- Connected local server to deployed database
- Bug fixes in backend
- Configured and created frontend server on local machine

Ashish:-
- Researched about how to create Mongo Replica set on AWS.
- Found a procedure to create MongoDB replica sets on AWS by using AWS EC2 instances. Created 2 mongo replicas with 1 arbitar.
- Connected this MongoDB from my local node app server.
- Deployed node app server to AWS and connected MongoDB from that deployed app. As all instances are running in same VPC, they 
  are able to communicte with each other.
- Created APIs for /addToPersonalCart, /addToGroupCart,/removeFromPersonalCart, /removeFromGroupCart.
- Updated XP core value - Feedback.

Manogna:-
- Performed a thorough research on how to create and deploy MongoDB replica set on AWS.
- Created 3 MongoDB intances each of which running on 3 different Elastic IPs and belong to common Security group.
- Created the MongoDB replica set and verified the partition tolerance.
- Updated the PATCH API to update the stock quantity.
- Updated the Weekly Meetings.
- Updated the core value - Communication

### Week 6 updates:
Nikita:-
- Discussed about the flow of APIs in detail so that I got to know exactly the request and response objects I would be dealing with.
- Designed passportJs authentication for login and registration , used local strategy here .
- Designed the schema for Mongodb using nodejs w.r.t the collection structure decided upon previously.
- Designed the sample front-end for login resgistration module using ejs and html for now.
- Made slight changes in the acticity diagram .
- Updated core value - Courage.md.

Arshiya:-
- Almost done with the API's of Payment module.
- Started the basic UI implementation for payment page.
- Made slight changes in the Sequence Diagram.
- UPdated core value- Respect.
- Updated Burntdown chart.

Manogna:-
- Working on the APIs of Product Catalog module.
- Updated product catalog database in Mongodb.
- Updated User Story BDD scenarios.
- Updated Core value - Communication.
- Updated CFD for this week.

Ashish :-
- Created APIs for Shopping Cart modules like /addToCart, /removeFromCart and tested them with Postman.
- Tried to deploy working Node server to AWS ECS.
- Updated XP Core value - feedback.
- Updated WeeklyMeeting page, added progress of team for the last week.

Jigar :-
- Created API for creating groups of user it will get emails of users and creates groups so that group orders can be placed
- Tried deploying docker containers for node and mongodb to aws, tried aws ECR, found it little complex, so asked instrctor for help
- Updated Core Value - simplicity

### Week 5 Updates:
Ashish:-
- Dockerised existing NodeJS and MongoDB and linked them to work together
- Deployed NodeJS server on AWS ECS
- As my module is Shopping Cart, finalized flow of how Shopping Cart will interect with other modules
- Updated XP Core value Feedback
- Created initial Class Diagram for application
- Created initial Use Case Diagram for application

Jigar:-
- Created MongoDb container
- Created Nodejs container and linked it to mongo container
- Selected User Groups module and created database for this module
- Updated XP core value - Simplicity
- Updated WeeklyMeeting page added progress of team for the last week

Arshiya:-
- Created MongoDb container
- Created Nodejs container and linked it to mongo container
- Created node application to link it to MongoDb via Mongoose library
- Updated XP core value - Respect
- Updated Burntdown Chart
- Updated other charts in CFD as well
- Created initial Sequence diagram for the application

Manogna:-
- Created User stories with BDD scenarios.
- Designed Class Diagram for Product Catalog module.
- Started coding to list and find product functionalities.
- Updated XP COre value - Communication
- Created product database in mongodb

Nikita:-
- Created class diagram for the login and registration module.
- Created Activity diagram for the entire project shhowing the functions that user can perform.
- Created MingoDb database and collection.
- Started coding for the login registration module, created the connection with mongoDB .
- Created monodb container.
- Updated XP core value - Courage.
- Updated the CFD for this week. 

### Week 4 Updates:
Nikita:-
- Installed MongoDb in my local machine and learnt the commands of MongoDb like creating database, collection, inserting data, queryig     data.
- Pulled image of MongoDb from docker hub and learnt how to utilise it similarly as that installed locally in my machine.
- Since the team has finalised on using nodejs for the backend development, learnt how to establish connection from nodejs to my MongoDb 
  database.
- Practised demo progarams provided by professor on connecting an appliaction written in goapi and nodejs with MongoDb image pulled .
- Also practised how to deploy the same application. 
- The issues I faced while doing this helped me get a clearer idea of MongoDb , its usage with docker and nodejs. 
- Updated xp core values, courage maintained by team members this week.

Jigar:-
- Ran riak container and created database and buckets, however was not able to connect with node backend
- Switched to MongoDB database
- Installed locally and creared cart database, collections and documents
- Connected with Node Server
- Updated XP core value - Simplicity

Arshiya:-
- Initialised to deploy riak on docker as well as locally but faced many issues due to the improper documentation available about it, so decided to switch to MongoDB.
- Installed MongoDB locally on my machine and created a database named users.
- Created a simple node server and using mongoose, i connected to my db users, created a schema and a model as well named "UserData" which in turn inserted a collection named "Userdata" in the db and represents the value that i enter through the node server.
- Updated the XP core value- Respect.
- Added some issues pertaining MongoDB.

Ashish:-

- Started working with Riak and faced some issues, so decided to go with second option which is MongoDB.
- Installed MongoDB locally and created a simple database named cart. This cart database has collection named items. Inserted   various items in this collection as documents.
- Created a simple Node server. This server connects to local MongoDB database cart and prints every item which is represented   by documents in item collection.  
- Updated CFD for forth week.
- Updated XP core value - Feedback.

Manogna:-
- Done few trials using Mongodb and sample go api given by the professor.
- Deployed Mongodb into Docker and started the container. Connected the running instance to go api on localhost and tested whether the server is up and able to retrieve the mongodb documents.
- Also ran go api on docker and connected it to nodejs. Tested whether the mongodb is responding to the frontend requests happening through nodejs.
- Updated the core value- Communication.

### Week 3 Updates:
Jigar:-
- Moved ahead in search of NoSQL database
- Selected Riak because of uniform data distribution, predictable performance, high avialability and failure recovery
- Got started with Riak on local machine
- Updated the CFD for changes in the third week

Arshiya:-
- Updated the XP core value- Respect.
- As a task for this week, reasearched upon various NoSQL databases and decided to move ahead with Riak.
- Reasons for choosing this NoSQL database: 

  . It provides high availability, fault tolerance, operational simplicity, and scalability.
  
  . In addition to the open-source version, it comes in a supported enterprise version and a cloud storage version.
  
  . It has fault tolerance data replication and automatic data distribution across the cluster for performance and resilience.
  
- Learnt how to create database and hands on few queries.

Ashish:-
- Completed research for which database to use and decided to use Riak.
- Major reasons to go with Riak : It is an open-source distributed, decentralized Key-Value data Store which provides high     availability, fault tolerance, operational simplicity and scalability. Riak also  provides Partition-tolerance.
- Created a simple demo document to Learn how to connect with Riak client using NodeJS Client.

Nikita:-
- Finalised on MongoDB as my choice of NoSQL database .
- I chose MongoDB since it enables to build applications faster, can handle diversified data types and is highly scalable database.
- Learnt how to create database and tried my hand at a few queries.
- Updated the weekly minutes of meeting for this week. 

Manogna:-
- Researched about the various NOSQL databases available and finalized MongoDB.
- As MongoDB provides all the capabilities needed to meet the most complex requirements at any scale, I have decided implement MongoDB for this project.
- Learnt the basics of MongoDB and created a sample database with collection of few documents and ran a few queries to retrieve the specified data.
- As a next step, I also performed some trials to connect MongoDB to a sample source code in Golang to which NodeJS is connected.
- Updated the core value (i.e., Communication)assigned to me in GitHub.

### Week 2 Updates:
Jigar:-
- Added user stories for group formation, reliability and manageability.
- Updated XP core value-Simplicity
- Edited non-fuctional requirement

Arshiya:-
- Listed down the functional requirements
- Added user stories for Registration, Login and Scalability.
- Updated the core value- Respect.
- Updated the CFD for changes in the second week.

Manogna:-
- Participated in the review meetings to finalize functional and non-functional requirements.
- Uploaded the user stories for Usability, Logout and Account Deactivation.
- Updated XP Core value - Communication.
- Added Minutes of Meeting for the second week.

Ashish:-
- Edited functional and non-functional requirements.
- Added user stories for Browse the menu, Item addition to the cart and Security.
- Updated XP core value - Feedback


Nikita:-
- Defined user stories for few modules of our application namely modification of order placed , order confirmation and paying for the same.
- Edited one of the non-functional requirments i.e. how should our application persom ideally. 
- Updated XP core value - courage

