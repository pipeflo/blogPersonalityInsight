//Modify this for your configuration running on localhost
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	ConnectionsConfig: {
		hostname: 'apps.na.collabserv.com',
	  clientID: '<ClientID>',
	  clientSecret: '<ClientSecret>',
	  callbackURL: 'https://<application-name>.mybluemix.net/callback', //https is important here. Connections Cloud doesn't accept http callback urls
		appDomain: "https://<application-name>.mybluemix.net"
	},

	PersonalityInsights: {
		user: "",
		password: ""
	}
}
