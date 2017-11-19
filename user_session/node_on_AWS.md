# Steps to deploy application on AWS: 
* First I got the three Mongo instances running and successfully set up the replica set of mongo. 
* Then I had to create Amazon ECS service, i.e. i have to create container for my application . 
* For that the steps followed can be divided into three steps : 
    * First I made the repository .
      * Choose create repository , gave the name as nodeapp and then pn doing next , an instruction appears with a 
        list of steps that needs to be followed.
      * From the windows powershell we execute the command for retrieving the docker login command that you can use
        to authenticate my Docker client to my registry: 
         ## aws ecr get-login --no-include-email --region us-west-1
      * Add the dockerfile to my application. 
      *  Build my Docker image using the following command:
         ## docker build -t nodeapp .
      * After the build completes, I tagged  my image so that I could push the image to the repository:
        ## docker tag nodeapp:latest 438741267831.dkr.ecr.us-west-1.amazonaws.com/nodeapp:latest
      * Lastly following command to push this image to my newly created AWS repository:
        ## docker push 438741267831.dkr.ecr.us-west-1.amazonaws.com/nodeapp:latest
    * Second step included creating the cluster:
       * On clicking the create cluster , first I gave the name of the cluster to be made .
       * I chose the key pair that I had used for creating the three earlier instances .
       * I chose the VPC that I had used earkier for creating the three EC2 instances .
       * I also chose two public subnets from those created earlier. 
       * I chose the security group that I had already created and set up. 
       * I also added the port 3000 to the inbound rules of Security group since my node application runs on port 3000. 
     * Third step is creating the task definition :
       * I entered the task name and the task role . 
       * Then I had to add the container , I entered a name for the container. 
       * Next I added the repository URI of that created in the previous step . 
       * Also I specified the host and container port to be 3000 .
       * Lastly I added the hard limit so that the add button gets enabled. 
 * Thus after completing all these steps, I successfully set up my conatiner. 
 * The docker image that i had built using dockerfile of my node application , has been successfully pushed to AWS ECS. 
 * After completing all these steps , I found that another instance has been started. 
 * Using the public ip of this EC2 instance I tested using the url publicip:3000 to see if my application is working fine .
      
    
