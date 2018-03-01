var https = require('https')
	, removeMd = require('remove-markdown')
	, watson = require('watson-developer-cloud')
	, config = require('config')
	, PersonalityInsights = config.get('PersonalityInsights')
	;

module.exports = {
	personalidad: function (req, res) {

		var textoPlano = removeMd(req.body.texto);

		var personality_insights = watson.personality_insights({
			username: PersonalityInsights.username,
			password: PersonalityInsights.password,
			version: 'v2'
		});

		personality_insights.profile({
  			text: textoPlano,
  			language: 'en' },
  			function (err, response) {
			    if (err)
			      console.log('error getting personality:', err);
			    else {
			      console.log("Personality:::", JSON.stringify(response, null, 2));
			      res.status(200).json(JSON.stringify(response, null, 2));
			    }
			}
		);
	}
}
