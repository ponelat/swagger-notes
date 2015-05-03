var client = require('swagger-client');

var swagger = new client({
  url: 'http://petstore.swagger.io/v2/swagger.json',
  success: function() {

    // This will send a header called bob with the value 'special-key'
    // ... Note: we only allow one auth, named 'api_key' which is declared under the 'securityDefinitions', or 'security'
    this.clientAuthorizations.add("api_key", new client.ApiKeyAuthorization("bob","special-key","query"));

    var res = swagger.apis.pet.getPetById({petId:10},{responseContentType: 'application/json'},function(pet){
      console.log('pet', pet);
    });

    console.log('res', res);

  }
})
