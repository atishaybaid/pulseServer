ref:https://github.com/FrontendMasters/api-design-node-v3



#### Pulse management system

We are creating a system for self use and learning first,them we will add features on top of the basic version.


### User Flow
User logs in with emailid and password,he will land direclty to a a checking page,which will have some questions from the question bank


















business customer
generate a url which have a review id,
store the review respose in the database correspoding to this id



business 
1)sucessfull login/signup
2)send review request invite to a phone number

database 
store busienss number and review request id


flow

after sucessful login,we need to add contacts
with 3 fields name,email phone.
/save email and phone
/get email and phone



Document v1
A) Creation of a Dashboard application which have two tabs

1)Contacts 
 In tableuar formate display list of contacts with Name,email,phone.
 provide a option to add the contacts.
 provide a option to edit the contacts.
 provide a option to send review  request.

2)Reviews
 This tab will list down all the reviews,with reviewr name,date.


B) Creation of a review request form which will be sent to a customer,with some questions


### Review Generation use case
geenerate a unique url which will be sent to a customer,
upon hitting this url,a form will open which will contain basic review questions


### Review Generation  implemntation
1)a review id will be generated,and that review will be identified with that id
the schema will look like following
{
    reviewId:'',
    customerId:'',
    questions:[list of ids],
    answer:[questionId1:'answer',questionId2:'answer'],
    reviewReceviewTimeStamp:"123456",
}


#### Review url sending story
1)once business user clicks on send review request,create a api which will generate a review request id and sends back a url.....at this time in database,initilize a review with just id,url and questions

2)when someone opens the link sent,on the call of submit send all the information and store it in db
3)create a api to list down all the reviews shorted by time stamp for a perticular business
4)support pagination 



#### TODO
Questions template creation



 #### support for question templating
 user story
 A business user should be able to select questions from different gropus(templates)

 for example:
 A)Feedback questions
-How  was your experiance with us?
-Rate us on a scale of 1 to 5


 B)Promotional Questions   
-We are launching a sale flat 50%,would you be intersted in buying....
-Choose your favourite shirt brand,from.....

#### URL Sharing Brainstorm ideas
1. Using qr code scanner
2. Asking people openeing the url directly
3. SMS
4. Watsapp





#### Steps to run the project
`npm install`
`yarn dev`




### atlas credentials
atishaybaid@gmail.com/gunday@101


#### connection url
`mongodb+srv://atishaybaid:oLOBp056LM3CN2TN@review-cluster-h4hww.mongodb.net/godown?retryWrites=true&w=majority`


### Twilio credentials
`atishaybaid@gmail.com/gunday@10112345`
secerate code :QE_7oiXbXRNkf6TkWEQhAQ4ujaE19AZ9FoL07eoG

### twilio sms
sid:ACec78e0f16e9d7b04255d3a9575310872


### AWS
ca
url:http://13.58.199.222:3000/


### Jenkins
url:http://13.58.199.222:8080/
userName:admin
pass:baidbaid



#### 












