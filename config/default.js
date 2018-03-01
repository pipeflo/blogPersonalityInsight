//Modify this for your configuration running on localhost
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	ConnectionsConfig: {
		hostname: 'apps.na.collabserv.com',
	  clientID: '<ClientID>',
	  clientSecret: '<ClientSecret>',
	  callbackURL: 'https://localhost:3000/callback', //https is important here. Connections Cloud doesn't accept http callback urls
		appDomain: "https://localhost:3000"
	},

	PersonalityInsights: {
		username: "<PI-Username>",
		password: "<PI-Password>"
	}
}
