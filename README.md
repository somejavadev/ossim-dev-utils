# ossim-dev-utils
Custom written utilities to help with ossim plugin development

### About:     
This project was written purely to assist with the creation of ossim rule based plugins. The project currently exists out of an Angular / Bootstrap front end which calls a very basic and lightweight PHP REST service to pull data out of an existing ossim installation. To use this web app you will need to be able to login to your ossim installation via SSH.     
     
### Installation:    
To install this web app, simply download the project structure and copy the web folder to your ossim apache directory.   
Currently the apache directory would be at: /var/www/     
Copy the projects web directory here: /var/www/web          
Once you have done this you can open up your browser and visit the ossim admin URL in the following format: https://x.x.x.x/web/frontend/index.html this will bring you to the dev utilities page.     

Currently you do not need to specify a username or password for the utility to access the ossim database, the app will read these values from ossim's config in: /etc/ossim/ossim_setup.conf       
        
### **Disclaimer:**    
This web app is not affiliated with, nor is it an official app of [AlienVault](https://www.alienvault.com/)     
Usage of this app is at your own risk.   
