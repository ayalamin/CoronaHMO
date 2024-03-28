# CoronaHMO
- installation
Make sure you have MYSQL installed on your computer. If not download it.

Duplicate the repository

Open your project in Vs Code, and do the following:
Play a CD back end
Run npm srstart
Run cd my-app
Run npm start

Create a database named HMOcorona

Download SQLQuery2.sql from github
Open it in mySql and run the page

# Schematic view of the information in the database:

- Members: ID(PK), MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone.
- Vaccinations: ID(PK), MemberID(FK), DateReceived, Manufacturer.
- CovidCases: ID(PK), MemberID(FK), DateOfAttachment, DateOfRecovery.
![alt text](image-12.png)

# How to refer between the different services:
- Members: A service that allows creating, updating, reading and deleting members from the database.
- Vaccinations: A service that allows creating, reading  vaccinations from the database.
- CovidCases: A service that allows creating, reading  about the corona from the database.

- Members:
-In a GET request to a specific member, the request will be sent to the Members API and the information will be returned from it.
-In a GET request for all members, the request will be sent to the AllMembers API and the information will be returned from it.
-In a POST request from a member, the request will be sent to the Member API
-In a DELETE request from a member, the request will be sent to the Member API
-In a UPDATE request from a member, the request will be sent to the Member API
- Vaccinations:
-In a POST request from a Vaccinations, the request will be sent to the Vaccination API
-In a GET request for  Vaccinations, the request will be sent to the Vaccination API and the information will be returned from it.
- CovidCases:
-In a POST request from a CovidCases, the request will be sent to the CovidCases API
-In a GET request for  CovidCases, the request will be sent to the CovidCases API and the information will be returned from it.
![alt text](image-14.png)


# CoronaHMO
Run the project[client & server] with npm start and this is how you get to the home page. To add a user, click on the Sign up button. To see all members of the health fund, click any button. Display members of the health fund.
![alt text](image-1.png)

On the registration page, fill in all the details correctly and then click submit
![alt text](image.png)
![alt text](image-2.png)

On the display page for members of the health insurance fund there are many options
![alt text](image-3.png)

Option to click on the delete button and thus delete the member of the health insurance fund and with it all the information about him in the database:
![alt text](image-4.png)

Option to click all unvaccinated pacimets button and then it shows me the number of unvaccinated pacimets that exist in the database:
![alt text](image-11.png)

Option to see more details of a specific member by clicking any more details takes me to the details page of that particular member
![alt text](image-10.png)

When I click on the edit button, it brings me all the data in a form that can be edited
![alt text](image-6.png)

By clicking on the add vaccine button, the option of adding a vaccine opens up for me
![alt text](image-7.png)
![alt text](image-8.png)

Clicking finish updates my data
![alt text](image-9.png)

When I press a button Monthly Patient Chart
Shows me how many active patients there were each day in the last month
![alt text](image-15.png)


# Twiter 
Shows me an option to choose between 1\2\3
1 - rectangle
2 - triangle
3 - Exit
Asking me for length and height
rectangle:
If the rectangle is a square or rectangle the difference between the lengths of the sides
Its greater than 5, if so its area will be printed
If its scope is not printed
triangular:
Shows me an option between 1/2
1 - Prints the perimeter of the triangle
2 prints me the triangle itself