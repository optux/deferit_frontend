The FE side coding were done with RN, Redux, React-Navigation and Axios, and the BE side coding were done with Django and DRF.

The API testing addresses are as follows with some dummy data:
http://3.26.0.97:8000/api/v1/billslist/?page=1
http://3.26.0.97:8000/api/v1/billslist/?page=2
http://3.26.0.97:8000/api/v1/billslist/?page=3

At the moment, there are 23 records in total in the database and it is paginated with 10 records per page as requested.
When your scrolling motion reaches the threshold, the app will continually fetch the next batch of records if there are any.

As the newer release build for Android won't work with clear text HTTP, I have to forward you the debug build this time. 
Otherwise, I have to spend anoher hour or so to setup SSL certificate with Nginx on the testing server, which is pointless at this time. I apology for the large file size.

Even though the dummy data look the same, all the pictures are live data from 'placeholder.com'.

You can install the apk with adb install app-debug.apk command.

Thanks.

TO DO LIST:
1. Once the end of the list reached (when AXIOS return 404 or other specific status code), it should update the current status so that the app is not going to request any more data to the server.
2. At the same time, a popup toast message should be displayed at the bottom indicating to the user that there are no more data to fetch.
