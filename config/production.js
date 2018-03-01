//Modify this for your configuration running on localhost
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	ConnectionsConfig: {
		hostname: 'apps.na.collabserv.com',
	  clientID: '<ClientID>',
	  clientSecret: '<ClientSecret>',
	  applicationName: '<application-name>'
	},

	PersonalityInsights: {
		username: "",
		password: ""
	}
}
