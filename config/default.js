//Modify this for your configuration running on localhost
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	AppConfig: {
		domain: "https://localhost:3000"
	},

	ConnectionsConfig: {
		hostname: 'apps.na.collabserv.com',
	  clientID: '<ClientID>',
	  clientSecret: '<ClientSecret>',
	  callbackURL: 'https://localhost:3000/callback', //https is important here. Connections Cloud doesn't accept http callback urls
	},

	PersonalityInsights: {
		username: "",
		password: ""
	}
}
