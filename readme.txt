The FE codes were done with RN, Redux, React-Navigation and Axios, and the BE side codes were done with Django and DRF.

You can test the API with the following URL address.
http://3.26.0.97:8000/api/v1/billslist/?page=1
http://3.26.0.97:8000/api/v1/billslist/?page=2
http://3.26.0.97:8000/api/v1/billslist/?page=3

At the moment, there are 23 records in total in the database and it is paginated with 10 records per page as requested.
When your scrolling motion reaches the threshold, the app will continually fetch the next records if there are any.

As the newer release build for Android won't work with clear text HTTP, I have to forward you the debug build this time. 
Otherwise, I have to spend a few more hours to setup SSL certificate on the server with Nginx proxy server, which is pointless. 
I apology for the large file size.

Even though they are the same ones, all the pictures are live data from 'placeholder.com'.

You can install the apk with adb install app-debug.apk command.

Thanks.