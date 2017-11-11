## Deployment of Node Sever on BonAppetit VPC:

### Step 1:

- Created docker image of running node application.

### Step 2:

- Create a repository on AWS ECS. Push docker image of node application into that repo.
- Create a Cluster in BonAppetit VPC.
- Create task definitions.
- Add port maaping 3000:3000 when adding container.

### Step 3:

- Start a service.

Now, a new EC2 instance will start and we can call APIs by public IP.
