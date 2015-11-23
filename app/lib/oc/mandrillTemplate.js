angular.module('OrderCloud-Mandrill', []);

angular.module('OrderCloud-Mandrill')
    .factory('Email', Email);
;

function Email() {
    var service = {
        send: send
    };
    return service;

    function send(parameters) {
        var mandrillAPIKey = "MEAySB8L1EBrdVSzW2R2EA"; //Enter your API key here
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = "contactus"; //Enter Mandrill Template Slug Here

        var template_content = [
            {
                "name": 'Name',
                "content": parameters.Name
            },
            {
                "name": 'EmailAddress',
                "content": parameters.Email
            },
            {
                "name": 'Subject',
                "content": parameters.Subject
            },
            {
                "name": 'CommentsQuestions',
                "content": parameters.CommentsQuestions
            }
        ];
        var message = {
            'subject': "Comments or Questions",
            'from_email': parameters.Email,
            'from_name': parameters.Name,
            'to': [
                {
                    'email': "administrator@tricorprint.com",
                    'name': "Tricor Print Administrator",
                    'type': 'to'
                }
            ],
            'important': false
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }
}