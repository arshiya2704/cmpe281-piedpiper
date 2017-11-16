## Steps to deploy application on AWS:

- First get the three Mongo instances running and successfully set up the replica set of mongo.
- Then create Amazon ECS service, i.e. create a container for the application .
- For that the steps followed can be divided into three steps :
  - First make the repository .
  - Choose create repository , give the name as nodeapp and then by doing next , an instruction appears with a list of steps that needs to be followed.
    Execute the given commands:
      - aws ecr get-login --no-include-email --region us-west-1
  - Add the dockerfile to your application.
  - Build the Docker image using the following command:
      - docker build -t nodeapp .
  - After the build completes, tag your image so that you could push the image to the repository:
      - docker tag nodeapp:latest 438741267831.dkr.ecr.us-west-1.amazonaws.com/nodeapp:latest
  - Lastly following command to push this image to my newly created AWS repository:
      - docker push 438741267831.dkr.ecr.us-west-1.amazonaws.com/nodeapp:latest

  - Second step included creating the cluster:
      - On clicking the create cluster , first give the name of the cluster to be made .
      - Choose the key pair that you had used for creating the three earlier instances .
      - Choose the VPC that you had used earlier for creating the three EC2 instances .
      - Also choose two public subnets from those created earlier.
      - Chose the security group that had already created and set up.
      - Add the port 3000 to the inbound rules of Security group since my node application runs on port 3000.
      
   -Third step is creating the task definition :
      - Enter the task name and the task role .
      - Then add the container , and enter a name for the container.
      - Next add the repository URI of that created in the previous step .
      - Also specify the host and container port to be 3000 .

   - Lastly add the hard limit so that the add button gets enabled.

Thus after completing all these steps, I successfully set up my conatiner.
The docker image that i had built using dockerfile of my node application , has been successfully pushed to AWS ECS.
After completing all these steps , I found that another instance has been started.
Using the public ip of this EC2 instance I tested using the url publicip:3000 to see if my application is working fine .
