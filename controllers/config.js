var https = require('https')
	, querystring = require('querystring')
	, jwt = require('jsonwebtoken')
	, config = require('config')
	, ConnectionsConfig = config.get('ConnectionsConfig')
	;

module.exports = {
	configure: function (req, res) {

		var post_data = JSON.stringify({
		  'name': 'Blog Personality Insights',
		  'description': 'Application to get the Blogs of a Community and then analyze them with the Watson Personality Insights service',
		  'type':'community_widget',
		  'urls':{},
		  'payload': {
		    'defId': 'Blog Personality Insights',
		    'showInPalette': 'true',
		    'primaryWidget': 'true',
		    'modes': 'view',
		    'themes': 'wpthemeThin wpthemeNarrow wpthemeWide wpthemeBanner',
		    'url': 'https://apps.na.collabserv.com/connections/resources/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml',
		    'itemSet': [
		      {
		        'value': ConnectionsConfig.url,
		        'name': 'url'
		      },
		      {
		        'value': '100%',
		        'name': 'width'
		      },
		      {
		        'value': '800px',
		        'name': 'height'
		      }
		    ]
		  }
		});

		console.log("post_data:", post_data);

		var options = {
			hostname: 'apps.na.collabserv.com',
  			port: 443,
  			path: '/appregistry/api/v1/extensions',
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json'
					, 'Authorization': 'Bearer ' + req.oauthConnections.accessToken
  			}
		};

		var req = https.request(options, function(respuesta) {
			var body = '';
		  	respuesta.on('data', (d) => {
		    	body += d;
		  	}).on('end', function(){
					console.log("Estatus Code:",respuesta.statusCode);
		  		if (respuesta.statusCode == 201) {
		  			var parsed = JSON.parse(body);
						console.log(body);

						res.status(200).json({"Creo": true, "message": ""});

			      return;
		  		} else {
		  			console.log('status message', respuesta.statusMessage);
						console.log("body:", body);
		  			res.status(200).json({"Creo": false, "message": body});
		  		}



		  	});
		});
		req.write(post_data);
		req.end();


		req.on('error', (e) => {
			console.error(e);
		  	res.status(500).json({
	        	"message": "Error calling Extensions API!"
	        });
		});

	}
}
